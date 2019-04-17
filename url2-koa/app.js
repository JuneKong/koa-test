"use strict";

/**
 * name:模块化后处理url
 */

const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const controller = require("./constroller");

const app = new Koa();

app.use(async (ctx, next) => {
    console.log(`${ctx.request.method}: ${ctx.request.url}`);
    await next();
})

app.use(bodyParser());

// 导入controller是一个函数，要调用，不然会出错
app.use(controller());

app.listen(3000);
console.log("start at port 3000");