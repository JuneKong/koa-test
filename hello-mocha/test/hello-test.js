"use strict";


// 测试hello.js文件

// 使用mocha依赖包实现测试
// **mocha默认会执行test目录下的所有测试，不要去改变默认目录。


const assert = require('assert');
const sum = require('../hello.js');

describe("#hello.js", () => {
    describe("#sum()", () => {

    // 在测试前初始化资源，测试后释放资源是非常常见的。mocha提供了before、after、beforeEach和afterEach来实现这些功能。
        before(function(){
            console.log('before:');
        });
        after(function(){
            console.log('after:');
        });
        beforeEach(function(){
            console.log('beforeEach:');
        });
        afterEach(function(){
            console.log('afterEach:');
        });
    // 

        it('sum() should return 0', () => {
            assert.strictEqual(sum(), 0);
        });
        it('sum(1) should return 1', () => {
            assert.strictEqual(sum(1), 1);
        });
        it('sum(1, 2) should return 3', () => {
            assert.strictEqual(sum(1,2), 3);
        });
        it('sum(1, 2, 3) should return 6', () => {
            assert.strictEqual(sum(1, 2, 3), 6);
        });
    })
})