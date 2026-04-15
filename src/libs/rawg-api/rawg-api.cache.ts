import { Cache } from '@jeengbe/cache';
import {
  RawgApi,
  RawgGameInfoRawResponse,
  SearchRawgGameInfoResponse,
} from './rawg-api.interface.js';

export type RawgApiCacheTypes = Record<
  `rawg-games-api:${string}`,
  RawgGameInfoRawResponse | null
> &
  Record<`rawg-games-api-search:${string}`, SearchRawgGameInfoResponse>;

export class CachedRawgApi implements RawgApi {
  constructor(
    private readonly delegate: RawgApi,
    private readonly cache: Cache<RawgApiCacheTypes>,
  ) {}

  async getGame(title: string): Promise<RawgGameInfoRawResponse | null> {
    return await this.cache.cached(
      `rawg-games-api:${title}`,
      () => this.delegate.getGame(title),
      '1w',
    );
  }

  async searchGames(title: string): Promise<SearchRawgGameInfoResponse> {
    return await this.cache.cached(
      `rawg-games-api-search:${title}`,
      () => this.delegate.searchGames(title),
      '1w',
    );
  }
}
