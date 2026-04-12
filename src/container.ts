import { Config } from './config.js';
import { createDatabase } from './database/db.js';
import { HealthzRouter } from './modules/healthz/healthz.router.js';

export async function container(config: Config) {
  const db = createDatabase(config);
  const healthzRouter = new HealthzRouter();

  return { db, healthzRouter };
}
