"use strict";
// 文件服务器

var fs = require("fs");
var url = require("url");
var path = require("path");
var http = require("http");

// 获得命令行当前根目录
var root = path.resolve(process.argv[2] || '.');

console.log("root is : " + root);
// 默认文件名
var defualtFile = ["index.html", "defualt.html"];

// 需求：当查找对象时目录时，依次查找目录下是否有index.html,defualt.html，有则返回，无报错
// 1.应用fs.readdirSync获得目录下内容
// 2.应用递归
var file_server = http.createServer(function(req, res){
    // 获得url的path
    var pathName = url.parse(req.url).pathname;

    // 拼接文件地址，获得本地文件目录
    var filePath = path.join(root, pathName);
    // 获得文件信息
    
    // 1.
    fs.stat(filePath, function(err, stats){
        if(err){
            // 报错
            console.log(404 + req.url);
            res.writeHead(404);
            res.end("404 Not Found");
        }else if(!err && stats.isFile()){
            // 文件
            console.log(200 + res.url);
            res.writeHead(200, "text/html");
            fs.createReadStream(filePath).pipe(res);
        }else if(!err && stats.isDirectory()){
            // 目录
            var dir = fs.readdirSync(filePath);
            for(let i = 0; i < defualtFile.length; i++)
            {
                if(dir.indexOf(defualtFile[i]) > -1){
                    console.log(200 + res.url);
                    res.writeHead(200, "text/html");
                    fs.createReadStream(path.join(filePath, defualtFile[i])).pipe(res);
                    return;
                }
            }
            
            // 报错
            console.log(404 + req.url);
            res.writeHead(404);
            res.end("<h1>404 Not Found</h1>");
            
        }
    })

    // 2.
    // function fileInfo(filepath){
    //     fs.stat(filepath, function(err, stats){
    //         if(err){
    //             console.log(404 + req.url);
    //             res.writeHead(404);
    //             res.end("<h1>404 Not Found</h1>");
    //         }else{
    //             if(stats.isFile()){
    //                 console.log(200 + req.url);
    //                 res.writeHead(200, "text/html");
    //                 fs.createReadStream(filepath).pipe(res);
    //             }else if(stats.isDirectory()){
    //                 let dpath = path.join(root, defualtFile.shift());
    //                 fileInfo(dpath);
    //             }
    //         }
    //     })
    // }

    // fileInfo(filePath);

})




file_server.listen("900");

console.log("file server is running at http://127.0.0.1:900");