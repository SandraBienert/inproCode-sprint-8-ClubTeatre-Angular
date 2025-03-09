import { Router } from 'express';
import { getMembers, getMember, deleteMember, postMember, updateMember } from '../controllers/member';
import { getMapTeatres } from '../controllers/mapTeatres';
import { getAgenda } from '../controllers/calendari';
import { addEvent, deleteEvent } from '../controllers/eventController';

const router = Router();

//ENDPOINTS
//-----------MEMBRES
router.get('/', getMembers);
router.get('/:id', getMember);
router.post('/', postMember);
router.put('/:id', updateMember);
router.delete('/:id', (req, res, next) => {
  deleteMember(req, res, next).catch(next); // 👈 Manejo explícito de errores
});
//-----------MAPA
router.get('api/map', getMapTeatres);
//-----------
router.get('api/full-calendar', getAgenda);
router.post('api/full-calendar/events', addEvent); // Afegir un nou esdeveniment
router.delete('api/fullcalendar/events/:id', deleteEvent); // Eliminar un esdeveniment

// router.get('api/grafics', getGrafics);


export default router;  