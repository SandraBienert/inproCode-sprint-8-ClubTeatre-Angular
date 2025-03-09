import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routesMember from '../routes/member';
import db from '../db/connection'


class Server {
    private app : Application;
    private port: string;

    constructor() {
        this.app = express();
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
        this.app.get('/', (req: Request, res: Response) => { 
            res.json({ msg: 'API working',});
    });
    
        this.app.get('/api/map', (req: Request, res: Response) => {
           db.query('SELECT nom, adreça, latitud, longitud FROM membres.teatres_bcn')
            .then((results: any) => {
              res.json(results); // ← Assegura't que results és un array
        })
            .catch((error: any) => {
              res.status(500).json({ error: 'Error en la consulta' });
        });
})

      this.app.get('/api/full-calendar', async (req: Request, res: Response) => {
        try {
        const [results] = await db.query(`
          SELECT id, titol_event AS titol, lloc_event AS lloc, data_event AS data 
          FROM calendari_debuts
        `); 
          res.json(results);
            } catch (error) {
          console.error('Error en la consulta:', error);
          res.status(500).json({ error: 'Error en la consulta', details: error });
  }
});
  
      this.app.post('/api/full-calendar/events', async (req: Request, res: Response) => {
        const { titol, lloc, data } = req.body;
        try {
          await db.query(`
            INSERT INTO calendari_debuts (titol_event, lloc_event, data_event)
            VALUES (titol_event, lloc_event, data_event)`);
          res.status(201).json({ message: 'Event creat correctament' });
        } catch (error) {
          console.error('Error en la consulta:', error);
          res.status(500).json({ error: 'Error en la consulta', details: error });
        }
      });

      this.app.delete('/api/full-calendar/events/:id', async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
          await db.query(`
            DELETE FROM calendari_debuts WHERE id = ?`, { replacements: [id] });
          res.json({ message: 'Event Esborrat Correctament' });
        } catch (error) {
          console.error('Error en la consulta:', error);
          res.status(500).json({ error: 'Error en la consulta', details: error });
    }
  });
}
        midlewares() {
            this.app.use(express.json());//parseamos el body a json
            this.app.use(cors());
            this.app.use('api/full-calendar', (req: Request, res: Response) => { 
              res.json({ msg: 'API Event Working' });
            });
            this.app.use('api/full-calendar/events', (req: Request, res: Response) => { 
              res.json({ msg: 'API Event Working' });
            });
            this.app.use('api/full-calendar/events/:id', (req: Request, res: Response) => {
              res.json({ msg: 'API event working' });
            });
            this.app.use('api/map', (req: Request, res: Response) => {
              res.json({ msg: 'API working' });
            });
            this.app.use('/api/members', routesMember);
        } 


        async dbConnect(){

          try{
          await db.authenticate();
            console.log('Database connected');
          } catch (error) {
            console.log('Error connecting to the database: ', error);
          }
        }
}

export default Server;