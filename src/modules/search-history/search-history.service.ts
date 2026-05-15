import { FastifyBaseLogger } from 'fastify';
import { SearchHistoryDTO } from './search-history.dto.js';
import {
  ISearchHistoryRepository,
  ISearchHistoryService,
} from './search-history.interface.js';

export class SearchHistoryServiceImpl implements ISearchHistoryService {
  constructor(
    private readonly searchHistoryRepository: ISearchHistoryRepository,
    private readonly logger: FastifyBaseLogger,
  ) {}

  async saveSearchHistory(title: string): Promise<void> {
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
