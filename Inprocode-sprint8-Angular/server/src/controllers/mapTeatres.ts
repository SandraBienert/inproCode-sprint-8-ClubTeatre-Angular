import { Request, Response } from 'express';
import mapaTeatres from '../models/mapaTeatres';

export const getMapTeatres = async (req: Request, res: Response) => {

    const listMapTeatres = await mapaTeatres.findAll()
    res.json( listMapTeatres );

  };
