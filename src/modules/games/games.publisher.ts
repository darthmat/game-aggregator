import EventEmitter from 'events';
import { IGameEventPublisher } from './games.interface.js';

export const GAME_SEARCHED_EVENT = 'search:game';

export class GameEventPublisher implements IGameEventPublisher {
  constructor(private readonly eventEmitter: EventEmitter) {}

  gameSearched(title: string): void {
    this.eventEmitter.emit(GAME_SEARCHED_EVENT, title);
  }
}
