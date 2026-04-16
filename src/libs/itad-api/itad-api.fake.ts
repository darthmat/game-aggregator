import { vitest } from 'vitest';
import { IItadApi } from './itad-api.interface.js';

export class FakeItadApi implements IItadApi {
  getGameDeals = vitest.fn<IItadApi['getGameDeals']>(async () => null);
}
