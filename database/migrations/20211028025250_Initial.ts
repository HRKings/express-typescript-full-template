import { Knex } from 'knex';

const tableName = 'pokemons';

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable(tableName);

  if (!hasTable) {
    return knex.schema.createTable(tableName, (table) => {
      table.increments();
      table.integer('national_pokedex_index').notNullable();
      table.string('name', 80).notNullable();
      table.timestamps();
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(tableName);
}
