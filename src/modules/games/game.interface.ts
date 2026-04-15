import {
  ItadGameInfoRawResponse,
  ItadGamePriceRawResponse,
} from '@/libs/itad-api/itad-api.interface.js';
import { RawgGameInfoRawResponse } from '@/libs/rawg-api/rawg-api.interface.js';

export interface GameService {
  getGame(title: string): Promise<RichGameProfile | null>;
}

export type MergedGameCore = RawgGameInfoRawResponse &
  Partial<ItadGameInfoRawResponse>;

export interface RichGameProfile {
  core: MergedGameCore;
  deals: ItadGamePriceRawResponse[];
}
