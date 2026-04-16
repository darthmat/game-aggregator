import { FastifyInstance } from 'fastify';
import { ISearchHistoryService } from './search-history.interface.js';
import { SearchHistoryDTO } from './search-history.dto.js';

export class SearchHistoryRouter {
  constructor(private readonly searchHistoryService: ISearchHistoryService) {}

  register(fastify: FastifyInstance) {
    fastify.get(
      '/search-history/popular',
      async (_req, res): Promise<SearchHistoryDTO[]> => {
        return await this.searchHistoryService.getSearchHistory().catch(() => {
          res.status(503).send({
            error: 'Service Unavailable',
            message: 'Database error',
          });
          return [];
        });
      },
    );
  }
}
