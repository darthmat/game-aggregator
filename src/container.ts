import { Cache } from '@jeengbe/cache';
import { Config } from './config.js';
import { createDatabase } from './database/db.js';
import { DbConfig } from './dbConfig.js';
import { ItadApiImplementation } from './libs/itad-api/itad-api.service.js';
import { CachedRawgApi } from './libs/rawg-api/rawg-api.cache.js';
import { RawgApiImplementation } from './libs/rawg-api/rawg-api.service.js';
import { GamesRouter } from './modules/games/game.router.js';
import { GameServiceImpl } from './modules/games/game.service.js';
import { HealthzRouter } from './modules/healthz/healthz.router.js';
import { createRedisCacheAdapter } from './utils/redis.js';

export async function container(config: Config, dbConfig: DbConfig) {
  const db = createDatabase(dbConfig);

  const rawgApiService = new CachedRawgApi(
    new RawgApiImplementation(config.api.rawg.base, config.api.rawg.key),
    new Cache(await createRedisCacheAdapter(config)),
  );
  const itadApiService = new ItadApiImplementation(
    config.api.itad.base,
    config.api.itad.key,
  );

  const gameService = new GameServiceImpl(rawgApiService, itadApiService);

  const healthzRouter = new HealthzRouter();
  const gameRouter = new GamesRouter(gameService);

  return { db, healthzRouter, gameRouter };
}
