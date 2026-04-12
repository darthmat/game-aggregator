import { urlBuilder } from '@/utils/urlBuilder.js';
import { RawgApi } from './interface.js';
import { GameSingle } from './generated/Api.js';

export class RawgApiImplementation implements RawgApi {
  constructor(
    private readonly baseUrl: string,
    private readonly key: string,
    private readonly customFetch = fetch,
  ) {}

  async getGame(title: string): Promise<GameSingle> {
    const response = await this.customFetch(
      urlBuilder(`${this.baseUrl}/games/${title}`, undefined, this.key),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch game from rawg.', {
        cause: {
          status: response.status,
          statusText: response.statusText,
          body: await response.text(),
        },
      });
    }

    return await (response.json() as Promise<GameSingle>);
  }
}
