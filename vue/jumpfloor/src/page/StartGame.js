import { h, defineComponent } from '@vue/runtime-core';
import bgmImg from "../../assets/bgm.jpg";
import startBtn from "../../assets/startBtn.png";

export default defineComponent({
    setup(props, ctx) {
        console.log(process.env);
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
                rectstyle: {
                    color: 0xDC143C, //颜色
                    alpha: Math.random(),
                },
            }),
            h("Circle", {
                x: 250,
                y: 150,
                scale: { //可以放大缩小图片
                    x: 1,
                    y: 1,
                },
                circlestyle: {
                    linewidth: Math.floor(Math.random() * 10 + 1), //线条宽度
                    color: '0xDC143C', //颜色
                    alpha: 1,
                    radius: Math.floor(Math.random() * 20 + 1), //半径
                },
            })

        ])
    }
})