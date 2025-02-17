"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Member = connection_1.default.define('membres', {
    nom: {
        type: sequelize_1.DataTypes.STRING,
    },
    cognom: {
        type: sequelize_1.DataTypes.STRING,
    },
    rol: {
        type: sequelize_1.DataTypes.STRING,
    },
    payroll: {
        type: sequelize_1.DataTypes.NUMBER,
    },
}, {
    createdAt: false,
    updatedAt: false
});
exports.default = Member;
