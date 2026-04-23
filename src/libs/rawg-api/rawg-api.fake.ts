import { vitest } from 'vitest';
import { IRawgApi } from './rawg-api.interface.js';

export class FakeRawgApi implements IRawgApi {
  getGame = vitest.fn<IRawgApi['getGame']>(async () => null);
  searchAllGames = vitest.fn<IRawgApi['searchAllGames']>(async () => [
    {
      count: 0,
      next: null,
      previous: null,
      results: [],
    },
  ]);
}
