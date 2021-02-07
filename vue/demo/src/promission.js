import router from "./router";

import store from "./store";

const whiteList = ["/login"];

router.beforeEach(async(to, from, next) => {
    const hasToken = localStorage.getItem("token");
    console.log(hasToken, 123456789);
    if (hasToken) {
        if (to.path == "/login") {
            next("/");
        } else {
            const { roles } = await store.dispatch("user/getInfo");

            const assessRoutes = await store.dispatch(
                "permission/generateRoutes",
                roles
            );

            router.addRoutes(assessRoutes);
            next({...to, replace: true });
        }
    } else {
        if (whiteList.indexOf(to.path) != -1) {
            next();
        } else {
            next("/login?redirect=" + to.path);
        }
    }
});