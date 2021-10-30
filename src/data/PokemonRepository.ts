import { PokemonTable } from '@/utils/Constants';

import { knexConnection } from '@/services/DatabaseService';

import { Pokemon } from '@/types/model/Pokemon';

export async function getAllPokemons(page: number = 1, itemsPerPage: number = 10): Promise<Pokemon[]|undefined> {
  return knexConnection().select<Pokemon[]>().from(PokemonTable)
    .limit(itemsPerPage)
    .offset((page - 1) * itemsPerPage);
}

export async function getPokemonByID(id: number): Promise<Pokemon|undefined> {
  return knexConnection().select<Pokemon>('id', 'name', 'national_pokedex_index AS nationalDexNumber')
    .from(PokemonTable).where('id', id)
    .first();
}

export async function createPokemon(name: string, nationalDex: number): Promise<Pokemon|undefined> {
  return knexConnection().insert<Pokemon>({ name, national_pokedex_index: nationalDex }).into(PokemonTable);
}
