import { Migration, sql } from 'kysely';

/**
 * Initial migration for settings up the database.
 */
export const initialMigration: Migration = {
  async up(db) {
    await db.schema
      .createTable('search_history')
      .addColumn('id', 'serial', (col) => col.primaryKey())
      .addColumn('query', 'varchar', (col) => col.notNull())
      .addColumn('created_at', 'timestamp', (col) =>
        col.defaultTo(sql`now()`).notNull(),
      )
      .execute();

    await db.schema
      .createIndex('search_history_query_idx')
      .on('search_history')
      .column('query')
      .execute();
  },
  async down(db) {
    await db.schema.dropTable('search_history').execute();
  },
};
