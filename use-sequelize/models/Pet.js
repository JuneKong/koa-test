"use strict";

const db = require('../db');

const Pet = db.defineModel('pets', {
    id:db.ID,
    name: db.STRING(100),
    gender: db.BOOLEAN,
    birth: db.STRING(10),
    createdAt: db.BIGINT,
    updatedAt: db.BIGINT,
    version: db.BIGINT
});

module.exports = Pet;