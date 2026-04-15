import { vitest } from 'vitest';
import { ItadApi } from './itad-api.interface.js';

export class FakeItadApi implements ItadApi {
  getGame = vitest.fn<ItadApi['getGame']>(async () => null);
}
