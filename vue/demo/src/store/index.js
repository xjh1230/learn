import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        counter: 1,
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