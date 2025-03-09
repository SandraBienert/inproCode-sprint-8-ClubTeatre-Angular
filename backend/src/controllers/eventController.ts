import { Event } from '../models/eventsModel';
import { Request, Response, NextFunction } from 'express';


export const addEvent = async (req: Request, res: Response): Promise<void> => {
    try {
      const { titol_event, lloc_event, data_event } = req.body;
      const newEvent = await Event.create({ titol_event, lloc_event, data_event });
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  // Eliminar un esdeveniment
 export const  deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await Event.destroy({ where: { id } });
      res.status(204).send(); // 204: No Content
    } catch (error) {
      next(error); // Manejo de errores
}
  };


