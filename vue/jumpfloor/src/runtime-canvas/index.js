import { Texture, Sprite, Text, Container, Graphics } from "pixi.js";
import { createRenderer } from "@vue/runtime-core";
const eleMap = {
  Container: "Container",
  Sprite: "Sprite",
  Rect: "Rect",
  Circle: "Circle",
};

const render = createRenderer({
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
        ele.lineStyle(4, 0xff3300, 1);
        // ele.beginFill(0x66ccff);
        ele.drawRect(0, 0, 10, 10);
        ele.endFill();
        // ele.x = 0;
        // ele.y = 0;
        // Opt-in to interactivity
        ele.interactive = true;
        // Shows hand cursor
        //ele.buttonMode = true;
        break;
      case eleMap.Circle:
        ele = new Graphics();
        ele.lineStyle(4, 0xff3300, 1);
        // ele.beginFill(0x66ccff);
        ele.drawCircle(100, 310, 10);
        ele.endFill();
        // ele.x = 0;
        // ele.y = 0;
        ele.interactive = true;
        break;
    }
    return ele;
  },
  patchProp(el, key, prevValue, nextValue) {
    switch (key) {
      case "pos":
        el.moveTo(nextValue.x, nextValue.y);
        break;
      case "texture":
        el.texture = Texture.from(nextValue);
        break;
      case "onClick":
        el.on("pointertap", nextValue);
        break;
      default:
        console.log(arguments);
        el[key] = nextValue;
        break;
    }
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
});

export function createApp(rootComponent) {
  return render.createApp(rootComponent);
}
