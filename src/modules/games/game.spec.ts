import { FakeRawgApi } from '@/libs/rawg-api/rawg-api.fake.js';
import { beforeEach, describe, expect, it } from 'vitest';
import { GameService } from './game.interface.js';
import { GameServiceImpl } from './game.service.js';
import { FakeItadApi } from '@/libs/itad-api/itad-api.fake.js';

describe('GameServiceImpl', () => {
  let rawgApi: FakeRawgApi;
  let itadApi: FakeItadApi;
  let gameService: GameService;

  beforeEach(() => {
    rawgApi = new FakeRawgApi();
    itadApi = new FakeItadApi();

    gameService = new GameServiceImpl(rawgApi, itadApi);
  });

  it('should return game with deals', async () => {
    rawgApi.getGame.mockResolvedValue({
      slug: 'factorio',
      title: 'factorio',
      description: null,
      website: 'factorio',
      rating: null,
      ratingTop: null,
      ratingCount: null,
      released: undefined,
      backgroundImage: undefined,
      platforms: [],
      publishers: [{ name: 'Wube' }],
      developers: [{ name: 'Wube' }],
      genres: [],
    });

    itadApi.getGame.mockResolvedValue({
      deals: [
        {
          shop: {
            id: 123,
            name: 'steam',
          },
          price: {
            amount: 100,
            amountInt: 100,
            currency: 'PLN',
          },
          dealPlatforms: [
            {
              id: 123,
              name: 'steam',
            },
          ],
          expiry: null,
          url: 'https://store.steampowered.com/app/427520/Factorio/',
        },
      ],
    });

    const result = await gameService.getGame('factorio');

    expect(result).toEqual({
      core: {
        slug: 'factorio',
        title: 'factorio',
        description: null,
        website: 'factorio',
        rating: null,
        ratingTop: null,
        ratingCount: null,
        released: undefined,
        backgroundImage: undefined,
        publishers: [{ name: 'Wube' }],
        developers: [{ name: 'Wube' }],
        platforms: [],
        genres: [],
      },
      deals: [
        {
          expiry: null,
          dealPlatforms: [
            {
              id: 123,
              name: 'steam',
            },
          ],
          price: {
            amount: 100,
            amountInt: 100,
            currency: 'PLN',
          },
          shop: {
            id: 123,
            name: 'steam',
          },
          url: 'https://store.steampowered.com/app/427520/Factorio/',
        },
      ],
    });
  });

  it('should return game without deals', async () => {
    rawgApi.getGame.mockResolvedValue({
      slug: 'factorio',
      title: 'factorio',
      description: null,
      website: 'factorio',
      rating: null,
      ratingTop: null,
      ratingCount: null,
      released: undefined,
      backgroundImage: undefined,
      platforms: [],
      developers: [],
      publishers: [],
      genres: [],
    });

    const result = await gameService.getGame('factorio');

    expect(result).toEqual({
      core: {
        slug: 'factorio',
        title: 'factorio',
        description: null,
        website: 'factorio',
        rating: null,
        ratingTop: null,
        ratingCount: null,
        released: undefined,
        backgroundImage: undefined,
        platforms: [],
        developers: [],
        publishers: [],
        genres: [],
      },
      deals: [],
    });
  });

  it('should return null if game not exist in rawg API', async () => {
    const result = await gameService.getGame('factorio');

    expect(result).toEqual(null);
  });
});
