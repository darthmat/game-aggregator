import { FastifyInstance } from 'fastify';

export class SearchHistoryRouter {
  constructor(private readonly searchHistoryService: unknown) {}

  async register(fastify: FastifyInstance) {
    fastify.get('//search-history/popular', async (req, res) => {
      try {
        throw Error('not yet implemented');
      } catch (error: unknown) {
        new Error('something went wrong');
        res.status(503).send();
      }
    });
  }
}
