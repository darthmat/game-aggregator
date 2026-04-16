import z from 'zod';
import {
  rawgGameInfoResponseSchema,
  rawgSearchResponseSchema,
  searchRawgGameInfoResponseSchema,
} from './rawg-api.schema.js';

export interface IRawgApi {
  getGame(title: string): Promise<RawgGameInfoRawResponse | null>;
  searchGames(title: string): Promise<RawgSearchGameInfoResponse>;
}

export type RawgGameInfoRawResponse = z.infer<
  typeof rawgGameInfoResponseSchema
>;

export type RawgSearchGameInfoResponse = z.infer<
  typeof searchRawgGameInfoResponseSchema
>;

export type RawgSearchResponse = z.infer<typeof rawgSearchResponseSchema>;
