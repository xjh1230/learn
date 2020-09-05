const compose_old = (middlewares) => {
  return function () {
    return dispatch(0);
    function dispatch(i) {
      // ##BEGIN## 代码已加密
      //暗号：排序
      let fn = middlewares[i];
      if (!fn) {
        return Promise.resolve();
      }
      return Promise.resolve(
        fn(function next() {
          return dispatch(i + 1);
        })
      );
      // ##END##
    }
  };
};
const compose = (middlewares) => {
  return () => {
    if (middlewares.length === 0) {
      return (arg) => arg;
    }

    if (middlewares.length === 1) {
      return middlewares[0];
    }
    // return (next = async () => {}) =>
    //   middlewares.reduce((a, b) => (arg) => a(() => b(arg)))(next);

    middlewares.push((_) => {});
    return middlewares.reduce((a, b) => (next) => {
      a(() => b(next));
    })();
  };
};

const mid = [
  (next) => {
    console.log(123);
    next();
    console.log(123, "end");
  },
  (next) => {
    console.log(234);
    next();
    console.log(234, "end");
  },
  (next) => {
    console.log(345);
    next();
    console.log(345, "end");
  },
  (next) => {
    console.log(456);
    // console.log(next);
    next();
    console.log(456, "end");
  },
];

// var c = compose(mid)();
// c();
module.exports.compose = compose;
