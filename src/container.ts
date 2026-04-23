import { Cache } from '@jeengbe/cache';
import EventEmitter from 'events';
import { FastifyBaseLogger } from 'fastify';
import { Config } from './config.js';
import { createDatabase } from './database/db.js';
import { DbConfig } from './dbConfig.js';
import { CachedItadApi } from './libs/itad-api/itad-api.cache.js';
import { ItadApiImplementation } from './libs/itad-api/itad-api.service.js';
import { CachedRawgApi } from './libs/rawg-api/rawg-api.cache.js';
import { RawgApiImplementation } from './libs/rawg-api/rawg-api.service.js';
import { GameEventPublisher } from './modules/games/games.publisher.js';
import { GamesRouter } from './modules/games/games.router.js';
import { GameServiceImpl } from './modules/games/games.service.js';
import { HealthzRouter } from './modules/healthz/healthz.router.js';
import { SearchHistoryRepositoryImplementation } from './modules/search-history/search-history.repository.js';
import { SearchHistoryRouter } from './modules/search-history/search-history.router.js';
import { SearchHistoryServiceImpl } from './modules/search-history/search-history.service.js';
import { createRedisCacheAdapter } from './utils/redis.js';

export async function container(
  config: Config,
  dbConfig: DbConfig,
  logger: FastifyBaseLogger,
) {
  const db = createDatabase(dbConfig);
  const appEvents = new EventEmitter();
  const { client: redis, cacheAdapter } = await createRedisCacheAdapter(config);

  const rawgApiService = new CachedRawgApi(
    new RawgApiImplementation(config.api.rawg.base, config.api.rawg.key),
    new Cache(cacheAdapter),
  );
  const itadApiService = new CachedItadApi(
    new ItadApiImplementation(config.api.itad.base, config.api.itad.key),
    new Cache(cacheAdapter),
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
    logger.child({ service: 'searchHistoryService' }),
  );

  searchHistoryService.registerListeners();

  const healthzRouter = new HealthzRouter();
  const gameRouter = new GamesRouter(gameService);
  const searchHistoryRouter = new SearchHistoryRouter(searchHistoryService);

  return { redis, db, healthzRouter, gameRouter, searchHistoryRouter };
}
