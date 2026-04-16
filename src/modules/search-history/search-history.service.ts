import EventEmitter from 'events';
import { SearchHistoryDTO } from './search-history.dto.js';
import {
  ISearchHistoryRepository,
  ISearchHistoryService,
} from './search-history.interface.js';

export class SearchHistoryServiceImpl implements ISearchHistoryService {
  private readonly onSearchGame: (title: string) => void;

  constructor(
    private readonly searchHistoryRepository: ISearchHistoryRepository,
    private readonly eventEmitter: EventEmitter,
  ) {
    this.onSearchGame = (title: string) => {
      void this.saveSearchHistory(title);
    };
  }

  registerListeners(): void {
    this.eventEmitter.on('search:game', this.onSearchGame);
  }

  private async saveSearchHistory(title: string): Promise<void> {
    await this.searchHistoryRepository
      .saveSearchHistory(title)
      .catch((error: unknown) => {
        console.error(
          `[SearchHistoryService] Nie udało się zapisać historii dla: ${title}`,
          error,
        );
      });
  }
  async getSearchHistory(): Promise<SearchHistoryDTO[]> {
    return await this.searchHistoryRepository.getSearchHistory();
  }
}
