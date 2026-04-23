import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { GameDTO, SearchGameDTO, SearchGameResponse } from './games.dto.js';
import { IGameService } from './games.interface.js';
import {
  gameDTOSchema,
  gameParamsSchema,
  gameQuerySchema,
  gameSearchSchema,
  rateLimitSchema,
  searchGameResponse,
} from './games.schema.js';
import { rawGameDataToDto, rawSearchGameDataToDto } from './games.mapper.js';

export class GamesRouter {
  constructor(private readonly gamesService: IGameService) {}

  register(fastify: FastifyInstance) {
    const server = fastify.withTypeProvider<ZodTypeProvider>();

    server.get(
      '/game/:title',
      {
        schema: {
          tags: ['Game'],
          params: gameParamsSchema,
          querystring: gameQuerySchema,
          response: {
            200: gameDTOSchema.nullable(),
            429: rateLimitSchema,
          },
        },
      },
      async (req): Promise<GameDTO | null> => {
        const { title } = req.params;
        const { country } = req.query;

        const gameData = await this.gamesService.getGame(title, country);

        if (!gameData) return null;

        return rawGameDataToDto(gameData);
      },
    );

    server.get(
      '/games/search',
      {
        schema: {
          tags: ['Games'],
          querystring: gameSearchSchema,
          response: {
            200: searchGameResponse,
          },
        },
      },
      async (req): Promise<SearchGameResponse> => {
        const { title } = req.query;

        const { games, total } = await this.gamesService.searchAllGames(title);

        return {
          games: rawSearchGameDataToDto(games),
          total,
        };
      },
    );
  }
}
