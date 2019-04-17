"use strict";

/**
 * name:模块化后处理url
 */

const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const controller = require("./constroller");
const temaple = require("./templating");

// **注：NODE_ENV有可能是undefined，所以不要使用NODE_ENV === "development"
const isProduction = process.env.NODE_ENV === "production";


const app = new Koa();

app.use(async (ctx, next) => {
    console.log(`${ctx.request.method}: ${ctx.request.url}`);
    var start = new Date().getTime(),
        intervalTime;
    await next();
    intervalTime = new Date().getTime() - start;
    // 设置响应头
    ctx.response.set("X-Response-Time", `${intervalTime}ms`);
})

// 处理静态文件（也可是使用第三方包处理静态文件）
// production环境下，静态文件由部署的反向代理服务器处理，不需要node处理
// development环境下，希望koa处理静态文件，不然就要手动部署反向代理服务器，会使得开发环境很复杂。
if(!isProduction){
    let static_files = require("./static-files");
    app.use(static_files("/static/", __dirname + "/static"));
}


app.use(bodyParser());

app.use(temaple("views", {
    noCache: !isProduction,
    watch: !isProduction
}));

// 导入controller是一个函数，要调用，不然会出错
app.use(controller());

app.listen(3000);
console.log("start at port 3000");