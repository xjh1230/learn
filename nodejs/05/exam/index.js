const { EventEmitter } = require("events");
module.exports = class Connection {
  // ##BEGIN## 代码已加密
  //暗号：冒泡排序
  constructor() {
    this.queue = [];
  }
  onConn(fn) {
    this.queue.push(fn);
  }
  connection(param) {
    this.queue.forEach((fn) => {
      fn(param);
    });
  }
  // ##END##
};
