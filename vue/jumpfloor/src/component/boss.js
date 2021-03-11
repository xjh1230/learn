import {
    ref,
    computed,
    defineComponent,
    h,
    reactive,
    onMounted,
    onUnmounted,
} from "@vue/runtime-core";
import { BOSS_SETTING, stage } from "../config";
import { game } from "../Game";
import { random, randomColor, outTest, edgeTest, checkExists } from '../util/index'
import Rect from './rect'
import Circle from './circle'

let uid = 1;
const generate = () => {
    let type = BOSS_SETTING.BossTypeEnum.generate();
    let _uid = uid++;
    if (uid > (1 << 30) - 1) {
        uid = 0;
    }
    return {
        x: random(0, stage.width - BOSS_SETTING.BossTypeEnum.properties[type].width),
        y: random(stage.height, stage.height * 4),
        type,
        speed: BOSS_SETTING.BOSS_SPEED,
        exists: true,
        key: _uid,
        ...BOSS_SETTING.BossTypeEnum.properties[type]
    };
}
const useBoss = () => {
    const bosss = reactive([])
    const fill = () => {
        let begin = bosss.length;
        let end = bosss.filter(b => b.exists).length;
        let score = end - begin;
        while (bosss.length < BOSS_SETTING.BOSS_COUNT) {
            let tmp = generate();
            let find = bosss.find(b => { return Math.abs(b.y - tmp.y) <= BOSS_SETTING.BOSS_MIN_Y_SPAN })
            if (!find) {
                bosss.push(tmp)
            }
        }
    }
    const handleBossTicker = () => {
        fill();
        checkExists(bosss);
    }
    onMounted(() => {
        game.ticker.add(handleBossTicker)
    });
    onUnmounted(() => {
        game.ticker.remove(handleBossTicker)
    });
    return {
        bosss
    }
}
export default defineComponent({
    setup(props, ctx) {
        const { bosss } = useBoss();
        return {
            bosss
        }
    },
    render(ctx) {
        const createRect = (info, index) => {
            if (info.type == 5) {
                return h(Circle, {
                    x: info.x,
                    y: info.y,
                    linewidth: info.width, //线条宽度
                    color: info.color, //颜色
                    radius: info.width / 2,
                    key: info.key
                });
            } else {
                return h(Rect, {
                    x: info.x,
                    y: info.y,
                    width: info.width, //线条宽度
                    color: info.color, //颜色
                    height: info.height,
                    key: info.key
                });
            }

        }
        return h('Container', [
            ...ctx.bosss.map(createRect)
        ])
    },
})