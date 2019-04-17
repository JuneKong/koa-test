"use strict";

var hello = async (ctx, next) => {
    // 锚点值在ctx.params.xxx获得
    var name = ctx.params.name;
    ctx.response.body = `<h1>hello ${name}</h1>`;
};

module.exports = {
    "GET /hello/:name":hello
};