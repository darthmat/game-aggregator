import { Kysely } from 'kysely';
import { createKyselyDialect } from './dialect.js';
import { Config } from '@/config.js';

export function createDatabase(config: Config): Kysely<unknown> {
  return new Kysely<unknown>({
    dialect: createKyselyDialect(config),
    log: ['query', 'error'],
  });
}

export type Database = Kysely<unknown>;
