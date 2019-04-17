"use strict";

var s = "hello";

function greet(name){
    console.log(`${s}, ${name}!`)
}

function goodbey(name){
    console.log(`Goodbey, ${name}!!!`);
}

// 把函数greet作为模块的输出暴露出去，这样其他模块就可以使用greet函数了
module.exports = {
    greet: greet,
    goodbey: goodbey
};