import { IItadApi } from '@/libs/itad-api/itad-api.interface.js';
import {
  IRawgApi,
  RawgSearchGameInfoResponse,
  RawgSearchResponse,
} from '@/libs/rawg-api/rawg-api.interface.js';
import {
  GamesSearchResult,
  IGameEventPublisher,
  IGameService,
  RichGameProfile,
} from './games.interface.js';

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

  async searchAllGames(title: string): Promise<GamesSearchResult> {
    const games: RawgSearchResponse[] = [];

    for await (const game of this.searchGames(title)) {
      games.push(...game.results);

      if (games.length >= this.gamesLimit) break;
    }

    return {
      games: games.slice(0, this.gamesLimit),
      total: games.length,
    };
  }
}
