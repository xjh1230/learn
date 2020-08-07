const isIterator = (it) => typeof it[Symbol.iterator] === "function";
const isPromise = (o) => typeof o.then === "function";
const times = (cb, total) => {
  for (let i = 0; i < total; ++i) {
    if (i === total) {
      cb();
    }
  }
};

export default function createSagaMiddleware() {
  function createChannel() {
    let _listeners = {};
    function subscribe(actionType, cb) {
      console.log(`订阅${actionType}`);
      _listeners[actionType] = _listeners[actionType] || [];
      const once = () => {
        cb();
        off(actionType, once);
      };
      once._o = cb;
      _listeners[actionType].push(once);
    }

    function publish(actionType) {
      const nexts = _listeners[actionType];
      if (nexts && nexts.length) {
        nexts.forEach((next) => next());
      }
    }

    function off(key, cb) {
      if (_listeners[key]) {
        _listeners[key] = _listeners[key].filter(
          (l) => l !== cb && l._o !== cb
        );
      }
    }
    return {
      subscribe,
      publish,
    };
  }
  // 创建监听管道，其实就是发布订阅
  let channel = createChannel();
  const sagaMiddleware = ({ dispatch, getState }) => {
    function run(gen, cb) {
      const it = isIterator(gen) ? gen : gen();
      function next(returnValue) {
        // effect是saga出得一个概念，指的是
        // 一些简单 Javascript 对象，包含了要被 middleware 执行的指令。
        // 当 middleware 拿到一个被 Saga yield 的 Effect，它会暂停 Saga，
        // 直到 Effect 执行完成，然后 Saga 会再次被恢复。

        // next函数参数是上一次yield 返回值。
        const { value: effect, done } = it.next(returnValue);
        if (!done) {
          if (isIterator(effect)) {
            run(effect);
            next();
          } else if (isPromise(effect)) {
            // 处理yield + promise的情况
            effect.then(next);
          } else {
            const { type, actionType, action, task, fn, args, fns } = effect;
            switch (type) {
              case "TAKE":
                // take会再yield的地方等待，
                // 等组件dispatch的时候，调用next执行监听的内容(写在take()后面的代码)。
                console.log("take----", actionType);
                channel.subscribe(actionType, next);
                break;
              case "PUT":
                console.log("put----");
                dispatch(action);
                next(); // put不阻塞
                break;
              case "FORK":
                console.log("fork----");
                const newTask = task();
                run(newTask);
                next(newTask);
                break;
              case "CALL": // call返回的都是promise
                console.log("call----");
                fn(...args).then(next);
                break;
              case "CPS":
                console.log("cps----");
                fn(...args, next);
                break;
              case "ALL": // 直到所有all完成(所有generator函数调用next函数皆返回{d}one:true})
                console.log("all----");
                const done = times(next, fns.length);
                fns.forEach((fn) => run(fn, done));
                break;
              case "CANCEL": // 直到所有all完成(所有generator函数调用next函数皆返回{d}one:true})
                console.log("cancel----", task);
                task.return("中断执行");
                break;
            }
          }
        } else {
          cb && cb();
        }
      }
      next();
    }
    // run放到sagaMiddleware函数里面的目的是需要拿到dispatch方法
    sagaMiddleware.run = run;
    return (next) => (action) => {
      const type = action.type;
      channel.publish(type);
      next(action);
    };
  };
  //https://www.jianshu.com/p/448761bd030e
  return sagaMiddleware;
}
