import { Config } from '@/config.js';
import { PostgresDialect } from 'kysely';
import { Pool } from 'pg';

export function createKyselyDialect(config: Config): PostgresDialect {
  return new PostgresDialect({
    pool: new Pool({
      host: config.db.host,
      database: config.db.database,
      user: config.db.user,
      password: config.db.password,
      port: config.db.port,
      max: 10,
    }),
  });
}
