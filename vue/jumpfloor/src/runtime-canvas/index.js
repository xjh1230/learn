import { createRenderer } from "@vue/runtime-core";
import { nodeOps } from "./nodeOps";
import { patchProp } from "./patchProp";

const render = createRenderer({
    ...nodeOps,
    patchProp,
});

export function createApp(rootComponent) {
    return render.createApp(rootComponent);
}