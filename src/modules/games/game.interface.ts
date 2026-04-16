import { ItadGamePriceRawResponse } from '@/libs/itad-api/itad-api.interface.js';
import { RawgGameInfoRawResponse } from '@/libs/rawg-api/rawg-api.interface.js';

export interface GameService {
  getGame(title: string, country?: string): Promise<RichGameProfile | null>;
}

export interface RichGameProfile {
  core: RawgGameInfoRawResponse;
  deals: ItadGamePriceRawResponse[];
}
