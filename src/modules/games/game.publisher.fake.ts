import { IGameEventPublisher } from './game.interface.js';

export class FakeGameEventPublisher implements IGameEventPublisher {
  searchedTitles: string[] = [];

  gameSearched(title: string): void {
    this.searchedTitles.push(title);
  }
}
