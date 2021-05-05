'use strict'
function logThis(){
    this.desc = 'logger'
    console.log(this)
}

new logThis()

sum(10, 20)
diff(10, 20)
function sum(x, y){
    return x + y
}

function diff(x, y){
    return x - y
}

let answer = true
if (answer === false){
    return 0
}else {
    return
}

const obj = {
    a: 1,
    b: 2,
    c: 3
}

const obj2 = {
    ...object,
    a: 0
}

console.log(obj2.a, obj2.b)

function printA() {
    console.log(answer)
    var answer = 1
}

printA()
printA()