import { Cache } from '@jeengbe/cache';
import { ItadApi, ItadCompleteData } from './itad-api.interface.js';

export type ItadApiCacheTypes = Record<
  `itad-games-api:${string}`,
  ItadCompleteData | null
>;

export class CachedItadApi implements ItadApi {
  constructor(
    private readonly delegate: ItadApi,
    private readonly cache: Cache<ItadApiCacheTypes>,
  ) {}

  async getGame(title: string): Promise<ItadCompleteData | null> {
    return await this.cache.cached(
      `itad-games-api:${title}`,
      () => this.delegate.getGame(title),
      '1h',
    );
  }
}
