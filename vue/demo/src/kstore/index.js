import Vue from "vue";
import Vuex from "./kvuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        counter: 1,
        msg: "天王盖地虎",
    },
    actions: {
        add({ commit }) {
            setTimeout(() => {
                commit("add", 2);
            }, 1000);
        },
    },
    mutations: {
        add(state, payload = 1) {
            state.counter += payload;
        },
    },
    getters: {
        doubleCounter: (state) => {
            return state.counter * 2;
        },
    },
});