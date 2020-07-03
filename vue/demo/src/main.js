import Vue from "vue";
import App from "./App.vue";
// import store from "./store";
import store from "./kstore";

Vue.config.productionTip = false;

var vm = new Vue({
    store,
    render: (h) => h(App),
}).$mount("#app");
console.log(vm);