async function asyncAdd(a, b, callback) {
  // console.log("asyncAdd", a, b);
  setTimeout(() => {
    // callback(null, a + b);
    callback(null, a + b);
  }, 1000);
}

function createPromise(a, b) {
  return new Promise((res) => {
    asyncAdd(a, b, (i, j) => {
      res(j);
    });
  });
}
async function sum2(...rest) {
  return await rest.reduce((prevPromise, next) => {
    return prevPromise.then((id) => {
      console.log(id, next, "aaa");
      return createPromise(id, next);
    });
  }, Promise.resolve(0));
}

async function sum(...rest) {
  let i = 0;
  let sumRes = rest[0];

  function asyncSum() {
    return new Promise(function (resolve, reject) {
      asyncAdd(sumRes, rest[++i], function (n, val) {
        sumRes = val;
        if (i < rest.length - 1) {
          resolve(asyncSum());
        } else {
          resolve(sumRes);
        }
      });
    });
  }
  let pro = asyncSum();
  return await pro.then();
}

let start = window.performance.now();

sum(1, 2, 3, 4, 5, 6).then((res) => {
  console.log("sum", res);
  console.log(`程序执行耗时：${window.performance.now() - start}`);
});

// sum2();
start = window.performance.now();
sum2(1, 2, 3, 4, 5, 6).then((res) => {
  console.log("sum2", res);
  console.log(`程序执行耗时：${window.performance.now() - start}`);
});
