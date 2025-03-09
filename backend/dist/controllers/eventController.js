"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.addEvent = void 0;
const eventsModel_1 = require("../models/eventsModel");
const addEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { titol_event, lloc_event, data_event } = req.body;
        const newEvent = yield eventsModel_1.Event.create({ titol_event, lloc_event, data_event });
        res.status(201).json(newEvent);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.addEvent = addEvent;
// Eliminar un esdeveniment
const deleteEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield eventsModel_1.Event.destroy({ where: { id } });
        res.status(204).send(); // 204: No Content
    }
    catch (error) {
        next(error); // Manejo de errores
    }
});
exports.deleteEvent = deleteEvent;
