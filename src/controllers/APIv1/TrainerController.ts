import { Router } from 'express';

import { catchPokemon, createTrainer, getAllTrainers, getTrainerByID, getTrainerPokemons } from '@/services/TrainerService';

const router = Router();

/** GET: returns all trainers with support for pagination */
router.get('/', async (request, response) => {
  const { page, itemsPerPage } = request.query;

  const isSuccess = await getAllTrainers(Number(page) || 1, Number(itemsPerPage) || 10);

  // Returns 404 if no pokemon is on the database
  if (!isSuccess || isSuccess.length === 0) {
    return response.sendStatus(404);
  }

  return response.json(isSuccess);
});

/** GET: returns the specified trainer by ID */
router.get('/:id', async (request, response) => {
  const { id } = request.params;

  // Returns 400 if the ID isn't supplied
  if (!id) {
    return response.sendStatus(400);
  }

  const isSuccess = await getTrainerByID(Number(id));

  // Returns 404 if the trainer isn't on the database
  if (!isSuccess) {
    return response.sendStatus(404);
  }

  return response.json(isSuccess);
});

/** GET: creates a new trainer */
router.post('/create', async (request, response) => {
  const { name } = request.body;

  // Returns 400 if the trainer name isn't supplied
  if (!name) {
    return response.sendStatus(400);
  }

  const isSuccess = await createTrainer(name);

  // Returns 500 if could not create a pokemon
  if (!isSuccess) {
    return response.sendStatus(500);
  }

  return response.sendStatus(201);
});

/** POST: adds a pokemon to the trainer's collection */
router.post('/catch', async (request, response) => {
  const { trainer, pokemon } = request.body;

  // Returns 400 if any of the parameters in the body aren't supplied
  if (!trainer || !pokemon) {
    return response.sendStatus(400);
  }

  const isSuccess = await catchPokemon(Number(trainer), Number(pokemon));

  // Returns 500 if could not create an entry on the database
  if (!isSuccess) {
    return response.sendStatus(500);
  }

  return response.sendStatus(201);
});

/** GET: returns all pokemons in the trainer's collection */
router.get('/:id/pokemons', async (request, response) => {
  const { id } = request.params;

  // Returns 400 if the ID isn't supplied
  if (!id) {
    return response.sendStatus(400);
  }

  const isSuccess = await getTrainerPokemons(Number(id));

  // Return 404 if the trainer doesn't exists
  // or if have no pokemon on the trainer's collection
  if (!isSuccess || isSuccess.length === 0) {
    return response.sendStatus(404);
  }

  return response.json(isSuccess);
});

export default router;
