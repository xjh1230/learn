console.log('index')
const promises = [
    Promise.resolve(1),
    new Promise((reslove, reject) => {
        setTimeout(() => {
            reslove(10)
        }, 1000);
    }),
    new Promise((reslove, reject) => {
        setTimeout(() => {
            reject(10)
                // reslove(20)
        }, 1000);
    })
]

Promise.all(promises).then(s => {
    console.log(s)
}).catch(err => {
    console.log(err)
})
console.log(1234)
console.log('123')