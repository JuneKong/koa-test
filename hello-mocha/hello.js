"use strict";

// 待测试文件

function sum(...n){
    let s = 0;
    for(let i of n){
        s += i;
    }
    return s;
}

module.exports = sum;