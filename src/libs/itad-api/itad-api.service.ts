import { urlBuilder } from '@/utils/urlBuilder.js';
import {
  ItadApi,
  ItadCompleteData,
  ItadGameInfoRawResponse,
  ItadGamePriceRawResponse,
  ItadLookupResponse,
} from './itad-api.interface.js';
import {
  itadGameDealResponseSchema,
  itadGameInfoResponseSchema,
} from './itad-api.schema.js';

export class ItadApiImplementation implements ItadApi {
  constructor(
    private readonly baseUrl: string,
    private readonly key: string,
    private readonly customFetch = fetch,
  ) {}

  private async getGameLookup(title: string): Promise<ItadLookupResponse> {
    const response = await this.customFetch(
      urlBuilder(`${this.baseUrl}/games/lookup/v1`, { title }, this.key),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
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

  private async getGameInfo(
    id: string,
  ): Promise<ItadGameInfoRawResponse | null> {
    const response = await this.customFetch(
      urlBuilder(`${this.baseUrl}/games/info/v2`, { id }, this.key),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.status === 404) return null;

    if (!response.ok) {
      throw new Error('Failed to fetch game from itad.', {
        cause: {
          status: response.status,
          statusText: response.statusText,
          body: await response.text(),
        },
      });
    }

    return itadGameInfoResponseSchema.parse(await response.json());
  }

  private async getPrices(id: string): Promise<ItadGamePriceRawResponse[]> {
    const response = await this.customFetch(
      urlBuilder(`${this.baseUrl}/games/prices/v3`, undefined, this.key),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([id]),
      },
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

    const gameId = gameLookup.id;

    const [gameInfo, gameDeals] = await Promise.all([
      this.getGameInfo(gameId),
      this.getPrices(gameId).catch(() => null),
    ]);

    return {
      info: gameInfo,
      deals: gameDeals ?? [],
    };
  }
}
