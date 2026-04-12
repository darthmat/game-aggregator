import { urlBuilder } from '@/utils/urlBuilder.js';
import { ItadApi, ItadLookupResponse, ItadPriceResponse } from './interface.js';

export class ItadApiImplementation implements ItadApi {
  constructor(
    private readonly baseUrl: string,
    private readonly key: string,
    private readonly customFetch = fetch,
  ) {}

  async getGame(title: string): Promise<ItadLookupResponse> {
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
      new Error('Failed to fetch game from itad.', {
        cause: {
          status: response.status,
          statusText: response.statusText,
          body: await response.text(),
        },
      });
    }

    return (await response.json().catch((error: unknown) => {
      new Error('Failed to fetch game from itad.', {
        cause: error,
      });
    })) as ItadLookupResponse;
  }

  async getPrices(id: string): Promise<ItadPriceResponse> {
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
      new Error('Failed to fetch game from itad.', {
        cause: {
          status: response.status,
          statusText: response.statusText,
          body: await response.text(),
        },
      });
    }

    return (await response.json().catch((error: unknown) => {
      new Error('Failed to fetch game from itad.', {
        cause: error,
      });
    })) as ItadPriceResponse;
  }
}
