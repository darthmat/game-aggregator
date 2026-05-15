import EventEmitter from 'events';
import { GAME_SEARCHED_EVENT } from '../games/games.publisher.js';
import {
  ISearchHistoryConsumer,
  ISearchHistoryService,
} from './search-history.interface.js';

export class SearchHistoryConsumer implements ISearchHistoryConsumer {
  constructor(
    private readonly searchHistoryService: ISearchHistoryService,
    private readonly eventEmitter: EventEmitter,
  ) {}

  registerListeners(): void {
    this.eventEmitter.on(GAME_SEARCHED_EVENT, this.onSearchGame);
  }

  private onSearchGame = (title: string) => {
    void this.searchHistoryService.saveSearchHistory(title);
  };
}
