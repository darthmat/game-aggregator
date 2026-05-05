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
 * Spins up a MySQL container
 */
export function withDatabase() {
  let postgresContainer: StartedPostgreSqlContainer;
  let db: Database;
  let invalidDb: Database;

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer('postgres:latest')
      .withDatabase('name_should_not_matter')
      .withTmpFs({ '/var/lib/postgresql/data': 'rw' })
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

    await runMigrations(db);
  });

  afterAll(async () => {
    await db.destroy();
    await invalidDb.destroy();
    await postgresContainer.stop();
  });

  afterEach(async () => {
    await sql`DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO public;`.execute(
      db,
    );

    await runMigrations(db);
  });

  return {
    getDb: () => db,
    getInvalidDb: () => invalidDb,
  };
}

async function runMigrations(db: Database): Promise<void> {
  const migrator = new Migrator({
    db,
    provider: new GameAggregatorMigrationProvider(),
  });

  const result = await migrator.migrateToLatest();

  if (result.error) {
    assert(result.error instanceof Error);
    throw result.error;
  }
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
