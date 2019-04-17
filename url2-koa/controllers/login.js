"use strict";

/**
 * 处理登录的异步函数
 */

//  1.编写异步函数
var index = async (ctx, next) => {
    ctx.response.body = `
        <h1>index</h1>
        <form action="/signin" method="post">
            <p>name: <input type="text" name="name" value="koa"/></p>
            <p>password：<input type="password" name="password" /></p>
            <p><input type="submit" value="submit" /></p>
        </form>
    `;
};

var signin = async (ctx, next) => {
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
};

// 2.暴露模块
module.exports = {
    "GET /": index,
    "POST /signin": signin
}