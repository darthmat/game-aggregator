import { GameSingle } from './generated/Api.js';

export interface RawgApi {
  getGame(title: string): Promise<GameSingle>;
}
