import { Cache } from '@jeengbe/cache';
import {
  IRawgApi,
  RawgGameInfoRawResponse,
  RawgSearchGameInfoResponse,
  RawgSearchResponse,
} from './rawg-api.interface.js';

export type RawgApiCacheTypes = Record<
  `rawg-games-api:${string}`,
  RawgGameInfoRawResponse | null
> &
  Record<`rawg-games-api-search:${string}`, RawgSearchGameInfoResponse[]>;

export class CachedRawgApi implements IRawgApi {
  constructor(
    private readonly delegate: IRawgApi,
    private readonly cache: Cache<RawgApiCacheTypes>,
  ) {}

  async getGame(title: string): Promise<RawgGameInfoRawResponse | null> {
    const cacheTitle = title.trim().toLowerCase();

    return await this.cache.cached(
      `rawg-games-api:${cacheTitle}`,
      () => this.delegate.getGame(title),
      '1w',
    );
  }

  async *searchAllGames(
    title: string,
  ): AsyncGenerator<RawgSearchGameInfoResponse> {
    const cacheTitle = title.trim().toLowerCase();

    const pages = await this.cache.cached(
      `rawg-games-api-search:${cacheTitle}`,
      () => this.fetchAllPages(title),
      '1w',
    );

    yield* pages;
  }

  private async fetchAllPages(
    title: string,
  ): Promise<RawgSearchGameInfoResponse[]> {
    const pages: RawgSearchGameInfoResponse[] = [];

    for await (const page of this.delegate.searchAllGames(title)) {
      pages.push(page);
    }

    return pages;
  }
}
