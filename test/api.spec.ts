import request from 'supertest';

import server from '../src/Server.js';

describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(server)
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
    request(server)
      .get('/api/v1/emojis')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, ['🐹', '⚡', '🔌'], done);
  });
});
