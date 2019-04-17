"use strict";
/**
 * 根据环境读取不同数据库配置
 * 
 * 具体的规则是：
 *      先读取config-default.js；
 *      如果不是测试环境，就读取config-override.js，如果文件不存在，就忽略。
 *      如果是测试环境，就读取config-test.js。
 */


const defaultConfig = './config-default.js';
const overrideConfig = './config-override.js';
const testConfig = './config-test.js';

const fs = require('fs');

let config = null;

if(process.env.NODE_ENV === 'test'){
    console.log(`Load ${testConfig}...`);
    config = require(testConfig);
}else{
    console.log(`Load ${defaultConfig}...`);
    config = require(defaultConfig);
    try{
        if(fs.statSync(overrideConfig).isFile()){
            console.log(`Load ${overrideConfig}...`);
            config = Object.assign(config, require(overrideConfig));
        }
    }catch(err){
        console.log(`Cannot load ${overrideConfig}...`);
    }
}

module.exports = config;