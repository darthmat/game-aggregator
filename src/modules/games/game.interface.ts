import { ItadGamePriceRawResponse } from '@/libs/itad-api/itad-api.interface.js';
import {
  RawgGameInfoRawResponse,
  RawgSearchGameInfoResponse,
  RawgSearchResponse,
} from '@/libs/rawg-api/rawg-api.interface.js';

export interface IGameService {
  getGame(title: string, country?: string): Promise<RichGameProfile | null>;
  searchAllGames(title: string): Promise<RawgSearchResponse[]>;
}

export interface RichGameProfile {
  core: RawgGameInfoRawResponse;
  deals: ItadGamePriceRawResponse[];
}

export interface IGameEventPublisher {
  gameSearched(title: string): void;
}
