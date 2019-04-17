"use strict";

const crypto = require("crypto");
const fs = require("fs");

// 1.MD5和SHA1(无密钥)
var md5Hash = crypto.createHash("md5");

// update(data, encode):可根据data更新hash，由于流的特点update可多次调用
md5Hash.update("hello md5 hash");
md5Hash.update("goodbey md5 hash");

// digest():计算需要被hash化的数据，*且hash对象调用了digest()后，不得再调用，不然会报错
console.log(md5Hash.digest("hex"));

// // 2.Hmac(同上，不同之处：有一个密钥)
// var hmac = crypto.createHmac("sha256", "LB-key");

// hmac.update("Joe");
// console.log(hmac.digest("hex"));

// 3.AES
// 封装加密
// function aesEncrypt(data, key){
//     const cipher = crypto.createCipher("aes192", key);
//     let encrypted = cipher.update(data);
//     encrypted = cipher.final("hex");
//     return encrypted;
// }
// // 封装解密
// function aesDecrypt(encrypt, key){
//     const decipher = crypto.createDecipher("aes192", key);
//     let decrypted = decipher.update(encrypt, "hex", "utf8");
//     decrypted += decipher.final("utf-8");
//     return decrypted;
// }

// let key = "LB-key";
// let crypted = aesEncrypt("Joe", key);
// let decryphted = aesDecrypt(crypted, key);
// console.log(crypted);
// console.log(decryphted);

// // 4.Differ-Hellman(DH) ==> 由于素数每次不相同，所以每次输出都是不一样的
// // 小明
// let ming = crypto.createDiffieHellman(2048);
// let ming_key = ming.generateKeys();

// // 小红
// let hong = crypto.createDiffieHellman(ming.getPrime(), ming.getGenerator());
// let hong_key = hong.generateKeys();

// // 交换
// let ming_secret = ming.computeSecret(hong_key);
// let hong_secret = hong.computeSecret(ming_key);

// console.log("ming : " + ming_secret.toString("hex"));
// console.log("hong : " + hong_secret.toString("hex"));


// 5.RSA
// 命令行先生成公钥和密钥
// var pub_key,
//     prv_key,
//     msg = "hello RSA";

// // 公加私解
// let en_by_pub = crypto.publicEncrypt(pub_key, Buffer.from(msg, "utf-8"));
// let de_by_prv = crypto.privateDecrypt(prv_key, en_by_pub);
// console.log("公加私解： "+ de_by_prv);

// // 私加公解
// let enc_prv = crypto.privateEncrypt(prv_key, Buffer.from(msg, "utf-8"));
// let dec_pub = crypto.publicDecrypt(pub_key, enc_prv);
// console.log("私加公解: "+ dec_pub);
