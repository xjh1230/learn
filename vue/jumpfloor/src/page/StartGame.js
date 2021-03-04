import { h, defineComponent } from '@vue/runtime-core';
import bgmImg from "../../assets/bgm.jpg";
import startBtn from "../../assets/startBtn.png";

export default defineComponent({
    setup(props, ctx) {

        const handleClick = () => {
            ctx.emit("changePage", "GamePage")
        }
        return {
            handleClick
        }
    },

    render(ctx) {
        return h("Container", [
            h("Sprite", { texture: bgmImg }),
            h("Sprite", {
                texture: startBtn,
                x: 250,
                y: 650,
                interactive: true,
                onClick: ctx.handleClick
            }),
            h("Rect", {
                x: 350,
                y: 550,
                height: 110,
                width: 120,
                rectcolor: {
                    color: 0xDC143C, //颜色
                    alpha: Math.random(),
                },
            }),
            h("Circle", {
                x: 250,
                y: 550,
                scale: { //可以放大缩小图片
                    x: 0.5,
                    y: 0.5,
                },
                circlestyle: {
                    width: 20, //线条宽度
                    color: 0xDC143C, //颜色
                    alpha: Math.random(),
                    radius: 50, //半径
                },
            })

        ])
    }
})