import { Router } from 'express';

import { catchPokemon, createTrainer, getAllTrainers, getTrainerByID, getTrainerPokemons } from '@/data/TrainerRepository';

const router = Router();

router.get('/', async (request, response) => {
  const { page, itemsPerPage } = request.query;

  const isSuccess = await getAllTrainers(Number(page) || 1, Number(itemsPerPage) || 10);

  if (!isSuccess || isSuccess.length === 0) {
    return response.sendStatus(404);
  }

  return response.json(isSuccess);
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;

  if (!id) {
    return response.sendStatus(400);
  }

  const isSuccess = await getTrainerByID(Number(id));

  if (!isSuccess) {
    return response.sendStatus(404);
  }

  return response.json(isSuccess);
});

router.post('/create', async (request, response) => {
  const { name } = request.body;

  if (!name) {
    return response.sendStatus(400);
  }

  const isSuccess = await createTrainer(name);

  if (!isSuccess) {
    return response.sendStatus(500);
  }

  return response.sendStatus(201);
});

router.post('/catch', async (request, response) => {
  const { trainer, pokemon } = request.body;

  if (!trainer || !pokemon) {
    return response.sendStatus(400);
  }

  const isSuccess = await catchPokemon(Number(trainer), Number(pokemon));

  if (!isSuccess) {
    return response.sendStatus(500);
  }

  return response.sendStatus(201);
});

router.get('/:id/pokemons', async (request, response) => {
  const { id } = request.params;

  if (!id) {
    return response.sendStatus(400);
  }

  const isSuccess = await getTrainerPokemons(Number(id));

  if (!isSuccess || isSuccess.length === 0) {
    return response.sendStatus(404);
  }

  return response.json(isSuccess);
});

export default router;
