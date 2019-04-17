"use strict";

/**
 * nunjucks模板引擎的使用
 */

// 1.导入
const nunjucks = require("nunjucks");

// 2.配置环境
// paths: 模板地址/路径
function createEnv(paths, opts){
    var autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        throwOnUndefined = opts.throwOnUndefined || false,
        watch = opts.watch || false,
        noCache = opts.noCache || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(paths || 'views', {
                watch: watch,
                noCache: noCache,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    // 添加过滤器
    if(opts.filters){
        for(var f in opts.filters){
            env.addFilter(f, opts.filters[f]);
        }
    }

    return env;
}

// 3.创建环境
var env = createEnv("views", {
    watch: true,
    filters: {
        hex: function(n){
            return "0x" + n.toString(16);
        }
    }
});

//4.在views中创建模板文件hello.js

// 5.渲染模板
// context对象中的 属性名 对应模板中的 {{ 变量名 }}
var template = env.render("hello.html", { title:"greet", names: ["小明","小黄","小红","小白","小张"] });

console.log(template);