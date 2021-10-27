import dotenv from 'dotenv';

import ServerConfig from './ServerConfig.js';

dotenv.config();

const port = Number(process.env.EXPRESS_PORT) || 5000;

const server = new ServerConfig();

server.expressInstance.listen(port, () => {
  console.info(`The server is open and listening on 'http://localhost:${port}'`);
});
