import { Knex } from 'knex';

import { PokemonTable } from '@/utils/Constants';

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable(PokemonTable);

  if (!hasTable) {
    await knex.schema.createTable(PokemonTable, (table) => {
      table.increments();

      table.integer('national_pokedex_index').notNullable();
      table.string('name', 80).notNullable();

      table.timestamp('created_at', { useTz: false }).defaultTo(knex.fn.now());
      table.timestamp('updated_at', { useTz: false }).defaultTo(knex.fn.now());
    });

    await knex.schema.raw(`CREATE OR REPLACE FUNCTION trigger_set_updated_at()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;`);

    await knex.schema.raw(`CREATE TRIGGER ${PokemonTable}_set_updated_at
  BEFORE UPDATE ON ${PokemonTable}
  FOR EACH ROW
  EXECUTE FUNCTION trigger_set_updated_at();`);
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(PokemonTable);

  await knex.schema.raw('DROP FUNCTION IF EXISTS trigger_set_updated_at();');
}
