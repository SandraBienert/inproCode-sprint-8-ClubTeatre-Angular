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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarEvent = exports.crearEvent = exports.getAgenda = void 0;
const calendari_1 = __importDefault(require("../models/calendari"));
const getAgenda = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listAgendaEvents = yield calendari_1.default.findAll();
    res.json(listAgendaEvents);
});
exports.getAgenda = getAgenda;
const crearEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titol, lloc, data } = req.body;
    try {
        const nouEvent = yield calendari_1.default.create({
            titol_event: titol,
            lloc_event: lloc,
            data_event: data,
        });
        res.json(nouEvent);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.crearEvent = crearEvent;
const eliminarEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Endpoint: Eliminar event
    try {
        yield calendari_1.default.destroy({ where: { id: req.params.id } });
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.eliminarEvent = eliminarEvent;
