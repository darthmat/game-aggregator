import z from 'zod';
import { itadGameDealResponseSchema } from './itad-api.schema.js';

export interface ItadApi {
  getGame(title: string, country?: string): Promise<ItadCompleteData | null>;
}

export interface ItadCompleteData {
  deals: ItadGamePriceRawResponse[];
}

export type ItadLookupResponse = ItadLookupNotFound | ItadLookupFound;

interface ItadLookupNotFound {
  found: false;
}

interface ItadLookupFound {
  found: true;
  game: {
    id: string;
  };
}

export type ItadGamePriceRawResponse = z.infer<
  typeof itadGameDealResponseSchema
>;
