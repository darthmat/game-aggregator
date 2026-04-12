import { GameDTO } from './game.dto.js';

export interface GameService {
  getGame(title: string): Promise<GameDTO | null>;
}
