import EventEmitter from 'events';
import { SearchHistoryDTO } from './search-history.dto.js';
import {
  ISearchHistoryRepository,
  ISearchHistoryService,
} from './search-history.interface.js';
import { FastifyBaseLogger } from 'fastify';

export class SearchHistoryServiceImpl implements ISearchHistoryService {
  private readonly onSearchGame: (title: string) => void;

  constructor(
    private readonly searchHistoryRepository: ISearchHistoryRepository,
    private readonly eventEmitter: EventEmitter,
    private readonly logger: FastifyBaseLogger,
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
        this.logger.error(
          error,
          `[SearchHistoryService] Can't save history for: ${title}`,
        );
      });
  }
  async getSearchHistory(): Promise<SearchHistoryDTO[]> {
    return await this.searchHistoryRepository.getSearchHistory();
  }
}
