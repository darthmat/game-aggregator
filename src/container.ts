import { config } from './config.js';
import { createDatabase } from './database/db.js';

export async function container() {
  const db = createDatabase(config); 

  return { db };
}