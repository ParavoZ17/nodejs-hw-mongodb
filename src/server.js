import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import contactsRouter from './routers/routers.js';
import { notFoundHandler } from './middelewares/notFoundHandler.js';
import { errorHandler } from './middelewares/errorHandler.js';
import authRouter from './routers/auth.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/constants.js';
import { swaggerDocs } from './middelewares/swaggerDocs.js';

const PORT = Number(env('PORT', '3000'));
  
export function startServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(cookieParser());
  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });
  // app.use(logger);
//   app.get('/', (req, res) => {
//     res.json({
//         message: 'Welcome to my API! Navigate to /api-docs for documentation.',
//     });
// });

  app.use('/auth', authRouter);

  app.use('/contacts', contactsRouter);
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  app.use(notFoundHandler);
  app.use(errorHandler);
  app.listen(PORT, () =>
    console.log(`Web-server succsesfully running on ${PORT}  port`),
  );
}
