import { Kysely } from 'kysely';
import { DbConfig } from '../dbConfig.js';
import { createKyselyDialect } from './dialect.js';
import { GameAggregatorDatabaseTables } from './types.js';

export function createDatabase(
  dbConfig: DbConfig,
): Kysely<GameAggregatorDatabaseTables> {
  return new Kysely<GameAggregatorDatabaseTables>({
    dialect: createKyselyDialect(dbConfig),
    log: ['error'],
  });
}
