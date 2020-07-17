function isObj(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
}

function isArray(obj) {
    return Array.isArray(obj);
}
const log = console.log;
const reInter = /\{\{(.*?)\}\}/;

function defineReactive(obj, key, val) {
    var dep = new Dep();
    Object.defineProperty(obj, key, {
        get() {
            //   log("get", val);
            Dep.target && dep.addDep(Dep.target);
            //Dep.target = null;
            return val;
        },
        set(newval) {
            if (newval !== val) {
                // log("set", newval);
                val = newval;
                dep.notice();
            }
        },
    });
}
const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);

function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true,
    });
}
["push", "toString"].forEach((method) => {
    const original = arrayProto[method];
    def(arrayMethods, method, function mutator(...args) {
        const dep = this.__dep__;
        const result = original.apply(this, args);
        let inserted;
        // console.log(123456789);

        switch (method) {
            case "push":
                inserted = args;
                dep.notice();
                break;
            case "toString":
                Dep.target && dep.addDep(Dep.target);
                // Dep.target = null;
                break;
        }

        return result;
    });
});

function observerArray(obj) {
    obj.__proto__ = arrayMethods;
    obj.forEach((item) => {
        observer(item);
    });
}

function observer(obj) {
    if (obj) {
        if (isObj(obj)) {
            Object.keys(obj).forEach((k) => {
                observer(obj[k]);
                defineReactive(obj, k, obj[k]);
            });
        }
        if (isArray(obj)) {
            var dep = new Dep();
            obj.__dep__ = dep;
            observerArray(obj);
        }
    }
}
class KVue {
    constructor(options) {
        this.$el = document.querySelector(options.el);
        this.data = options.data;
        this.methods = options.methods;
        this.options = options;
        this.init();
    }
    init() {
        observer(this.data);
        this.proxy(this.data);
        new Compiler(this);
    }
    proxy(obj) {
        Object.keys(obj).forEach((key) => {
            Object.defineProperty(this, key, {
                get() {
                    return this.data[key];
                },
                set(newval) {
                    this.data[key] = newval;
                },
            });
        });
    }
}

class Compiler {
    constructor(vm) {
        this.vm = vm;
        this.init();
    }
    init() {
        this.compiler();
    }
    compiler(node) {
        node = node || this.vm.$el;
        node.childNodes.forEach((child) => {
            if (this.isElement(child)) {
                this.compilerElement(child);
            } else if (this.isInter(child)) {
                this.compilerText(child);
            }
            this.compiler(child);
        });
    }
    compilerElement(node) {
        // log(node);
        var attrs = node.attributes;
        Array.from(attrs).forEach((attr) => {
            var attrName = attr.name;
            var exp = attr.value;
            if (this.isDirective(attrName)) {
                let direct = attrName.substring(2);
                this.update(node, direct, exp);
            } else if (this.isEvent(attrName)) {
                let eventType = attrName.substring(1);
                let handler = this.vm.methods[exp] || exp;
                if (handler) {
                    if (typeof handler === "function") {
                        handler = handler.bind(this.vm);
                        node.addEventListener(eventType, handler);
                    }
                }
            }
        });
    }
    update(node, type, exp) {
        // log(type, val);
        if (this[`${type}Updater`]) {
            let fn = this[`${type}Updater`];

            new Watcher(this.vm, exp, function(val) {
                fn && fn(node, val);
            });
            let val = this.vm[exp];
            fn && fn(node, val);
        }
    }
    textUpdater(node, val) {
        node.textContent = val;
    }
    htmlUpdater(node, val) {
        node.innerHTML = val;
    }
    compilerText(node) {
        var exp = RegExp.$1;
        this.update(node, "text", exp);
    }
    isElement(node) {
        return node && node.nodeType === 1;
    }
    isInter(node) {
        return node && node.nodeType === 3 && reInter.test(node.textContent);
    }
    isDirective(attrName) {
        return attrName.indexOf("k-") === 0;
    }
    isEvent(attrName) {
        return attrName.indexOf("@") === 0;
    }
}

class Watcher {
    constructor(vm, exp, fn) {
        this.vm = vm;
        this.exp = exp;
        this.fn = fn;
        Dep.target = this;
        var val = this.vm[exp]; //调用一次添加监视器
        Dep.target = null;
        if (isArray(val)) {
            Dep.target = this;
            val.toString(); //调用一次给数据添加监视器
        }
        Dep.target = null;
    }
    update() {
        this.fn.call(null, this.vm[this.exp]);
    }
}

class Dep {
    constructor() {
        this.watchers = [];
    }
    addDep(watcher) {
        this.watchers.push(watcher);
    }
    notice() {
        this.watchers.forEach((w) => w.update());
    }
}