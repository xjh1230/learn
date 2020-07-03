import Vue from "vue";
import noticeBox from "./Notice.vue";

const NoticeBoxCtor = Vue.extend(noticeBox);
let instance;

const initInstance = () => {
    // instance = new NoticeBoxCtor({ el: document.createElement("div") });
    instance = new NoticeBoxCtor();
    instance.$mount();
    console.log(instance.$el, '0000000000')
};
const hasOwn = Object.prototype.hasOwnProperty;
const showNotice = function(options) {
    if (!instance) {
        initInstance();
    }
    if (!instance.isShow) {
        for (let prop in options) {
            if (hasOwn.call(options, prop)) {
                instance[prop] = options[prop];
            }
        }
        document.body.appendChild(instance.$el);
        console.log(instance.$el, 1111111111)
        instance.show();

        instance.remove = function() {
            document.body.removeChild(instance.$el);
            console.log(instance.$el, 2222222222)
                // instance.$destroy();
                // instance.$destroy();
            console.log(12345678);
        };
    }
};

const Notice = function(options) {
    showNotice(options);
};
Vue.prototype.$createNotice = Notice;
export default Notice;