import { Database } from '@/database/types.js';
import { SearchHistoryDTO } from './search-history.dto.js';
import { ISearchHistoryRepository } from './search-history.interface.js';

export class SearchHistoryRepositoryImplementation implements ISearchHistoryRepository {
  constructor(private readonly db: Database) {}
  async getSearchHistory(): Promise<SearchHistoryDTO[]> {
    return await this.db
      .selectFrom('search_history')
      .select((eb) => ['query', eb.fn.count<number>('query').as('searchCount')])
      .groupBy('query')
      .orderBy('searchCount', 'desc')
      .limit(10)
      .execute();
  }

  async saveSearchHistory(title: string): Promise<void> {
    await this.db
      .insertInto('search_history')
      .values({
        query: title,
      })
      .execute();
  }
}
