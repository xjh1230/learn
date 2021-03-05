import { Texture, Sprite, Text, Container, Graphics } from "pixi.js";
const eleMap = {
    Container: "Container",
    Sprite: "Sprite",
    Rect: "Rect",
    Circle: "Circle",
};
export const nodeOps = {
    createElement(type) {
        let ele;
        switch (type) {
            case eleMap.Container:
                ele = new Container();
                break;
            case eleMap.Sprite:
                ele = new Sprite();
                break;
            case eleMap.Rect:
                // 创建一个矩形
                ele = new Graphics();
                // ele.lineStyle(4, 0xff3300, 1);
                // ele.beginFill(0x66ccff); //0x66ccff
                ele.drawRect(0, 0, 1, 1);
                // ele.endFill();
                ele.interactive = true;
                break;
            case eleMap.Circle:
                //方式1：子元素方式
                // ele = new Sprite();
                // let cir = new Graphics();
                // ele.circle = cir;
                //方式2：直接方式
                ele = new Graphics();
                ele.drawCircle(0, 0, 1);
                ele.interactive = true;
                break;
        }
        return ele;
    },

    createText(text) {
        return new Text(text);
    },
    setElementText(node, text) {
        const cText = new Text(text);
        node.addChild(cText);
    },
    insert(el, parent) {
        // append
        // console.log(el);
        parent.addChild(el);
    },
    // 新加接口实现
    // 处理注释
    createComment() {},
    // 获取父节点
    parentNode() {},
    // 获取兄弟节点
    nextSibling() {},
    // 删除节点时调用
    remove(el) {
        const parent = el.parent;
        if (parent) {
            parent.removeChild(el);
        }
    },
}