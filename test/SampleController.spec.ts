import dotenv from 'dotenv';
import { describe, it, before } from 'mocha';
import request from 'supertest';

import ServerConfig from '../src/ServerConfig.js';

describe('Sample Controller', () => {
  let server: ServerConfig;

  before(() => {
    dotenv.config({ path: '.testing.env' });
    server = new ServerConfig();
  });

  describe('GET /api/v1', () => {
    it('responds with a json message', (done) => {
      request(server.expressInstance)
        .get('/api/v1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          message: '👋🌎🌍🌏 - Hello World from the API!',
        }, done);
    });
  });

  describe('GET /api/v1/emojis', () => {
    it('responds with a json message', (done) => {
      request(server.expressInstance)
        .get('/api/v1/emojis')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, ['🐹', '⚡', '🔌'], done);
    });
  });

  describe('POST /api/v1/name', () => {
    it('should respond with a JSON message containing the name', (done) => {
      request(server.expressInstance)
        .post('/api/v1/name')
        .send({ name: 'Test' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          name: 'Test',
        }, done);
    });
  });
});
