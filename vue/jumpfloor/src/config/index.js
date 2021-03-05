import { random } from "../util/index";

//boss常量
export const BOSS_COUNT = 20;
export const BOSS_SPEED = 2;
export const BOSS_MIN_Y_SPAN = 30;
export const BOSS_MIN_X_SPAN = 10;
export const BossTypeEnum = {
    Normal: 1, //正常
    Sponge: 2, //海绵
    Spring: 3, //弹簧
    Thorn: 4, //地刺
    PaintEgg: 5, //彩蛋

    properties: {
        1: { name: 'Normal', desc: '正常地板', color: '#585858', prob: [0, 60], img: '', width: 180, height: 15, addBlood: 10 }, //prob概率区间
        2: { name: 'Sponge', desc: '海绵', color: '#e3d8d8', prob: [61, 80], img: '', width: 120, height: 25, addBlood: 5 },
        3: { name: 'Spring', desc: '弹簧', color: '#93735d', prob: [-1, -1], img: '', width: 140, height: 20, addBlood: 0 },
        4: { name: 'Thorn', desc: '地刺', color: '#a60a0a', prob: [81, 95], img: '', width: 100, height: 10, addBlood: -30 },
        5: { name: 'PaintEgg', desc: '彩蛋', color: '#dbc329', prob: [96, 100], img: '', width: 20, height: 20, addBlood: 0 }
    },
    generate: function() {
        let n = random(0, 100);
        for (let i in this.properties) {
            let regin = this.properties[i].prob;
            if (n >= regin[0] && n <= regin[1]) {
                return i - 0;
            }
        }
    }
}

//背景常量
export const BG_COUNT_MAX = 20;
export const BG_COUNT_MIN = 10;
export const BG_SIZE_MAX = 10;
export const BG_SPEED = 5;

//角色常量
export const PLAY_SIZE = 30;
export const PLAY_SPEED_X = 10;
export const PLAY_SPEED_Y = 2;
export const PLAY_BEGIN_Y = 60;
export const PLAY_READY_TIME = 3; //单位秒
export const PLAY_SHINE_TIME = 5; //单位毫秒
export const PLAY_DEFAULT_TYPE = 1; //1人 2 狗 3 猫