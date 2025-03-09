
import { Request, Response, NextFunction } from 'express';
import agenda from '../models/calendari';


export const getAgenda = async (req: Request, res: Response) => {
    const listAgendaEvents = await agenda.findAll()
    res.json( listAgendaEvents );
    
  };


