"use strict";

// HTTP服务器

var http = require("http");

var server = http.createServer(function(req, res){
    // 处理请求和响应
    console.log(req.method + ":" + req.url);
    res.writeHead(200, "text/html");
    res.end("<h1>Hello World!</h1>");
});

//服务器监听80端口
server.listen("80");

console.log("Server is running at http://127.0.0.1:80");