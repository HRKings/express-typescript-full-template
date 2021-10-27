import dotenv from 'dotenv';

import ServerConfig from './ServerConfig.js';

dotenv.config();

const server = new ServerConfig();

server.expressInstance.listen(server.options.Port, () => {
  console.info(`The server is open and listening on 'http://localhost:${server.options.Port}'`);
});
