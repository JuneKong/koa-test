"use strict";

/**
 * 处理静态文件
 */
const fs = require("mz/fs");
const path = require("path");
const mime = require("mime");

// url: url前缀，类似"/static/"
// dir: 目录，类似__dirname + "/static"
function staticFiles(url, dir){
    return async (ctx, next) => {
        // 获得当前的路径reqpath
        let reqpath = ctx.request.path;
        // 判断当前路径是否有url前缀
        if(reqpath.startsWith(url)){
            // 拼接文件路径
            let fp = path.join(dir, reqpath.substring(url.length));
            // 判断文件是否存在
            if(await fs.exists(fp)){
                ctx.response.type = mime.getType(reqpath);
                ctx.response.body = await fs.readFile(fp);
            }else{
                ctx.response.status = 404;
            }
        }else{
            await next();
        }
    }
}

module.exports = staticFiles;