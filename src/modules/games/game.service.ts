import { ItadApi } from '@/libs/itad-api/interface.js';
import { RawgApi } from '@/libs/rawg-api/interface.js';
import { GameDTO } from './game.dto.js';
import { GameService } from './game.interface.js';

export class GameServiceImpl implements GameService {
  constructor(
    private readonly rawgApi: RawgApi,
    private readonly itadApi: ItadApi,
  ) {}

  async getGame(title: string): Promise<GameDTO | null> {
    const rawgGame = await this.rawgApi.getGame(title);
    const itadGame = await this.itadApi.getGame(title);

    if (!itadGame.found) return null;

    const itadPrices = await this.itadApi.getPrices(itadGame.game.id);

    return null;
  }
}
