import { stage } from '../config'
export const random = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
}

export const randomColor = () => {
    let r = random(0, 255)
    let g = random(0, 255)
    let b = random(0, 255)
    return `0x${((r << 16) | (g << 8) | b).toString(16)}`
}

export const outTest = (obj) => {
    return obj.y < 0
}

export const edgeTest = (obj) => {
    return obj.y > stage.height / 5
}

let uid = 1;
export const generateid = () => {
    if (uid++ > (1 << 30) - 1) {
        uid = 0;
    }
    return uid
}