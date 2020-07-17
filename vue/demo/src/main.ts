import Vue from "vue";
import App from "./App.vue";
// import store from "./store";
import store from "./kstore";
import T from "./test/test";

Vue.config.productionTip = false;

var t = new T();
// @ts-ignore
t.logFn(123);
t.setBar("123");
var vm = new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
console.log(vm);
