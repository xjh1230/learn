export const random = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
}

export const randomColor = () => {
    let r = random(0, 255)
    let g = random(0, 255)
    let b = random(0, 255)
    return `0x${((r << 16) | (g << 8) | b).toString(16)}`
}