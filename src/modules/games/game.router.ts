import { FastifyInstance } from 'fastify';
import z from 'zod';
import { GameDTO, rawGameDataToDto } from './game.dto.js';
import { IGameService } from './game.interface.js';
import { rawSearchGameDataToDto, SearchGameDTO } from './searchGame.dto.js';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { UnavailableServiceError } from '@/utils/errors.js';

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
      async (req): Promise<GameDTO | null> => {
        const { title, country } = req.params;

        const gameData = await this.gamesService
          .getGame(title, country)
          .catch(() => {
            throw new UnavailableServiceError('External API error');
          });

        if (!gameData) return null;

        return rawGameDataToDto(gameData);
      },
    );

    server.get(
      '/games/search',
      {
        schema: { querystring: gameSearchSchema },
      },
      async (req): Promise<SearchGameDTO[]> => {
        const { title } = req.query;

        const gameData = await this.gamesService
          .searchAllGames(title)
          .catch(() => {
            throw new UnavailableServiceError('External API error');
          });

        return rawSearchGameDataToDto(gameData);
      },
    );
  }
}
