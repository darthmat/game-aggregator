import { urlBuilder } from '@/utils/urlBuilder.js';
import {
  RawgApi,
  RawgGameInfoRawResponse,
  SearchRawgGameInfoResponse,
} from './rawg-api.interface.js';
import { rawgGameInfoResponseSchema } from './rawg-api.schema.js';
import { fetchWithTimeout } from '@/utils/fetch.js';
import pLimit from 'p-limit';

export class RawgApiImplementation implements RawgApi {
  private limit = pLimit(2);
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
      throw new Error('Failed to fetch game from rawg.', {
        cause: {
          status: response.status,
          statusText: response.statusText,
          body: await response.text(),
        },
      });
    }

    return rawgGameInfoResponseSchema.parse(await response.json());
  }

  async searchGames(title: string): Promise<SearchRawgGameInfoResponse> {
    const response = await this.limit(
      async () =>
        await fetchWithTimeout(
          urlBuilder(`${this.baseUrl}/games`, { search: title }, this.key),
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
      throw new Error('Failed to fetch games from rawg.', {
        cause: {
          status: response.status,
          statusText: response.statusText,
          body: await response.text(),
        },
      });
    }

    return (await response.json()) as SearchRawgGameInfoResponse;
  }
}
