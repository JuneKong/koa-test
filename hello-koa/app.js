"use strict";

// 在koa2中由于导入的koa是一个类，所以使用大写开头
const Koa = require("koa");

const app = new Koa();

// 添加中间件

app.use(async (ctx, next) => {
    console.log(`${ctx.request.method}: ${ctx.request.url}`);
    await next();
})

app.use(async (ctx, next) => {
    let start = new Date().getTime();
    await next();
    let interval = new Date().getTime() - start;
    console.log("time: "+ interval);
})

app.use(async (ctx, next) => {
    await next();

    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>hello koa2</h1>';
    console.log("get html");
});

// 监听端口3000
app.listen(3000);
console.log("start at port 3000");

// 现在无论输入什么地址，显示的内容都是一样的
// 处理url在url-koa中