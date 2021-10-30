import { Knex } from 'knex';

import { TrainerTable } from '@/utils/Constants';

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable(TrainerTable);

  if (!hasTable) {
    await knex.schema.createTable(TrainerTable, (table) => {
      table.increments();

      table.string('name').notNullable();

      table.timestamp('created_at', { useTz: false }).defaultTo(knex.fn.now());
      table.timestamp('updated_at', { useTz: false }).defaultTo(knex.fn.now());
    });

    await knex.schema.raw(`CREATE TRIGGER ${TrainerTable}_set_updated_at
    BEFORE UPDATE ON ${TrainerTable}
    FOR EACH ROW
    EXECUTE FUNCTION trigger_set_updated_at();`);
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TrainerTable);
}
