import { PokemonTable } from '@/utils/Constants';

import { knexConnection } from '@/services/DatabaseService';

import { Pokemon } from '@/types/model/Pokemon';

/** Gets all pokemons with pagination */
export async function getAllPokemons(page: number = 1, itemsPerPage: number = 10): Promise<Pokemon[]|undefined> {
  return knexConnection().select<Pokemon[]>().from(PokemonTable)
    .limit(itemsPerPage)
    .offset((page - 1) * itemsPerPage);
}

/** Gets a pokemon by their ID */
export async function getPokemonByID(id: number): Promise<Pokemon|undefined> {
  return knexConnection().select<Pokemon>('id', 'name', 'national_pokedex_index AS nationalDexNumber')
    .from(PokemonTable).where('id', id)
    .first();
}

/** Creates a new pokemon on the database */
export async function createPokemon(name: string, nationalDex: number): Promise<Pokemon|undefined> {
  return knexConnection().insert<Pokemon>({ name, national_pokedex_index: nationalDex }).into(PokemonTable);
}
