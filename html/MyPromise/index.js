let _call = (fn) => {
  let _fn = function name(...arg) {
    window.removeEventListener("message", _fn);
    // console.log(args)
    fn(...arg.slice(1));
  };
  window.addEventListener("message", _fn);
  window.postMessage("");
};

class MyPromise {
  static PENDING = "PENDING";
  static RESOLVED = "RESOLVED";
  static REJECTED = "REJECTED";

  constructor(handler) {
    if (typeof handler !== "function")
      throw new TypeError("Promise resolver undefined is not a function");
    this.resolveQueue = [];
    this.rejectQueue = [];
    this.finalyQueue = [];
    this.state = MyPromise.PENDING;
    this.value;
    handler(this._resolve.bind(this), this._reject.bind(this));
  }
  _resolve(value) {
    let _fn = (_) => {
      if (this.state !== MyPromise.PENDING) return;
      this.state = MyPromise.RESOLVED;
      this.value = value;

      let handler;
      while ((handler = this.resolveQueue.shift())) {
        handler(this.value);
      }
    };
    _call(_fn);
  }
  _reject(value) {
    let _fn = (_) => {
      if (this.state !== MyPromise.PENDING) return;
      this.state = MyPromise.REJECTED;
      this.value = value;
      let handler;
      while ((handler = this.rejectQueue.shift())) {
        handler(this.value);
      }
    };
    _call(_fn);
  }

  then(resolvedHandler, rejectedHandler) {
    resolvedHandler =
      typeof resolvedHandler === "function"
        ? resolvedHandler
        : function (v) {
            return v;
          };
    rejectedHandler =
      typeof rejectedHandler === "function"
        ? rejectedHandler
        : function (r) {
            throw r;
          };

    let promise2 = new MyPromise((resolve, reject) => {
      let newResolveHandler = (val) => {
        let _fn = (_) => {
          try {
            let newVal = resolvedHandler(val);
            resolvePromise(promise2, newVal, resolve, reject);
          } catch (error) {
            reject(error);
          }
        };
        _call(_fn);
      };
      let newRejectedHandler = (reason) => {
        let _fn = (_) => {
          try {
            let newVal = rejectedHandler(reason);
            resolvePromise(promise2, newVal, resolve, reject);
          } catch (error) {
            reject(error);
          }
        };
        _call(_fn);
      };
      if (this.state === MyPromise.PENDING) {
        this.resolveQueue.push(newResolveHandler);
        this.rejectQueue.push(newRejectedHandler);
      } else if (this.state === MyPromise.RESOLVED) {
        newResolveHandler(this.value);
      } else {
        newRejectedHandler(this.value);
      }
    });
    return promise2;
  }

  valueOf() {
    return this.value;
  }
  catch(onRejected) {
    this.then(null, onRejected);
  }
  finally(fn) {
    return this.then(
      (res) => {
        _call(fn);
        return res;
      },
      (e) => {
        _call(fn);
        throw e;
      }
    );
  }
  static resolve(value) {
    var promise = new MyPromise(function (resolve, reject) {
      resolvePromise(promise, value, resolve, reject);
    });
    return promise;
  }
  static reject(value) {
    return new MyPromise((resolve, reject) => {
      reject(value);
    });
  }
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      var resolvedCounter = 0;
      var promiseNum = promises.length;
      var resolvedValues = new Array(promiseNum);
      for (let index = 0; index < promiseNum; index++) {
        let element = promises[index];
        MyPromise.resolve(element).then(
          (s) => {
            resolvedValues[index] = s;
            if (++resolvedCounter == promiseNum) {
              resolve(resolvedValues);
            }
          },
          (e) => reject(e)
        );
      }
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((element) => {
        MyPromise.resolve(element).then(resolve, reject);
      });
    });
  }

  static allSettled(promises) {
    return new MyPromise((resolve, reject) => {
      var resolvedCounter = 0;
      var promiseNum = promises.length;
      var values = new Array(promiseNum);
      for (let index = 0; index < promiseNum; index++) {
        let element = promises[index];
        MyPromise.resolve(element)
          .then(
            (s) => {
              values[index] = {
                status: "fulfilled",
                value: s,
              };
            },
            (e) => {
              values[index] = {
                status: "rejected",
                reason: e,
              };
            }
          )
          .finally((_) => {
            if (++resolvedCounter == promiseNum) {
              resolve(values);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  }
}

function resolvePromise(promise, x, resolve, reject) {
  var then;
  var thenCalledOrThrow = false;

  if (promise === x) {
    return reject(new TypeError("Chaining cycle detected for promise!"));
  }
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          function rs(y) {
            if (thenCalledOrThrow) return;
            thenCalledOrThrow = true;
            return resolvePromise(promise, y, resolve, reject);
          },
          function rj(r) {
            if (thenCalledOrThrow) return;
            thenCalledOrThrow = true;
            return reject(r);
          }
        );
      } else {
        return resolve(x);
      }
    } catch (e) {
      if (thenCalledOrThrow) return;
      thenCalledOrThrow = true;
      return reject(e);
    }
  } else {
    return resolve(x);
  }
}

// var p = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(10);
//   }, 1000);
//   setTimeout(() => {
//     resolve(5);
//   }, 100);
// });
// var p = MyPromise.resolve(100);

function myLog(val) {
  console.log("%c" + val, "font-size:36px;color:blue;");
}
function myError(val) {
  console.log("%c" + val, "font-size:36px;color:red;");
}
// var p = MyPromise.reject(100);
// p.then(myLog, myError).then(myLog, myError);

// var raceArr = [1, 2, 3, 4].map((v) => {
//   var r = Math.random();
//   console.log(v, r);
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (r > 0.5) {
//         return resolve(v);
//       } else {
//         return resolve(v);
//       }
//     }, r * 1000);
//   });
// });
// Promise.all(raceArr).then(myLog, myError);

// var raceArr2 = [1, 2, 3, 4].map((v) => {
//   var r = Math.random();
//   console.log(v, r);
//   return new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//       if (r > 0.5) {
//         return resolve(v);
//       } else {
//         return reject(v);
//       }
//     }, r * 3000);
//   });
// });
// MyPromise.race(raceArr2).then(myLog, myError);
// MyPromise.all(["a", "b", "c"]).then(myLog, myError);

myLog(123);
Promise.resolve(10)
  .finally(function (s) {
    setTimeout(() => {
      return s;
    }, 5000);
  })
  .then(myError);

MyPromise.resolve(10)
  .finally(function (s) {
    setTimeout(() => {
      return s;
    }, 5000);
  })
  .then(myError);
