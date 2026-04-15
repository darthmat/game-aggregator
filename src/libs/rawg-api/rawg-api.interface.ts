import z from 'zod';
import { rawgGameInfoResponseSchema } from './itad-api.schema.js';

export interface RawgApi {
  getGame(title: string): Promise<RawgGameInfoRawResponse | null>;
}

export type RawgGameInfoRawResponse = z.infer<
  typeof rawgGameInfoResponseSchema
>;
