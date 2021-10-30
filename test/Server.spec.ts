import { describe, it } from 'mocha';
import request from 'supertest';

import Server from '@/Server';

describe('Server', () => {
  describe('Not Found Handler', () => {
    it('should respond with a not found message', (done) => {
      request(Server)
        .get('/this-does-not-exist')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404, done);
    });
  });

  describe('GET / ', () => {
    it('should respond with a JSON message', (done) => {
      request(Server)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          message: '👋🌎🌍🌏 - Hello World!',
        }, done);
    });
  });
});
