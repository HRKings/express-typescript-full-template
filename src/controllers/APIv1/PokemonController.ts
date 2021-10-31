import { Router } from 'express';

import { createPokemon, getAllPokemons, getPokemonByID } from '@/services/PokemonService';

const router = Router();

/** GET: returns all pokemons with support for pagination */
router.get('/', async (request, response) => {
  const { page, itemsPerPage } = request.query;

  const isSuccess = await getAllPokemons(Number(page) || 1, Number(itemsPerPage) || 10);

  // Returns 404 if no pokemon is on the database
  if (!isSuccess || isSuccess.length === 0) {
    return response.sendStatus(404);
  }

  return response.json(isSuccess);
});

/** POST: creates a new pokemon */
router.post('/create', async (request, response) => {
  const { name, nationalDexNumber } = request.body;

  // Returns 400 if any of the parameters in the body aren't supplied
  if (!name || !nationalDexNumber) {
    return response.sendStatus(400);
  }

  const isSuccess = await createPokemon(name, Number(nationalDexNumber));

  // Returns 500 if could not create a pokemon
  if (!isSuccess) {
    return response.sendStatus(500);
  }

  return response.sendStatus(201);
});

/** GET: returns the specified pokemon by ID */
router.get('/:id', async (request, response) => {
  const { id } = request.params;

  // Returns 400 if the ID isn't supplied
  if (!id) {
    return response.sendStatus(400);
  }

  const pokemon = await getPokemonByID(Number(id));

  // Returns 404 if the pokemon isn't on the database
  if (!pokemon) {
    return response.sendStatus(404);
  }

  return response.json(pokemon);
});

export default router;
