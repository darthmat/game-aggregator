import { ItadGamePriceRawResponse } from '@/libs/itad-api/itad-api.interface.js';
import {
  RawgGameInfoRawResponse,
  RawgSearchGameInfoResponse,
} from '@/libs/rawg-api/rawg-api.interface.js';

export interface IGameService {
  getGame(title: string, country?: string): Promise<RichGameProfile | null>;
  searchGames(title: string): Promise<RawgSearchGameInfoResponse>;
}

export interface RichGameProfile {
  core: RawgGameInfoRawResponse;
  deals: ItadGamePriceRawResponse[];
}

export interface IGameEventPublisher {
  gameSearched(title: string): void;
}
