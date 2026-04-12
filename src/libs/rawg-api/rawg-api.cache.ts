import { Cache } from '@jeengbe/cache';
import { GameSingle } from './generated/Api.js';
import { RawgApi } from './interface.js';

export type RawgApiCacheTypes = Record<`rawg-games-api:${string}`, GameSingle>;

export class CachedRawgApi implements RawgApi {
  constructor(
    private readonly delegate: RawgApi,
    private readonly cache: Cache<RawgApiCacheTypes>,
  ) {}

  async getGame(title: string): Promise<GameSingle> {
    return await this.cache.cached(
      `rawg-games-api:${title}`,
      () => this.delegate.getGame(title),
      '1w',
    );
  }
}
