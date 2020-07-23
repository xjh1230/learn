import { Store } from "vuex";

// 告诉编译器，index.ts中有一个router实例会被导出
declare const store: Store<any>;

export default store;
