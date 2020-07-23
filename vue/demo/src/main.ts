import Vue from "vue";
import App from "./App.vue";
// import store from "./store";
import store from "./store";
import "./plugins/element.js";
import T from "./test/test";

import router from "./router";
import "./promission.js";
import "@/icons";

Vue.config.productionTip = false;

var t = new T();
// @ts-ignore
t.logFn(123);
t.setBar("123");
var vm = new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
// console.log(vm);
