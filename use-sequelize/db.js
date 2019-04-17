"use strict";

const Sequelize = require('sequelize');
const config = require('./config');
const uuid = require('uuid');

function generateId(){
    return uuid.v4(); // v4随机生成 v1基于时间戳生成
}

let sequelize = new Sequelize(config.database, config.username, config.password, {
    dialect: config.dialect,
    host:config.host,
    pool:{
        max: 5,
        min: 0,
        timeout: 30000
    }
});

const ID_TYPE = Sequelize.STRING(50);

function defineModel(name, attributes){
    let attrs = {};
    // 自身特有的属性
    for(let key in attributes){
        let value = attributes[key];
        if(typeof value === 'object' && value['type']){
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        }else{
            attrs[key] = {
                type: value,
                allowNull: false
            }
        }
    }
    // 公共的，统一的属性
    attrs.id = {
        type: ID_TYPE,
        primaryKey: true
    };

    attrs.createdAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };

    attrs.updatedAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };

    attrs.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    }

    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        hooks: {
            // 验证前使用的钩子
            beforeValidate: function(obj){
                let now = Date.now();
                console.log(obj);
                // 根据isNewRecord设置主键（如果主键为null或undefined） 
                if(obj.isNewRecord){
                    if(!obj.id){
                        obj.id = generateId();
                    }
                    obj.createdAt = now;
                    obj.updatedAt = now;
                    obj.version = 0;
                }else{
                    obj.updatedAt = Date.now();
                    obj.version++;
                }
            }
        }
    });
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];

let obj = {
    defineModel: defineModel,
    ID: ID_TYPE,
    generateId: generateId,
    sync: () => {
        // 不是生成坏境时
        if(process.env.NODE_ENV !== 'production'){
            sequelize.sync({force: true}); //force 每个model创建时都会，如果是数据库中有这个表，先drop掉，然后create表，然后再进行数据插入。
            console.log("db sync");
        }else{
            throw new Error(`Cannot sync() when NODE_ENV is set to 'production'.`);
        }
    }
}
// 导出数据类型, 防止创建时使用的类型要重新定义sequelize实例
for(let type of TYPES){
    obj[type] = Sequelize[type];
}

module.exports = obj;