import { ItadApi } from '@/libs/itad-api/itad-api.interface.js';
import { RawgApi } from '@/libs/rawg-api/rawg-api.interface.js';
import { GameService, RichGameProfile } from './game.interface.js';

export class GameServiceImpl implements GameService {
  constructor(
    private readonly rawgApi: RawgApi,
    private readonly itadApi: ItadApi,
  ) {}

  async getGame(title: string): Promise<RichGameProfile | null> {
    const [rawgGame, itadGame] = await Promise.all([
      this.rawgApi.getGame(title),
      this.itadApi.getGame(title),
    ]);

    if (!rawgGame) return null;

    return {
      core: {
        ...rawgGame,
        ...itadGame?.info,
      },
      deals: itadGame?.deals ?? [],
    };
  }
}
