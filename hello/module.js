"use strict";

// 基本模块：
// 1.global：全局对象
// 2.process：代表Node.js进程
//     process.cwd():返回当前工作目录
//     process.chdir():切换当前工作目录
//     *process.nextTick(fn):调用可以使在下一次事件响应中执行代码,不是立即执行，而是等到下一次事件循环

var process = require('process');

process.nextTick(function(){
    console.log(2);
})

console.log(1);

// 3. 使用process响应exit事件，就可以在程序即将退出时执行某个回调函数

process.on("exit", function(code){
    console.log("about to exit with code:" + code);
})