import { vitest } from 'vitest';
import { RawgApi } from './rawg-api.interface.js';

export class FakeRawgApi implements RawgApi {
  getGame = vitest.fn<RawgApi['getGame']>(async () => null);
}
