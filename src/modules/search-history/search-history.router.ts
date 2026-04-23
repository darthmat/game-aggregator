import { FastifyInstance } from 'fastify';
import { ISearchHistoryService } from './search-history.interface.js';
import { SearchHistoryDTO } from './search-history.dto.js';
import { UnavailableServiceError } from '@/utils/errors.js';

export class SearchHistoryRouter {
  constructor(private readonly searchHistoryService: ISearchHistoryService) {}

  register(fastify: FastifyInstance) {
    fastify.get(
      '/search-history/popular',
      async (_req): Promise<SearchHistoryDTO[]> => {
        return await this.searchHistoryService.getSearchHistory().catch(() => {
          throw new UnavailableServiceError('Database error');
        });
      },
    );
  }
}
