function asyncAdd(a, b, callback) {
  setTimeout(() => {
    callback(null, a + b);
  }, 1000);
}

async function sum(...rest) {
  return rest.reduce((a, b) => asyncAdd(a, b), 0);
}

let start = window.performance.now();

sum(1, 2, 3, 4, 5, 6).then((res) => {
  console.log(res);
  console.log(`程序执行耗时：${window.performance.now() - start}`);
});
