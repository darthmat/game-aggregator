import z from 'zod';
import {
  gameDTOSchema,
  searchGameDTO,
  searchGameResponse,
} from './games.schema.js';

export type GameDTO = z.infer<typeof gameDTOSchema>;
export type SearchGameDTO = z.infer<typeof searchGameDTO>;
export type SearchGameResponse = z.infer<typeof searchGameResponse>;
