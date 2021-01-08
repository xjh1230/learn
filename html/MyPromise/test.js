

var x = Promise.reject(1)
async function foo(){
    try {
        var v= await x;
    } catch (error) {
        console.log(error)
    }
}
var p = foo()
console.log(p)
p.then(console.log)


// function* myGenerator(){
//     yield 10;
//     yield 20
// }
// let tor = myGenerator()
// async function* myAsyncGenerator(){
//     yield 100;
//     yield 200;
//     yield 300;
//     yield 400;
// }

// let tor2=myAsyncGenerator()
// let all =[]
// var output=()=>console.log(all)
// function picker(result){
//     if(result.done) return output()
//     all.push(result.value)
//     return tor2.next().then(picker)
// }
// tor2.next().then(picker)

// let output=all=>console.log(all)
// async function picker2(tor){
//     let all = []
//     let extract=({value,done})=>{
//         return !done&&all.push(value)
//     }
//     while(extract(await tor.next()));
//     return all
// }
// picker2(tor2).then(output)


// function sleep(tag,n,value){
//     console.log(tag)
//     return new Promise(reslove=>setTimeout(() => {
//         reslove(value)
//     }, n))
// }
// async function* myAsyncGenerator(){
//     yield sleep('yield 1st',3000,'value 1 delay 3s')
//     yield sleep('yield 2nd',1000,'value 2 delay 1s')
// }
// let tor = myAsyncGenerator()
// let output= ({value,done})=>console.log(value)
// let values = [tor.next(),tor.next()]
// values.forEach(v=>v.then(output))


function Parent(name){
    this.name=name
}
function Child(name,age){
    Parent.call(this,name)
    this.age=age
    
    
}
function object(o){
    function F(){}
    F.prototype=o;
    return new F();
}
function inheritPrototype(subType,supType){
    // let protoType = Object.create(supType.prototype)
    let protoType = object(supType.prototype)
    protoType.constructor=subType
    console.log(protoType,supType)
    subType.prototype=protoType
}

inheritPrototype(Child,Parent)

var c= new Child('name',123)
var p = new Parent('name2')
Child.prototype.sayAge=function(){
    console.log(this.age,111111)
}
Parent.prototype.sayName=function(){
    console.log(this.name,222222)
}

c.sayAge();
c.sayName();
