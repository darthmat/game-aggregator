import { FastifyInstance, RouteGenericInterface } from 'fastify';
import { GameDTO } from './game.dto.js';
import { GameService } from './game.interface.js';

interface GameParams extends RouteGenericInterface {
  Params: {
    title: string;
  };
}

export class GamesRouter {
  constructor(private readonly gamesService: GameService) {}

  register(fastify: FastifyInstance) {
    fastify.get<GameParams>(
      '/games/:title',
      async (req, res): Promise<GameDTO | null> => {
        const { title } = req.params;
        return await this.gamesService
          .getGame(title)
          .catch((error: unknown) => {
            res.status(503).send(error);
            return null;
          });
      },
    );

    fastify.get('/games/search', async (req, res): Promise<void> => {
      try {
        throw Error('not yet implemented');
      } catch (error: unknown) {
        new Error('something went wrong');
        res.status(503).send();
      }
    });
  }
}
