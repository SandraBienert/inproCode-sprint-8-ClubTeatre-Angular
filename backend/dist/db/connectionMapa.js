"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const map = new sequelize_1.Sequelize('membres', 'root', '822025Clave%', {
    host: 'localhost',
    dialect: 'mysql',
});
exports.default = map;
