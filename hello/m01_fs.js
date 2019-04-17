"use strict";

// fs内置模块
// 1.fs就是文件系统模块，负责读写文件。
// 2.与其他js模块不同是：fs模块同时提供了异步和同步的方法。

// 异步读取文件
var fs = require('fs');

// // 1.读取文本文件
// // **注：sample.txt必须在当前目录下，且文件编码utf-8
// fs.readFile('sample.txt', "utf-8", function(err, data){
//     // err为null, data为读取的string
//     if(err){
//         // 当发生错误时err为错误对象，data为undefined
//         console.log(err); //出错了
//     } else{
//         console.log(data); //正常
//     }
// });

// // 2.读取二进制文件
// //    如不传入文件编码时，返回的data是一个Buffer对象，Buffer对象就是一个包含零个或任意个字节的数组（注意和Array不同）
// fs.readFile("sample.png", function(err, data){
//     if(err){
//         console.log(err);
//     }else{
//         // buffer转为string
//         // var text = data.toString("utf-8");
//         // console.log(text);

//         // // string转为buffer
//         // var buf = Buffer.from(text, 'utf-8');
//         // console.log(buf);
//     }
// })

// // 同步读取文件
// // 不接受回调函数，使用try...catch捕获错误

// try {
//     var data = fs.readFileSync("sample.txt", "utf-8");
//     console.log(data);
// }catch(err){
//     console.log(err);
// }


// // 写文件
// var txt = "file";
// fs.writeFile("sample.txt", txt, function(err){
//     console.log(err);
// });

// // 获取文件信息

// fs.stat("sample.txt", function(err, stats){
//     if(err){
//         console.log(err);   
//     }else{
//         // stats为文本信息
//     }

// })


// try{
//     let info = fs.statSync("sample.txt");
//     console.log(info.isFile());
//     console.log(info.isDirectory());

//     if(info.isFile())
//     {
//         console.log(info.size);
//         console.log(info.birthtime);
//         console.log(info.mtime);
//     }
// }catch(err){
//     console.log(err);
// }

// // stream

// var am = fs.createReadStream("sample.txt");
// var ma = fs.createWriteStream("smaple.txt");
// am.pipe(ma);
// fs.readFile("sample.txt","utf-8", function(err, data){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data);
//     }
// });

// 读取目录下内容
var w = fs.readdir("D:/code/javascript", function(err, files){
    if(err){
        console.log(err);
    }else
    {
        console.log(files);
    }
})