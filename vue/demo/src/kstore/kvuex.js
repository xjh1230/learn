let KVue;
import { Vue } from "vue";
class Store {
  constructor(options) {
    this.actionsMap = options.actions;
    this.mutationsMap = options.mutations;
    this.gettersMap = Object.create(null);
    let that = this;
    for (let key in options.getters) {
      let fn = options.getters[key];
      Object.defineProperty(this.gettersMap, key, {
        get: function() {
          return fn.bind(that, that.state)();
        }
      });
    }

    this._state = new KVue({
      data: { $$state: options.state },
      computed: this.gettersMap
    });
  }
  get getters() {
    return this.gettersMap;
  }
  commit(type, payload) {
    if (type in this.mutationsMap) {
      let fn = this.mutationsMap[type];
      fn(this.state, payload);
    } else {
      console.warn(`未实现的mutations:${type}`);
    }
  }
  dispatch(type, payload) {
    if ((type in this, this.actionsMap)) {
      let fn = this.actionsMap[type];
      return fn({
        commit: this.commit.bind(this)
      });
    }
  }

  get state() {
    return this._state._data.$$state;
  }
  set stete(val) {
    console.warn("please use replaceState to reset state");
  }
}

function install(Vue) {
  KVue = Vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    }
  });
}

export default { Store, install };
