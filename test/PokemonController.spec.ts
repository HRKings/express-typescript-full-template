import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';

import Server from '@/Server';

import { createPokemon } from '@/services/PokemonService';

describe('Pokemon Controller', () => {
  describe('POST /api/v1/pokemon/create', () => {
    it('should respond with 201', (done) => {
      request(Server)
        .post('/api/v1/pokemon/create')
        .send({ name: 'Pikachu', nationalDexNumber: 25 })
        .expect(201, done);
    });
  });

  describe('GET /api/v1/pokemon/1', () => {
    it('responds with a JSON containing a Pokemon object', (done) => {
      request(Server)
        .get('/api/v1/pokemon/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          id: 1,
          name: 'Pikachu',
          nationalDexNumber: 25,
        }, done);
    });
  });

  describe('GET /api/v1/pokemon', () => {
    before(async () => {
      await createPokemon('Lucario', 498);
    });

    it('responds with a JSON message', (done) => {
      request(Server)
        .get('/api/v1/pokemon')
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

    it('responds with a JSON message of only 1 pokemon', (done) => {
      request(Server)
        .get('/api/v1/pokemon?itemsPerPage=1')
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
});
