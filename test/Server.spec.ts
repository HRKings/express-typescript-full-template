import dotenv from 'dotenv';
import { describe, it, before } from 'mocha';
import request from 'supertest';

import ServerConfig from '../src/ServerConfig.js';

describe('Server', () => {
  let server: ServerConfig;

  before(() => {
    dotenv.config({ path: '.testing.env' });
    server = new ServerConfig();
  });

  describe('Not Found Handler', () => {
    it('should respond with a not found message', (done) => {
      request(server.expressInstance)
        .get('/this-does-not-exist')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404, done);
    });
  });

  describe('GET /', () => {
    it('should respond with a JSON message', (done) => {
      request(server.expressInstance)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          message: '👋🌎🌍🌏 - Hello World!',
        }, done);
    });
  });
});
