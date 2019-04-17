"use strict";

/**
 * 处理登录的异步函数
 */

var index = async (ctx, next) => {
    // 先假设ctx中有render函数
    ctx.render("index.html", {
        title: 'Welcome!'
    })
};

var signin = async (ctx, next) => {
    let email = ctx.request.body.email || '',
        password = ctx.request.body.password || '';
    console.log(`email:${email}, password:${password}`);
    ctx.response.type = "text/html";
    if(email === "admin@example.com" && password === "123456"){
        // 成功
        ctx.render("signin-success.html", {
            title:'Sign In Success!',
            name: 'June'
        })
    }else{
        ctx.render('signin-fail.html', {
            title: 'Sign In Failed'
        })
    }
};

module.exports = {
    "GET /": index,
    "POST /signin": signin
}