import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import contactsRouter from './routers/routers.js';
import { notFoundHandler} from './middelewares/notFoundHandler.js';
import { errorHandler } from './middelewares/errorHandler.js';


const PORT = Number(env('PORT', '3000'));

export function startServer() {
  const app = express();
  

  app.use(cors());
  app.use(express.json())

  // const logger = pino({
  //   transport: {
  //     target: 'pino-pretty',
  //   },
  // });
  // app.use(logger);

  app.use('/contacts', contactsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);
  app.listen(PORT, () =>
    console.log(`Web-server succsesfully running on ${PORT}  port`),
  );
}
