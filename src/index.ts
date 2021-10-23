import server from './Server.js';

const port = process.env.EXPRESS_PORT || 5000;

server.listen(port, () => {
  console.info(`The server is open and listening on 'http://localhost:${port}'`);
});
