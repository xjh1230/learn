import {
    h,
    defineComponent,
    ref,
    onMounted,
    onUnmounted,
    reactive,
} from '@vue/runtime-core';
// import Bg from '../component/bg'
// import Boss from '../component/boss';
import { BOSS_SETTING, stage, BG_SETTING } from "../config";
import { game } from "../Game";
import { random, randomColor, outTest, edgeTest, generateid } from '../util/index'
import Rect from '../component/rect'
import Circle from '../component/circle'
const generateBoss = () => {
    let type = BOSS_SETTING.BossTypeEnum.generate();

    let bossProp = BOSS_SETTING.BossTypeEnum.properties[type];
    return {
        x: random(0, stage.width - bossProp.width),
        y: random(stage.height, stage.height * 4),
        type,
        speed: BOSS_SETTING.BOSS_SPEED,
        exists: true,
        key: generateid(),
        width: bossProp.width,
        height: bossProp.height,
        color: bossProp.color,
        addBlood: bossProp.addBlood,
    };
}
const useBoss = () => {
    const bosss = reactive([])
    const fill = () => {
        let begin = bosss.length;
        let end = bosss.filter(b => b.exists).length;
        let score = end - begin;
        while (bosss.length < BOSS_SETTING.BOSS_COUNT) {
            let tmp = generateBoss();
            let find = bosss.find(b => { return Math.abs(b.y - tmp.y) <= BOSS_SETTING.BOSS_MIN_Y_SPAN })
            if (!find) {
                bosss.push(tmp)
            }
        }
    }
    const handleBossTicker = () => {
        fill();
        checkExists();
    }
    const checkExists = () => {
        let deletes = [];
        bosss.forEach(bg => {
            bg.y -= bg.speed;
            if (bg.exists) {
                bg.exists = !outTest(bg)
            }
            if (!bg.exists) {
                deletes.push(bg._uid);
            }
        });
        deletes.forEach(uid => {
            let index = bosss.findIndex(bg => bg._uid == uid);
            bosss.splice(index, 1);
        })
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

const generateBg = (isCreate) => {
    let x = random(0, stage.width);
    let y = random(isCreate ? (stage.height / 3) : stage.height / 9 * 8, stage.height);

    let radius = random(0, BG_SETTING.maxSize);
    let speed = BG_SETTING.speed;
    let color = randomColor();
    let lineWidth = Math.floor(Math.random() * BG_SETTING.maxLineWidth + 1);

    return {
        x,
        y,
        radius,
        speed,
        color,
        lineWidth,
        exists: true,
        key: generateid()
    }
};
const useBgCircle = () => {
    const handleBgTicker = () => {
        fill(false);
        checkExists();
    };
    const fill = (isCreate) => {
        let bg_count = random(BG_SETTING.minCount, BG_SETTING.maxCount);
        let currentCount = bgs.filter(bg => edgeTest(bg)).length; //临界检测，防止最下放为空
        while (currentCount < bg_count) {
            currentCount++;
            bgs.push(generateBg(isCreate))
        }
    };
    const checkExists = () => {
        let deletes = [];
        bgs.forEach(bg => {
            bg.y -= bg.speed;
            if (bg.exists) {
                bg.exists = !outTest(bg)
            }
            if (!bg.exists) {
                deletes.push(bg._uid);
            }
        });
        deletes.forEach(uid => {
            let index = bgs.findIndex(bg => bg._uid == uid);
            bgs.splice(index, 1);
        })
    };
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
        const handleClick = () => {
            ctx.emit("changePage", "GamePage")
        }
        const { bosss } = useBoss();
        const { bgs } = useBgCircle();
        return {
            bosss,
            bgs,
            handleClick,
        }
    },

    render(ctx) {
        const createBoss = (info, inex) => {
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
        const createBg = (info, index) => {
            return h(Circle, {
                x: info.x,
                y: info.y,
                linewidth: info.lineWidth, //线条宽度
                color: info.color, //颜色
                radius: info.radius,
                key: info.key
            });
        }
        return h("Container", [
            ...ctx.bosss.map(createBoss),
            ...ctx.bgs.map(createBg)
        ]);
    }
})