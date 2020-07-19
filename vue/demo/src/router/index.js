import Vue from "vue";

import Router from "vue-router";

Vue.use(Router);

export const constRouters = [
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
    hidden: true,
  },
  {
    path: "/",
    component: () => {
      import("@/views/Home.vue");
    },
    name: "home",
    meta: {
      title: "Home",
      icon: "qq",
    },
  },
];

export const asyncRoutes = [
  {
    path: "/about",
    component: () => {
      import("@/views/About.vue");
    },
    name: "about",
    mata: {
      title: "About",
      icon: "denglong",
      roles: ["admin", "editor"],
    },
  },
];

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: constRouters,
});
