"use strict";

/**
 * 处理models文件
 */

const fs = require('fs');
const db = require('./db');

let files = fs.readdirSync(__dirname + '/models/');

let js_files = files.filter( f => {
    return f.endsWith('.js');
}, files);

// let exp = {
//     sync: () => {
//         db.sync();
//     }
// }

// for(let f of js_files){
//     console.log(`import model from file ${f}...`);
//     let name = f.substring(0, f.length - 3);
//     exp[name] = require(__dirname + '/models/' + f);
// };

// module.exports = exp;

module.exports = {};

for(let f of js_files){
    console.log(`import model from file ${f}...`);
    let name = f.substring(0, f.length - 3);
    module.exports[name] = require(__dirname + '/models/' + f);
}

module.exports.sync = () => {
    db.sync();
}