import { FastifyInstance, RouteGenericInterface } from 'fastify';
import { GameDTO, rawGameDataToDto } from './game.dto.js';
import { GameService } from './game.interface.js';

interface GameParams extends RouteGenericInterface {
  Params: {
    title: string;
    country?: string;
  };
}

export class GamesRouter {
  constructor(private readonly gamesService: GameService) {}

  register(fastify: FastifyInstance) {
    fastify.get<GameParams>(
      '/games/:title/:country?',
      async (req, res): Promise<GameDTO | null> => {
        const { title, country } = req.params;

        const gameData = await this.gamesService
          .getGame(title, country)
          .catch(() => {
            res.status(503).send({
              error: 'Service Unavailable',
              message: 'External API error',
            });
            return null;
          });

        if (!gameData) return null;

        return rawGameDataToDto(gameData);
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
