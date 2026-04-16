import { urlBuilder } from '@/utils/urlBuilder.js';
import {
  ItadApi,
  ItadCompleteData,
  ItadGamePriceRawResponse,
  ItadLookupResponse,
} from './itad-api.interface.js';
import { itadGameDealResponseSchema } from './itad-api.schema.js';
import { fetchWithTimeout } from '@/utils/fetch.js';
import pLimit from 'p-limit';

export class ItadApiImplementation implements ItadApi {
  private limit = pLimit(2);
  constructor(
    private readonly baseUrl: string,
    private readonly key: string,
    private readonly customFetch = fetch,
  ) {}

  private async getGameLookup(title: string): Promise<ItadLookupResponse> {
    const response = await this.limit(
      async () =>
        await fetchWithTimeout(
          urlBuilder(`${this.baseUrl}/games/lookup/v1`, { title }, this.key),
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
      throw new Error('Failed to fetch game from itad.', {
        cause: {
          status: response.status,
          statusText: response.statusText,
          body: await response.text(),
        },
      });
    }

    return await (response.json() as Promise<ItadLookupResponse>);
  }

  private async getPrices(id: string): Promise<ItadGamePriceRawResponse[]> {
    const response = await this.limit(
      async () =>
        await fetchWithTimeout(
          urlBuilder(`${this.baseUrl}/games/prices/v3`, undefined, this.key),
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify([id]),
          },
          5000,
          this.customFetch,
        ),
    );

    if (!response.ok) {
      throw new Error('Failed to fetch game from itad.', {
        cause: {
          status: response.status,
          statusText: response.statusText,
          body: await response.text(),
        },
      });
    }

    return [itadGameDealResponseSchema.parse(await response.json())];
  }

  async getGame(title: string): Promise<ItadCompleteData | null> {
    const gameLookup = await this.getGameLookup(title);

    if (!gameLookup.found) return null;

    const gameDeals = await this.getPrices(gameLookup.id).catch(() => null);

    return {
      deals: gameDeals ?? [],
    };
  }
}
