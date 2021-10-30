import { knexConnection } from '@/services/DatabaseService';

import { PokemonTable, TrainerPokemonTable, TrainerTable } from '@/utils/Constants';

import { Pokemon } from '@/types/model/Pokemon.js';
import { Trainer } from '@/types/model/Trainer.js';
import { TrainerPokemon } from '@/types/model/TrainerPokemon.js';

/** Gets all trainers with pagination */
export async function getAllTrainers(page: number = 1, itemsPerPage: number = 10): Promise<Trainer[]|undefined> {
  return knexConnection().select<Trainer[]>().from(TrainerTable)
    .limit(itemsPerPage)
    .offset((page - 1) * itemsPerPage);
}

/** Gets a trainer by their ID */
export async function getTrainerByID(id: number): Promise<Trainer|undefined> {
  return knexConnection().select<Trainer>('id', 'name').from(TrainerTable)
    .where('id', id)
    .first();
}

/** Creates a new trainer on the database */
export async function createTrainer(name: string): Promise<Trainer|undefined> {
  return knexConnection().insert<Trainer>({ name })
    .into(TrainerTable);
}

/** Creates an entry on the trainer_pokemons table, representing a pokemon on the trainer's collection
 * @param trainer the trainer's ID
 * @param pokemon the pokemon's ID
*/
export async function catchPokemon(trainer: number, pokemon: number): Promise<TrainerPokemon|undefined> {
  return knexConnection().insert<TrainerPokemon>({ trainer_id: trainer, pokemon_id: pokemon }).into(TrainerPokemonTable);
}

/** Gets all pokemons on the trainer's collection */
export async function getTrainerPokemons(id: number): Promise<Pokemon[]> {
  return knexConnection().select<Pokemon[]>(`${PokemonTable}.name`, `${PokemonTable}.national_pokedex_index AS nationalDexNumber`)
    .from(TrainerPokemonTable).innerJoin(PokemonTable, `${PokemonTable}.id`, `${TrainerPokemonTable}.pokemon_id`)
    .where(`${TrainerPokemonTable}.trainer_id`, id);
}
