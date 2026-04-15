import z from 'zod';
import { rawgGameInfoResponseSchema } from './rawg-api.schema.js';

export interface RawgApi {
  getGame(title: string): Promise<RawgGameInfoRawResponse | null>;
  searchGames(title: string): Promise<SearchRawgGameInfoResponse>;
}

export type RawgGameInfoRawResponse = z.infer<
  typeof rawgGameInfoResponseSchema
>;

export interface SearchRawgGameInfoResponse {
  count: number;
  results: RawgGameInfoRawResponse[];
  next: string | null;
  previous: string | null;
}
