"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const agenda = connection_1.default.define('calendari_debuts', {
    titol: { type: sequelize_1.DataTypes.STRING, field: 'titol_event' },
    lloc: { type: sequelize_1.DataTypes.STRING, field: 'lloc_event' },
    data: { type: sequelize_1.DataTypes.DATE, field: 'data_event' }
}, {
    tableName: 'calendari_debuts',
    timestamps: false,
});
exports.default = agenda;
