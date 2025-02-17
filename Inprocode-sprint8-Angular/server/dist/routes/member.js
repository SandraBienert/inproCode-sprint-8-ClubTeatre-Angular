"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const member_1 = require("../controllers/member");
const mapTeatres_1 = require("../controllers/mapTeatres");
const calendari_1 = require("../controllers/calendari");
const router = (0, express_1.Router)();
//ENDPOINTS
router.get('/', member_1.getMembers);
router.get('/:id', member_1.getMember);
router.post('/', member_1.postMember);
router.put('/:id', member_1.updateMember);
router.delete('/:id', (req, res, next) => {
    (0, member_1.deleteMember)(req, res, next).catch(next); // 👈 Manejo explícito de errores
});
router.get('api/map', mapTeatres_1.getMapTeatres);
router.get('api/full-calendar', calendari_1.getAgenda);
exports.default = router;
