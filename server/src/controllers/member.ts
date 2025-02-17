import { Request, Response,  NextFunction} from 'express';
import Member from '../models/member';


export const getMembers = async (req: Request, res: Response) => { //llista tots
   const listMembers = await Member.findAll();
    res.json(listMembers);
}

export const getMember = async (req: Request, res: Response) => { //un sol membre    
    const { id } = req.params;
    const member = await Member.findByPk(id);
    
    if(member){
        res.json(member);
    }else{
        res.status(404).json({
            msg: `No existeix cap membre amb identificador: ${id}`,
        });
    }
}

    export const deleteMember = async (
        req: Request,
        res: Response,
        next: NextFunction
    ):Promise<Response | void> => {
        const { id } = req.params;
            
        try {
            const member = await Member.findByPk(id);

            if(!member){
                return res.status(404).json({
                    msg: `No existeix cap membre amb identificador: ${id}`,
                });
            }else{
                await member.destroy();
                res.json({
                    msg: `El membre amb identificador: ${id} ha estat eliminat correctament`,
                });
            }

                } catch (error) {
                    next(error); // Manejo de errores
            }
    }

export const postMember = async (req: Request, res: Response) => { //crear un membre
    const { nom, cognom, rol, payroll } = req.body;
    console.log('Datos recibidos para crear el miembro:', req.body); // Afegeix aquest log
    try {
       const member = await Member.create({
        nom,
        cognom,
        rol,
        payroll,
       });
        res.json({
            msg: 'Membre creat correctament',

        });
    } catch (error) {
        console.error('Error al crear el membre:', error); // Afegeix aquest log també
        res.status(500).json({
            msg: 'Error al crear el membre',
            error,
        });
    }
}

 export const updateMember = async (req: Request, res: Response) => {  //Editar un membre o actualitzar
        const { body } = req;
        const { id } = req.params;

        try{
        const member = await Member.findByPk(id);
        if(member){
            await member.update(body);
            res.json({
                msg: 'Membre actualitzat correctament',
            });
        }else{
            res.status(404).json({
                msg: `No existeix cap membre amb identificador: ${id}`,
            });
        }} catch (error) {
            res.status(500).json({
                msg: 'Error al actualitzar el membre',
                error,
            });
}}