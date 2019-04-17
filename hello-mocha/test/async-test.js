"use strict";

// 异步测试

const fs = require("fs");
const assert = require("assert");
const async_test = require("../async");

describe("#asycn.js", () => {
    describe("readFile", () => {

        // 1.1测试同步,不需要done
        it('#sync function', function () {
            // TODO:
            assert(true);
        });
        // 1.测试异步，要传入done参数
        it('#async function', function(done){
            fs.readFile("./data.txt", (err, data) => {
                // 测试异步函数需要在函数内部手动调用done()表示测试成功，done(err)表示测试出错。
                if(err){
                    done(err);
                }else{
                    done();
                }
            })
        });

        // 2.1使用async
        it('#async done', (done) => {
            (async () => {
                try{
                    let r = await async_test();
                    assert.strictEqual(r, 15);
                    done();
                }catch(err){
                    done(err);
                }
            })();
        });

        // 2.使用async和await测试异步(更简单)；
        it('#async await function', async () => {
            let r = await async_test();
            assert.strictEqual(r, 15);
        });


        
    })
});

