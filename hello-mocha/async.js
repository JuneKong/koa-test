"use strict";

// 待测试的异步文件

const fs = require('mz/fs');

module.exports = async () => {
    let text = await fs.readFile('./data.txt', 'utf-8');
    let result = new Function('return ' + text);
    let r = result();
    console.log(`Calculate: ${text} = ${r}`);
    return r;
}
