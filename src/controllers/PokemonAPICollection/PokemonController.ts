import { Router } from 'express';

import { createPokemon, getAllPokemons, getPokemonByID } from '@/data/PokemonRepository';

const router = Router();

router.get('/', async (request, response) => {
  const { page, itemsPerPage } = request.query;

  const isSuccess = await getAllPokemons(Number(page) || 1, Number(itemsPerPage) || 10);

  if (!isSuccess || isSuccess.length === 0) {
    return response.sendStatus(404);
  }

  return response.json(isSuccess);
});

router.post('/create', async (request, response) => {
  const { name, nationalDexNumber } = request.body;

  if (!name || !nationalDexNumber) {
    return response.sendStatus(400);
  }

  const isSuccess = await createPokemon(name, Number(nationalDexNumber));

  if (!isSuccess) {
    return response.sendStatus(500);
  }

  return response.sendStatus(201);
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;

  if (!id) {
    return response.sendStatus(400);
  }

  const pokemon = await getPokemonByID(Number(id));

  if (!pokemon) {
    return response.sendStatus(404);
  }

  return response.json(pokemon);
});

export default router;
