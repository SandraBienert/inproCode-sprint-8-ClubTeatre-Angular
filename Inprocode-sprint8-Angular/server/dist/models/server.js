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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const member_1 = __importDefault(require("../routes/member"));
const connection_1 = __importDefault(require("../db/connection"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3004';
        this.midlewares();
        this.routes(); //inicialització dels métodes de rutes
        this.listen();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on http://localhost:${this.port}`);
        });
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.json({ msg: 'API working', });
        });
        this.app.use('/api/members', member_1.default);
        this.app.get('/api/map', (req, res) => {
            connection_1.default.query('SELECT nom, adreça, latitud, longitud FROM membres.teatres_bcn')
                .then((results) => {
                res.json(results); // ← Assegura't que results és un array
            })
                .catch((error) => {
                res.status(500).json({ error: 'Error en la consulta' });
            });
        });
        this.app.get('/api/full-calendar', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const [results] = yield connection_1.default.query(`
          SELECT id, titol_event AS titol, lloc_event AS lloc, data_event AS data 
          FROM membres.calendari_debuts
        `);
                res.json(results);
            }
            catch (error) {
                console.error('Error en la consulta:', error);
                res.status(500).json({ error: 'Error en la consulta', details: error });
            }
        }));
    }
    midlewares() {
        this.app.use(express_1.default.json()); //parseamos el body a json
        //cors: para permitir peticiones de otros dominios
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Database connected');
            }
            catch (error) {
                console.log('Error connecting to the database: ', error);
            }
        });
    }
}
exports.default = Server;
