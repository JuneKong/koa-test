"use strict";

const model = require('./model');

let Pet = model.Pet,
    User = model.User;

var now = Date.now();

(async () => {
    let user = await User.create({
        name: 'June',
        email: 'exmaple@root.com',
        passwd: 123456,
        gender: false
    });
    console.log("created: " + JSON.stringify(user));

    var dog = await Pet.create({
        id: 'g-' + now,
        name: 'Dog',
        gender: false,
        birth: '2003-03-03',
        createdAt: now,
        updatedAt: now,
        version: 0
    });

    console.log("created: " + JSON.stringify(dog));

})();