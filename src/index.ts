import Server from '@/Server';

const port = Number(process.env.EXPRESS_PORT) || 5000;

Server.listen(port, () => {
  console.info(`The server is open and listening on 'http://localhost:${port}'`);
});
