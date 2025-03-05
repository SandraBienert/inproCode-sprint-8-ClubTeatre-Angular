"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const mapaTeatres = connection_1.default.define('teatres_bcn', {
    nom: {
        type: sequelize_1.DataTypes.STRING
    },
    adreça: {
        type: sequelize_1.DataTypes.STRING
    },
    latitud: {
        type: sequelize_1.DataTypes.NUMBER
    },
    longitud: {
        type: sequelize_1.DataTypes.NUMBER
    },
}, {
    createdAt: false,
    updatedAt: false
});
exports.default = mapaTeatres;
