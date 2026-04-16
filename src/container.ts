import { Cache } from '@jeengbe/cache';
import EventEmitter from 'events';
import { Config } from './config.js';
import { createDatabase } from './database/db.js';
import { DbConfig } from './dbConfig.js';
import { CachedItadApi } from './libs/itad-api/itad-api.cache.js';
import { ItadApiImplementation } from './libs/itad-api/itad-api.service.js';
import { CachedRawgApi } from './libs/rawg-api/rawg-api.cache.js';
import { RawgApiImplementation } from './libs/rawg-api/rawg-api.service.js';
import { GamesRouter } from './modules/games/game.router.js';
import { GameServiceImpl } from './modules/games/game.service.js';
import { HealthzRouter } from './modules/healthz/healthz.router.js';
import { SearchHistoryRepositoryImplementation } from './modules/search-history/search-history.repository.js';
import { createRedisCacheAdapter } from './utils/redis.js';
import { SearchHistoryServiceImpl } from './modules/search-history/search-history.service.js';
import { SearchHistoryRouter } from './modules/search-history/search-history.router.js';
import { GameEventPublisher } from './modules/games/game.publisher.js';

export async function container(config: Config, dbConfig: DbConfig) {
  const db = createDatabase(dbConfig);
  const appEvents = new EventEmitter();

  const rawgApiService = new CachedRawgApi(
    new RawgApiImplementation(config.api.rawg.base, config.api.rawg.key),
    new Cache(await createRedisCacheAdapter(config)),
  );
  const itadApiService = new CachedItadApi(
    new ItadApiImplementation(config.api.itad.base, config.api.itad.key),
    new Cache(await createRedisCacheAdapter(config)),
  );
  const gameEventPublisher = new GameEventPublisher(appEvents);

  const historyRepo = new SearchHistoryRepositoryImplementation(db);
  const gameService = new GameServiceImpl(
    rawgApiService,
    itadApiService,
    gameEventPublisher,
  );
  const searchHistoryService = new SearchHistoryServiceImpl(
    historyRepo,
    appEvents,
  );

  searchHistoryService.registerListeners();

  const healthzRouter = new HealthzRouter();
  const gameRouter = new GamesRouter(gameService);
  const searchHistoryRouter = new SearchHistoryRouter(searchHistoryService);

  return { db, healthzRouter, gameRouter, searchHistoryRouter };
}
