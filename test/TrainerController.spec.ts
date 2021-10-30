import { describe, it, before } from 'mocha';
import { expect } from 'chai';

import request from 'supertest';

import Server from '@/Server';
import { createTrainer } from '@/data/TrainerRepository';

describe('Trainer Controller', () => {
  describe('POST /api/v1/trainer/create', () => {
    it('should respond with 201', (done) => {
      request(Server)
        .post('/api/v1/trainer/create')
        .send({ name: 'Ash' })
        .expect(201, done);
    });
  });

  describe('GET /api/v1/trainer/:id', () => {
    it('responds with a JSON containing a Trainer object', (done) => {
      request(Server)
        .get('/api/v1/trainer/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          id: 1,
          name: 'Ash',
        }, done);
    });
  });

  describe('GET /api/v1/trainer', () => {
    before(async () => {
      await createTrainer('Red');
    });

    it('responds with a JSON message', (done) => {
      request(Server)
        .get('/api/v1/trainer')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((response) => {
          const responseData = JSON.parse(response.text);
          expect(responseData).to.be.an('array').and.have.lengthOf(2);
          // @ts-ignore
          expect(responseData).to.all.have.property('name');
        })
        .end(done);
    });

    it('responds with a JSON message of only 1 trainer', (done) => {
      request(Server)
        .get('/api/v1/trainer?itemsPerPage=1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((response) => {
          const responseData = JSON.parse(response.text);
          expect(responseData).to.be.an('array').and.have.lengthOf(1);
        })
        .end(done);
    });
  });

  describe('POST /api/v1/trainer/catch', () => {
    it('should respond with 201', (done) => {
      request(Server)
        .post('/api/v1/trainer/catch')
        .send({ trainer: 1, pokemon: 1 })
        .expect(201, done);
    });
  });

  describe('GET /api/v1/trainer/:id/pokemons', () => {
    it('should respond with a JSON containing a Pokemon object array', (done) => {
      request(Server)
        .get('/api/v1/trainer/1/pokemons')
        .expect(200)
        .expect((response) => {
          const responseData = JSON.parse(response.text);
          expect(responseData).to.be.an('array').and.have.lengthOf(1);
          // @ts-ignore
          expect(responseData).to.all.have.property('nationalDexNumber');
        })
        .end(done);
    });
  });
});
