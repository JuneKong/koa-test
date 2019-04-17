"use strict";

/**
 * 集成Nunjucks
 */

const nunjucks = require("nunjucks");

function createEnv(paths, opts){
    var autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        wacth = opts.wacth || false,
        noCache = opts.noCache || false,
        trowOnUndefined = opts.trowOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(paths || "views", {
                wacth: wacth,
                noCache: noCache,
            }), {
                autoescape: autoescape,
                throwOnUndefined: trowOnUndefined
        });
    
    if(opts.filters){
        for(var f in opts.filters){
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

function templating(path, opts){
    let env = createEnv(path, opts);
    return async (ctx, next) => {
        // 为ctx添加render函数
        ctx.render = function(view, model){
            // 把渲染内容添加到body中
            // ctx.state缓存内容
            // model传入数据
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            // 设置响应的文件类型
            ctx.response.type = "text/html";
        };
        // 处理下一个中间件
        await next();
    }
}

module.exports = templating;