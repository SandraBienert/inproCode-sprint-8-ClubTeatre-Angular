import { Router } from 'express';
import { getMembers, getMember, deleteMember, postMember, updateMember } from '../controllers/member';
import { getMapTeatres } from '../controllers/mapTeatres';
import { getAgenda } from '../controllers/calendari';

const router = Router();

//ENDPOINTS
router.get('/', getMembers);
router.get('/:id', getMember);
router.post('/', postMember);
router.put('/:id', updateMember);
router.delete('/:id', (req, res, next) => {
  deleteMember(req, res, next).catch(next); // 👈 Manejo explícito de errores
});

router.get('api/map', getMapTeatres);
router.get('api/full-calendar', getAgenda);


export default router;  