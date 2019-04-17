"use strict";

// 求和
function sum(...n){
    let sum = 0;
    for(let i of n){
        sum += i;
    }
    return sum;
}

module.exports = sum;