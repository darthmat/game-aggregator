import { IGameEventPublisher } from './games.interface.js';

export class FakeGameEventPublisher implements IGameEventPublisher {
  searchedTitles: string[] = [];

  gameSearched(title: string): void {
    this.searchedTitles.push(title);
  }
}
