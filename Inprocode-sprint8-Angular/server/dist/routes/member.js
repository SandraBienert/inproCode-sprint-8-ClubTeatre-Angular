"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const member_1 = require("../controllers/member");
const router = (0, express_1.Router)();
//ENDPOINTS
router.get('/', member_1.getMembers);
router.get('/:id', member_1.getMember);
router.delete('/:id', member_1.deleteMember);
router.post('/', member_1.postMember);
router.put('/:id', member_1.updateMember);
exports.default = router;
