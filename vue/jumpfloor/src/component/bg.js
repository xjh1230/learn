import {
    ref,
    computed,
    defineComponent,
    h,
    reactive,
    beforeMount,
    onMounted,
    onUnmounted,
    created
} from "@vue/runtime-core";
import { stage, BG_SETTING } from "../config";
import { game } from "../Game";
import { random, randomColor, outTest, edgeTest, checkExists } from '../util/index'
import Circle from './circle'

let uid = 1;
const generate = (isCreate) => {
    let x = random(0, stage.width);
    let y = random(isCreate ? (stage.height / 3) : stage.height / 9 * 8, stage.height);

    let radius = random(0, BG_SETTING.maxSize);
    let speed = BG_SETTING.speed;
    let color = randomColor();
    let lineWidth = Math.floor(Math.random() * BG_SETTING.maxLineWidth + 1);
    let _uid = uid++;
    if (uid > (1 << 30) - 1) {
        uid = 0;
    }
    return {
        x,
        y,
        radius,
        speed,
        color,
        lineWidth,
        exists: true,
        _uid,
        key: _uid
    }
};
const useBgCircle = () => {
    const handleBgTicker = () => {
        fill(false);
        checkExists(bgs);
    };
    const fill = (isCreate) => {
        let bg_count = random(BG_SETTING.minCount, BG_SETTING.maxCount);
        let currentCount = bgs.filter(bg => edgeTest(bg)).length; //临界检测，防止最下放为空
        while (currentCount < bg_count) {
            currentCount++;
            bgs.push(generate(isCreate))
        }
    }

    onMounted(() => {
        game.ticker.add(handleBgTicker)
    });
    onUnmounted(() => {
        game.ticker.remove(handleBgTicker)
    });

    let bgs = reactive([]);
    fill(true);
    return {
        bgs
    }
};
export default defineComponent({
    setup(props, ctx) {
        const { bgs } = useBgCircle();
        return {
            bgs
        }
    },
    render(ctx) {
        const createCircle = (info, index) => {
            return h(Circle, {
                x: info.x,
                y: info.y,
                linewidth: info.lineWidth, //线条宽度
                color: info.color, //颜色
                radius: info.radius,
                key: info.key
            });
        };
        return h('Rect', {
            x: 0,
            y: 0,
            height: stage.height,
            width: stage.width,
            rectstyle: {
                color: 0x121212, //颜色
                alpha: 1,
            }
        }, [
            ...ctx.bgs.map(createCircle)
        ])

        // return h("Container", [
        //     h('Rect', {
        //         x: 0,
        //         y: 0,
        //         height: stage.height,
        //         width: stage.width,
        //         rectstyle: {
        //             color: 0x121212, //颜色
        //             alpha: 1,
        //         }
        //     }),
        //     ...ctx.bgs.map(createCircle)
        // ])
    }

})