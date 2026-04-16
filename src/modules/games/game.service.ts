import { IItadApi } from '@/libs/itad-api/itad-api.interface.js';
import {
  IRawgApi,
  RawgSearchGameInfoResponse,
} from '@/libs/rawg-api/rawg-api.interface.js';
import {
  IGameEventPublisher,
  IGameService,
  RichGameProfile,
} from './game.interface.js';

export class GameServiceImpl implements IGameService {
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

  async searchGames(title: string): Promise<RawgSearchGameInfoResponse> {
    const searchGamesInfo = await this.rawgApi.searchGames(title);

    this.gameEventPublisher.gameSearched(title);

    return searchGamesInfo;
  }
}
