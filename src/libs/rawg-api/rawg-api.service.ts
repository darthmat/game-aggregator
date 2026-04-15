import { urlBuilder } from '@/utils/urlBuilder.js';
import { RawgApi, RawgGameInfoRawResponse } from './rawg-api.interface.js';
import { rawgGameInfoResponseSchema } from './itad-api.schema.js';

export class RawgApiImplementation implements RawgApi {
  constructor(
    private readonly baseUrl: string,
    private readonly key: string,
    private readonly customFetch = fetch,
  ) {}

  async getGame(title: string): Promise<RawgGameInfoRawResponse | null> {
    const response = await this.customFetch(
      urlBuilder(`${this.baseUrl}/games/${title}`, undefined, this.key),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
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
}
