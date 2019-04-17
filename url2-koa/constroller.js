"use strict";

/**
 * 处理router规则
 */
const fs = require("fs");

function addRoutes(mapping, router) {
    for (var url in mapping) {
        if (url.startsWith("GET ")) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log('get url: ' + path);
        } else if (url.startsWith("POST ")) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log('post url: ' + path);
        } else if(url.startsWith("DELETE ")){
            var path = url.substring(7);
            router.del(path, mapping[url]);
            console.log('delete url: ' + path);
        } else if(url.startsWith("PUT ")){
            var path = url.substring(4);
            router.put(path, mapping[url]);
            console.log('put url: ' + path);
        } else {
            console.log("invaild url!!!");
        }
    }
};

function addControllers(router, dir) {
    fs.readdirSync(`${__dirname}/${dir}`).filter((f) => {
        return f.endsWith('.js');
    }).forEach((f) => {
        console.log("controller name: " + f);
        let mapping = require(`${__dirname}/${dir}/${f}`);
        addRoutes(mapping, router);
    });
}

// 在此调用addControllers，表示只要导入该模块，就会执行js文件导入
// 
// **返回一个函数，使用时要调用
module.exports = function (dir = 'controllers') {
    var router = require("koa-router")();
    addControllers(router, dir);
    return router.routes();
};