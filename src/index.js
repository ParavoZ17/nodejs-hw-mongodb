import { startServer } from './server.js';
import { initMongoDB } from './db/initMongoDB.js';

const boostrap = async () => {
  initMongoDB();
  startServer();
};

boostrap();
