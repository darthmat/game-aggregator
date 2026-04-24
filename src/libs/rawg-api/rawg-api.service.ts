import { fetchWithTimeout } from '@/utils/abort.js';
import { urlBuilder } from '@/utils/urlBuilder.js';
import pLimit from 'p-limit';
import {
  IRawgApi,
  RawgGameInfoRawResponse,
  RawgSearchGameInfoResponse,
  RawgSearchResponse,
} from './rawg-api.interface.js';
import {
  rawgGameInfoResponseSchema,
  searchRawgGameInfoResponseSchema,
} from './rawg-api.schema.js';
import { UnavailableServiceError } from '@/utils/errors.js';

export class RawgApiImplementation implements IRawgApi {
  private readonly limit = pLimit(10);
  constructor(
    private readonly baseUrl: string,
    private readonly key: string,
    private readonly customFetch = fetch,
  ) {}

  async getGame(title: string): Promise<RawgGameInfoRawResponse | null> {
    const response = await this.limit(
      async () =>
        await fetchWithTimeout(
          urlBuilder(`${this.baseUrl}/games/${title}`, undefined, this.key),
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
          5000,
          this.customFetch,
        ),
    );

    if (response.status === 404) return null;

    if (!response.ok) {
      throw new UnavailableServiceError('Failed to fetch game from rawg.');
    }

    return rawgGameInfoResponseSchema.parse(await response.json());
  }

  private async searchGames(url: string): Promise<RawgSearchGameInfoResponse> {
    const response = await this.limit(
      async () =>
        await fetchWithTimeout(
          url,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
          5000,
          this.customFetch,
        ),
    );

    if (!response.ok) {
      throw new UnavailableServiceError('Failed to fetch game from rawg.');
    }

    return searchRawgGameInfoResponseSchema.parse(await response.json());
  }

  async searchAllGames(
    title: string,
    maxResults: number,
  ): Promise<RawgSearchGameInfoResponse[]> {
    const pages: RawgSearchGameInfoResponse[] = [];
    let nextUrl: string | null = urlBuilder(
      `${this.baseUrl}/games`,
      // eslint-disable-next-line @typescript-eslint/naming-convention -- api required snake case as params
      { search: title, page_size: maxResults.toString() },
      this.key,
    );

    while (nextUrl) {
      const url: string = nextUrl;

      const response = await this.limit(
        async () => await this.searchGames(url),
      );

      pages.push(response);

      const total = pages.reduce((sum, p) => sum + p.results.length, 0);
      if (total >= maxResults) break;

      nextUrl = response.next;
    }

    return pages;
  }
}
