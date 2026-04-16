import { Cache } from '@jeengbe/cache';
import { ItadApi, ItadCompleteData } from './itad-api.interface.js';

export type ItadApiCacheTypes = Record<
  `itad-games-api:${string}:${string}`,
  ItadCompleteData | null
>;

export class CachedItadApi implements ItadApi {
  constructor(
    private readonly delegate: ItadApi,
    private readonly cache: Cache<ItadApiCacheTypes>,
  ) {}

  async getGame(
    title: string,
    country = 'US',
  ): Promise<ItadCompleteData | null> {
    return await this.cache.cached(
      `itad-games-api:${title}:${country}`,
      () => this.delegate.getGame(title),
      '1h',
    );
  }
}
