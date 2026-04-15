import z from 'zod';
import {
  itadGameDealResponseSchema,
  itadGameInfoResponseSchema,
} from './itad-api.schema.js';

export interface ItadApi {
  getGame(title: string): Promise<ItadCompleteData | null>;
}

export interface ItadCompleteData {
  info: ItadGameInfoRawResponse | null;
  deals: ItadGamePriceRawResponse[];
}

export type ItadLookupResponse = ItadLookupNotFound | ItadLookupFound;

interface ItadLookupNotFound {
  found: false;
}

interface ItadLookupFound {
  found: true;
  id: string;
}

export type ItadGamePriceRawResponse = z.infer<
  typeof itadGameDealResponseSchema
>;

export type ItadGameInfoRawResponse = z.infer<
  typeof itadGameInfoResponseSchema
>;
