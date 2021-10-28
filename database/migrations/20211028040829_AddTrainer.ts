import { Knex } from 'knex';

const tableName = 'trainers';

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable(tableName);

  if (!hasTable) {
    return knex.schema.createTable(tableName, (trainer) => {
      trainer.increments();
      trainer.string('name').notNullable();
      trainer.timestamps();
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(tableName);
}
