import { Cache } from '@jeengbe/cache';
import { IItadApi, ItadCompleteData } from './itad-api.interface.js';

export type ItadApiCacheTypes = Record<
  `itad-games-api:${string}:${string}`,
  ItadCompleteData | null
>;

export class CachedItadApi implements IItadApi {
  constructor(
    private readonly delegate: IItadApi,
    private readonly cache: Cache<ItadApiCacheTypes>,
  ) {}

  async getGameDeals(
    title: string,
    country = 'US',
  ): Promise<ItadCompleteData | null> {
    const cacheTitle = title.trim().toLowerCase();
    const cacheCountry = country.trim().toUpperCase();

    return await this.cache.cached(
      `itad-games-api:${cacheTitle}:${cacheCountry}`,
      () => this.delegate.getGameDeals(title),
      '1h',
    );
  }
}
