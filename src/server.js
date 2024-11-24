import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';


const PORT = Number(env('PORT', '3000'));


export function startServer() {

  const app = express();

  app.use(cors());

  // const logger = pino({
  //   transport: {
  //     target: 'pino-pretty',
  //   },
  // });
  //   app.use(logger);

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });
  
  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({
        message: 'Contact not found',
      });
      return;
    }
    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}`,
        data: contact,
      });
    });

  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url}  not found`,
    });
  });
  app.use((error, req, res, next) => {
    res.status(500).json({
      message: error.message,
    });
  });
  app.listen(PORT, () =>
    console.log(`Web-server succsesfully running on ${PORT}  port`),
  );
}
