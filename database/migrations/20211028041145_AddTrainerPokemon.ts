import { Knex } from 'knex';

import { PokemonTable, TrainerPokemonTable, TrainerTable } from '@/utils/Constants';

export async function up(knex: Knex): Promise<void> {
  const hasParentTables = (await knex.schema.hasTable(PokemonTable)) && (await knex.schema.hasTable(TrainerTable));
  const hasTable = await knex.schema.hasTable(TrainerPokemonTable);

  if (hasParentTables && !hasTable) {
    await knex.schema.createTable(TrainerPokemonTable, (table) => {
      table.increments();
      table.integer('trainer_id').notNullable();
      table.integer('pokemon_id').notNullable();

      table.foreign('trainer_id').references(`${TrainerTable}.id`);
      table.foreign('pokemon_id').references(`${PokemonTable}.id`);

      table.timestamp('created_at', { useTz: false }).defaultTo(knex.fn.now());
      table.timestamp('updated_at', { useTz: false }).defaultTo(knex.fn.now());
    });

    await knex.schema.raw(`CREATE TRIGGER ${TrainerPokemonTable}_set_updated_at
    BEFORE UPDATE ON ${TrainerPokemonTable}
    FOR EACH ROW
    EXECUTE FUNCTION trigger_set_updated_at();`);
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TrainerPokemonTable);
}
