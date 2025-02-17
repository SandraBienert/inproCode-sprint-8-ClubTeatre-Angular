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
exports.updateMember = exports.postMember = exports.deleteMember = exports.getMember = exports.getMembers = void 0;
const member_1 = __importDefault(require("../models/member"));
const getMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listMembers = yield member_1.default.findAll();
    res.json(listMembers);
});
exports.getMembers = getMembers;
const getMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const member = yield member_1.default.findByPk(id);
    if (member) {
        res.json(member);
    }
    else {
        res.status(404).json({
            msg: `No existeix cap membre amb identificador: ${id}`,
        });
    }
});
exports.getMember = getMember;
const deleteMember = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const member = yield member_1.default.findByPk(id);
        if (!member) {
            return res.status(404).json({
                msg: `No existeix cap membre amb identificador: ${id}`,
            });
        }
        else {
            yield member.destroy();
            res.json({
                msg: `El membre amb identificador: ${id} ha estat eliminat correctament`,
            });
        }
    }
    catch (error) {
        next(error); // Manejo de errores
    }
});
exports.deleteMember = deleteMember;
const postMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nom, cognom, rol, payroll } = req.body;
    console.log('Datos recibidos para crear el miembro:', req.body); // Afegeix aquest log
    try {
        const member = yield member_1.default.create({
            nom,
            cognom,
            rol,
            payroll,
        });
        res.json({
            msg: 'Membre creat correctament',
        });
    }
    catch (error) {
        console.error('Error al crear el membre:', error); // Afegeix aquest log també
        res.status(500).json({
            msg: 'Error al crear el membre',
            error,
        });
    }
});
exports.postMember = postMember;
const updateMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const member = yield member_1.default.findByPk(id);
        if (member) {
            yield member.update(body);
            res.json({
                msg: 'Membre actualitzat correctament',
            });
        }
        else {
            res.status(404).json({
                msg: `No existeix cap membre amb identificador: ${id}`,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al actualitzar el membre',
            error,
        });
    }
});
exports.updateMember = updateMember;
