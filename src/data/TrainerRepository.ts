import { knexConnection } from '@/services/DatabaseService';

import { PokemonTable, TrainerPokemonTable, TrainerTable } from '@/utils/Constants';

import { Pokemon } from '@/types/model/Pokemon.js';
import { Trainer } from '@/types/model/Trainer.js';
import { TrainerPokemon } from '@/types/model/TrainerPokemon.js';

export async function getAllTrainers(page: number = 1, itemsPerPage: number = 10): Promise<Trainer[]|undefined> {
  return knexConnection().select<Trainer[]>().from(TrainerTable)
    .limit(itemsPerPage)
    .offset((page - 1) * itemsPerPage);
}

export async function getTrainerByID(id: number): Promise<Trainer|undefined> {
  return knexConnection().select<Trainer>('id', 'name').from(TrainerTable)
    .where('id', id)
    .first();
}

export async function createTrainer(name: string): Promise<Trainer|undefined> {
  return knexConnection().insert<Trainer>({ name })
    .into(TrainerTable);
}

export async function catchPokemon(trainer: number, pokemon: number): Promise<TrainerPokemon|undefined> {
  return knexConnection().insert<TrainerPokemon>({ trainer_id: trainer, pokemon_id: pokemon }).into(TrainerPokemonTable);
}

export async function getTrainerPokemons(id: number): Promise<Pokemon[]> {
  return knexConnection().select<Pokemon[]>(`${PokemonTable}.name`, `${PokemonTable}.national_pokedex_index AS nationalDexNumber`)
    .from(TrainerPokemonTable).innerJoin(PokemonTable, `${PokemonTable}.id`, `${TrainerPokemonTable}.pokemon_id`)
    .where(`${TrainerPokemonTable}.trainer_id`, id);
}
