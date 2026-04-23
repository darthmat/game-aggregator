import { IItadApi } from '@/libs/itad-api/itad-api.interface.js';
import {
  IRawgApi,
  RawgSearchGameInfoResponse,
  RawgSearchResponse,
} from '@/libs/rawg-api/rawg-api.interface.js';
import {
  IGameEventPublisher,
  IGameService,
  RichGameProfile,
} from './game.interface.js';

export class GameServiceImpl implements IGameService {
  private readonly gamesLimit = 100;

  constructor(
    private readonly rawgApi: IRawgApi,
    private readonly itadApi: IItadApi,
    private readonly gameEventPublisher: IGameEventPublisher,
  ) {}

  async getGame(
    title: string,
    country?: string,
  ): Promise<RichGameProfile | null> {
    const [rawgGame, itadGame] = await Promise.all([
      this.rawgApi.getGame(title),
      this.itadApi.getGameDeals(title, country),
    ]);

    if (!rawgGame) return null;

    return {
      core: rawgGame,
      deals: itadGame?.deals ?? [],
    };
  }

  private async *searchGames(
    title: string,
  ): AsyncGenerator<RawgSearchGameInfoResponse> {
    this.gameEventPublisher.gameSearched(title);

    yield* this.rawgApi.searchAllGames(title);
  }

  async searchAllGames(title: string): Promise<RawgSearchResponse[]> {
    const results: RawgSearchResponse[] = [];

    for await (const batch of this.searchGames(title)) {
      results.push(...batch.results);

      if (results.length >= this.gamesLimit) break;
    }

    return results;
  }
}
