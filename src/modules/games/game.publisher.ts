import EventEmitter from 'events';
import { IGameEventPublisher } from './game.interface.js';

export class GameEventPublisher implements IGameEventPublisher {
  constructor(private readonly eventEmitter: EventEmitter) {}

  gameSearched(title: string): void {
    this.eventEmitter.emit('search:game', title);
  }
}
