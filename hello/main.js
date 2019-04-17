"use strict";


// 引入hello模块：
var hello = require('./hello');

var s = "Joe";

hello.greet(s);

hello.goodbey(s);


// 总结：
// 1.对外暴露模块使用 module.exports = name;
// 2.引入模块用Node提供的require函数
// 3.require函数的参数是模块的相对路径 -- 不要忘了写相对目录!
// 4.若只写模块名，Node会依次在内置模块、全局模块和当前模块下查找，很有可能会查找报错
// 
// 5.这种模块加载机制被称为 CommonJS规范。
