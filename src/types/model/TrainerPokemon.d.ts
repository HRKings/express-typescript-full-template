import { Trainer } from '@/types/model/Trainer';
import { Pokemon } from '@/types/model/Pokemon';

export interface TrainerPokemon {
  id: number,
  trainer: Trainer,
  pokemon: Pokemon
}
