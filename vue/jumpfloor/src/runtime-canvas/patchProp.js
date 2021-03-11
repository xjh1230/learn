import { Texture, Sprite, Text, Container, Graphics } from "pixi.js";

export const patchProp = (
    el,
    key,
    prevValue,
    nextValue,
    isSVG = false,
    prevChildren,
    parentComponent,
    parentSuspense,
    unmountChildren
) => {
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
        case "rectstyle":
            let { color: rectColor, alpha: rectAlpha } = nextValue
            el.beginFill(rectColor, rectAlpha); //0x66ccff
            el.drawRect(0, 0, 1, 1);
            el.endFill();
            break;
        case "circlestyle":
            let { color: circleColor, alpha: circleAlpha, linewidth: circleLineWidth, radius } = nextValue;
            //方式1：子元素方式
            // if (el.circle) {
            //     el.removeChild(el.circle);
            //     el.circle.lineStyle(circleLineWidth, circleColor, circleAlpha);
            //     el.circle.drawCircle(0, 0, radius);
            //     el.addChild(el.circle);
            // }
            //方式2：直接方式
            el.lineStyle(circleLineWidth, circleColor, circleAlpha);
            el.drawCircle(0, 0, radius);
            el.endFill();
            break;
        default:
            // console.log(nextValue, key);
            el[key] = nextValue;
            break;
    }
}