"use strict";

/**
 * 自动化管理mysql
 * **它最大的好处是避免了手动维护一个SQL脚本。
 */
const model = require('./model');
model.sync();

console.log('init db ok!');

// 就是因为同步表是异步操作，sync()返回的是一个Promise对象。
// 所以有process.exit(0)会强制结束进程，是的表没有创建成功
// process.exit(0);