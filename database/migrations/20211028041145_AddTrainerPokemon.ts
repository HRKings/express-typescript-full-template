import { Knex } from 'knex';

const tableName = 'trainer_pokemons';
const pokemonTableName = 'pokemons';
const trainerTableName = 'trainers';

export async function up(knex: Knex): Promise<void> {
  const hasParentTables = (await knex.schema.hasTable(pokemonTableName)) && (await knex.schema.hasTable(trainerTableName));
  const hasTable = await knex.schema.hasTable(tableName);

  if (hasParentTables && !hasTable) {
    return knex.schema.createTable(tableName, (table) => {
      table.increments();
      table.integer('trainer_id').notNullable();
      table.integer('pokemon_id').notNullable();

      table.foreign('trainer_id').references(`${trainerTableName}.id`);
      table.foreign('pokemon_id').references(`${pokemonTableName}.id`);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(tableName);
}
