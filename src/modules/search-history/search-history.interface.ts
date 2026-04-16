import { SearchHistoryDTO } from './search-history.dto.js';

export interface ISearchHistoryRepository {
  saveSearchHistory(title: string): Promise<void>;
  getSearchHistory(): Promise<SearchHistoryDTO[]>;
}

export interface ISearchHistoryService {
  getSearchHistory(): Promise<SearchHistoryDTO[]>;
}
