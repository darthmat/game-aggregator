import { FastifyInstance } from 'fastify';
import { ISearchHistoryService } from './search-history.interface.js';
import { SearchHistoryDTO } from './search-history.dto.js';
import { UnavailableServiceError } from '@/utils/errors.js';

export class SearchHistoryRouter {
  constructor(private readonly searchHistoryService: ISearchHistoryService) {}

  register(fastify: FastifyInstance) {
    fastify.get(
      '/search-history/popular',
      async (req): Promise<SearchHistoryDTO[]> => {
        return await this.searchHistoryService
          .getSearchHistory()
          .catch((error: unknown) => {
            req.log.error(
              error,
              '[SearchHistory] Failed to fetch popular searches from database',
            );

            throw new UnavailableServiceError('Database error');
          });
      },
    );
  }
}
