"use strict";
/**
 * 数据库配置：默认
 */

var config = {
    database: 'test', // 连接的数据库
    username: 'root', // 用户名
    password: 'root', // 口令
    host: 'localhost', // 主机名
    port: '3306', // 端口名
    dialect: 'mysql', // 数据库方言mysql，postgres，sqlite和mssql之一
}

module.exports = config;