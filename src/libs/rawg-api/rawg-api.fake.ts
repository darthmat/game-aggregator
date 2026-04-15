import { vitest } from 'vitest';
import { RawgApi, SearchRawgGameInfoResponse } from './rawg-api.interface.js';

export class FakeRawgApi implements RawgApi {
  getGame = vitest.fn<RawgApi['getGame']>(async () => null);
  searchGames = vitest.fn<RawgApi['searchGames']>(async () => {
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
  });
}
