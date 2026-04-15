import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import assert from 'assert';
import { Migrator, sql } from 'kysely';
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vitest,
} from 'vitest';
import { createDatabase } from './db.js';
import { Database } from './types.js';
import { GameAggregatorMigrationProvider } from './migrations/index.js';

/**
 * Spins up a MySQL container and runs the provided callback with a fresh database
 * in `beforeEach` and destroys the connection in `afterEach`.
 */
export function withDatabase(
  cb: (db: Database, invalidDb: Database) => void | Promise<void>,
): void {
  vitest.setConfig({ testTimeout: 60000, hookTimeout: 60000 });

  let postgresContainer: StartedPostgreSqlContainer;
  let db: Database;
  let invalidDb: Database;

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer('postgres:latest')
      .withDatabase('name_should_not_matter')
      .withTmpFs({
        '/var/lib/postgresql/data': 'rw',
      })
      .start();

    db = createDatabase({
      host: postgresContainer.getHost(),
      port: postgresContainer.getPort(),
      user: postgresContainer.getUsername(),
      password: postgresContainer.getPassword(),
      database: postgresContainer.getDatabase(),
    });

    invalidDb = createDatabase({
      host: postgresContainer.getHost(),
      port: postgresContainer.getPort(),
      user: postgresContainer.getUsername(),
      password: 'empty',
      database: postgresContainer.getDatabase(),
    });
  });

  afterAll(async () => {
    await db.destroy();
    await postgresContainer.stop();
  });

  beforeEach(async () => {
    const migrator = new Migrator({
      db,
      provider: new GameAggregatorMigrationProvider(),
    });

    const result = await migrator.migrateToLatest();
    if (result.error) {
      assert(result.error instanceof Error);
      throw result.error;
    }

    await cb(db, invalidDb);
  });

  afterEach(async () => {
    await sql`DROP SCHEMA public CASCADE; CREATE SCHEMA public;`.execute(db);
  });
}

export function itWrapsErrors(
  fn: () => Promise<unknown>,
  message: string,
): void {
  describe.skip('should wrap errors', () => {
    it('should throw an error', async () => {
      await expect(fn()).rejects.toThrow(message);
    });

    it('should attach cause to the error', async () => {
      try {
        await fn();
        expect(false).toBe(true);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        assert(error instanceof Error);

        expect(error.cause).toBeDefined();
      }
    });
  });
}
