import { vitest } from 'vitest';
import { IRawgApi } from './rawg-api.interface.js';

export class FakeRawgApi implements IRawgApi {
  getGame = vitest.fn<IRawgApi['getGame']>(async () => null);
  searchGames = vitest.fn<IRawgApi['searchGames']>(async () => {
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
  });
}
