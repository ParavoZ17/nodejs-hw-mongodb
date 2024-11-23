import express from 'express';
import { contacts } from './db/contacts.js';
import cors from 'cors';
import pino from 'pino-http';

export function setupServer() {
  const app = express();
  app.use(cors());
  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });
//   app.use(logger);
  app.get('/', (request, response) => {
    response.send('<h1>Home Page</h1>');
  });

  app.get('/contacts', (request, response) => {
    response.json(contacts());
    // console.log(request.method);
    // console.log(request.url);
    // response.send('<h1>Contacts Page</h1>')
  });

  app.use((req,res)=>{
    res.status(404).json({
        message:`${req.url}  not found`
  })
  })
  app.listen(3000, () =>
    console.log('Web-server succsesfully ranning on  3000 port'),
  );
}
