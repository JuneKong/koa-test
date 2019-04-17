"use strict";

const Sequelize = require('sequelize');
const config = require('./config');

// 1.创建对象
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql', //你要连接的数据库方言mysql，postgres，sqlite和mssql之一
    pool: { // sequelize连接池配置
        max: 5,
        min: 0,
        idle: 30000 // 空闲的最长时间
    }
});

// 2.定义映射关系
// 参数一：根据名称pet自动生成表名pets
// 参数二：指定列名和数据类型
// 参数三：额外配置
var Pet = sequelize.define('pet', {
        id:{
            type: Sequelize.STRING(50),
            primaryKey: true
        },
        name: Sequelize.STRING(100),
        gender: Sequelize.BOOLEAN,
        birth: Sequelize.STRING(10),
        createdAt: Sequelize.BIGINT,
        updatedAt: Sequelize.BIGINT,
        version: Sequelize.BIGINT
    },{
        timestamps: false
    }
);

var now = Date.now();

// 使用promise方式
// Pet.create({
//     id:'g-' + now,
//     name: 'June',
//     gender: false,
//     birth: '2006-06-06',
//     createdAt: now,
//     updatedAt: now,
//     version: 0
// }).then(function(p){
//     console.log("create: " + p);
// }).catch(function(err){
//     console.log('catch err: ' + err);
// });

// 使用await方法
// (async () => {
//     var dog = await Pet.create({
//         id:'g-' + now,
//         name: 'May',
//         gender: false,
//         birth: '2003-03-03',
//         createdAt: now,
//         updatedAt: now,
//         version: 0
//     });

//     console.log("created: " + JSON.stringify(dog));
// })();

// 查询数据
// **使用findAll获得实例
// (async () => {
//     var pets = await Pet.findAll({
//         where:{
//             name:'June'
//         }
//     });
//     console.log(`find ${pets.length} pets`);
//     for(let p of pets){
//         console.log(JSON.stringify(p));
//     }
// })();

// 更新数据
// **先对实例属性赋新值，再使用save()方法
(async () => {
    var pets = await Pet.findAll({
        where:{
            name:'May'
        }
    });
    console.log(`find ${pets.length} pets`);

    for(let p of pets){
        console.log(JSON.stringify(p));
        console.log('update pet...');
        p.gender = true;
        p.updatedAt = Date.now();
        p.version ++;
        await p.save();
        if(p.version == 3){
            await p.destroy();
            console.log(`${p.name} was destroy`);
        }
        console.log('update: '+JSON.stringify(p));
    }
     
})();

// 删除实例
// 直接调用destroy()方法
(async () => {

})();
