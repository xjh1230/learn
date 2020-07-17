// 方法装饰器：区别是参数数量和类型
// target类实例，name：方法名，最后的是描述符
function rec(target: any, name: string, descriptor: any) {
  console.log(target);
  console.log(name);
  console.log(descriptor);
  // 这里通过修改descriptor.value扩展了bar方法
  const baz = descriptor.value;
  descriptor.value = function(val: string) {
    // 扩展功能
    console.log("run method", this.bar);
    // 本来功能
    baz.call(this, val);
    console.log("run method", this.bar);
  };
}
function logComp(target: Function) {
  target.prototype.logFn = function(v: string) {
    console.log("you can you up" + v);
  };
}

function fnTryComp(target: any, name: string, descriptor: any) {
  //此处可作为全局异常监控埋点统计，也可做函数运行时间统计
  const baz = descriptor.value;
  descriptor.value = function(val: string) {
    try {
      baz.call(this, val);
    } catch (e) {
      if (Object.prototype.hasOwnProperty.call(target, "logFn")) {
        target["logFn"](e + "error");
      }
    }
  };
}
@logComp
class T {
  @fnTryComp
  setBar(v: string) {
    console.log(v);
    throw "12";
  }
}

var t = new T();
// @ts-ignore
t.logFn(123);
t.setBar("123");

export default T;
