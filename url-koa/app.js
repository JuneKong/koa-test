"use strict";

/**
 * name:处理url
 */
// 在koa2中由于导入的koa是一个类，所以使用大写开头
const Koa = require("koa");

const bodyParser = require("koa-bodyparser");

// koa-router:集中处理url的中间件

// 1.导入:由于koa-router导入是一个函数，所以要先调用
const router = require("koa-router")();


const app = new Koa();

app.use(async (ctx, next) => {
    console.log(`${ctx.request.method}: ${ctx.request.url}`);
    await next();
})

// 2.使用router处理url
// 2.1 get请求
// router.get("/", async (ctx, next) => {
//     // 返回的内容在ctx.response.body中
//     ctx.response.body = '<h1>index</h1>';
// });

router.get("/hello/:name", async (ctx, next) => {
    // 锚点值在ctx.params.xxx获得
    var name = ctx.params.name;
    ctx.response.body = `<h1>hello ${name}</h1>`;
})

// 2.2 post请求
// 要使用koa-bodyparser中间件解析request.body的请求数据
app.use(bodyParser());

router.get("/", async (ctx, next) => {
    ctx.response.body = `
        <h1>index</h1>
        <form action="/signin" method="post">
            <p>name: <input type="text" name="name" value="koa"/></p>
            <p>password：<input type="password" name="password" /></p>
            <p><input type="submit" value="submit" /></p>
        </form>
    `;
});

router.post("/signin", async (ctx, next) => {
    let name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`name:${name}, password:${password}`);
    ctx.response.type = "text/html";
    if(name === "koa" && password === "123456"){
        ctx.response.body = `<h1>hello ${name}</h1>`;
    }else{
        ctx.response.body = `
            <h1>login fail</h1>
            <p><a href='/'>again login</p>    
        `;
    }
})

// 3.添加router中间件
app.use(router.routes());

// 监听端口3000
app.listen(3000);
console.log("start at port 3000");