import { FastifyInstance } from 'fastify';
import z from 'zod';
import { GameDTO, rawGameDataToDto } from './game.dto.js';
import { IGameService } from './game.interface.js';
import { rawSearchGameDataToDto, SearchGameDTO } from './searchGame.dto.js';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

const gameSchema = z.object({
  title: z.string().min(3),
  country: z.string().optional(),
});

const gameSearchSchema = z.object({
  title: z.string().min(3),
});

export class GamesRouter {
  constructor(private readonly gamesService: IGameService) {}

  register(fastify: FastifyInstance) {
    const server = fastify.withTypeProvider<ZodTypeProvider>();

    server.get(
      '/game/:title/:country?',
      { schema: { params: gameSchema } },
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

    server.get(
      '/games/search',
      {
        schema: { querystring: gameSearchSchema }, // <- Tutaj podpinasz schemat
      },
      async (req, res): Promise<SearchGameDTO[]> => {
        const { title } = req.query;

        const gameData = await this.gamesService
          .searchGames(title)
          .catch(() => {
            res.status(503).send({
              error: 'Service Unavailable',
              message: 'External API error',
            });
            return null;
          });

        if (!gameData) return [];

        return rawSearchGameDataToDto(gameData.results);
      },
    );
  }
}
