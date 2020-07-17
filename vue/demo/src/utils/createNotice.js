import Vue from "vue";

function createNotice(Component, props) {
  // const Cotor = Vue.extend(Component)
  // var comp = new Cotor(props)
  // var vm = comp.$mount()
  // document.body.appendChild(vm.$el)
  // comp.remove = () => {
  //     document.body.removeChild(vm.$el);
  //     vm.$destory();
  // }

  let vm = new Vue({
    render(h) {
      return h(Component, { props });
    }
  }).$mount();

  document.body.appendChild(vm.$el);

  const comp = vm.$children[0];

  comp.show();
  comp.remove = () => {
    document.body.removeChild(vm.$el);
    vm.$destory();
  };

  return comp;
}

// Vue.prototype.$createNotice = createNotice;
// export default createNotice;
