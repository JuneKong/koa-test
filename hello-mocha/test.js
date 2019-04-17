"use strict";

/**
 * 不使用mocha的情况下进行测试
 */

// 断言模块(最好使用严格模式)
const assert = require('assert');
const sum = require('./sum');

// 无
assert.strictEqual(sum(), 0);
// 1
assert.strictEqual(sum(1), 1);
// 3
assert.strictEqual(sum(1,2), 3);
// 6
assert.strictEqual(sum(1,2,3), 6);

// 1.测试无误的时候，无效果显示
// 2.测试有误则报错

// 使用这种方式进行测试的问题：
// 1.当测试出现错误，就不会再执行下面的断言
// 2.不能自动执行断言

