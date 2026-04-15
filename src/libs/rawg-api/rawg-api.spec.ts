import { Cache } from '@jeengbe/cache';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CachedRawgApi, RawgApiCacheTypes } from './rawg-api.cache.js';
import { FakeRawgApi } from './rawg-api.fake.js';
import { RawgApi } from './rawg-api.interface.js';
import { RawgApiImplementation } from './rawg-api.service.js';
import { mockResponse } from '@/utils/mock.js';

describe('CachedRawgApi', () => {
  let delegateMock: RawgApi;
  let cacheMock: Partial<Cache<RawgApiCacheTypes>>;
  let cachedApi: CachedRawgApi;

  beforeEach(() => {
    delegateMock = {
      getGame: vi.fn(),
    };

    cacheMock = {
      cached: vi.fn(),
    };

    cachedApi = new CachedRawgApi(
      delegateMock,
      cacheMock as Cache<RawgApiCacheTypes>,
    );
  });

  it('should call cached method with correct key and TTL', async () => {
    await cachedApi.getGame('cyberpunk-2077');

    expect(cacheMock.cached).toHaveBeenCalledWith(
      'rawg-games-api:cyberpunk-2077',
      expect.any(Function),
      '1w',
    );
  });

  it('should return correct cached data without calling external API', async () => {
    const mockedGame = { id: 1, name: 'Cyberpunk 2077 from Cache' };
    (cacheMock.cached as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockedGame,
    );

    const result = await cachedApi.getGame('cyberpunk-2077');

    expect(result).toEqual(mockedGame);
    expect(cacheMock.cached).toHaveBeenCalledTimes(1);

    expect(delegateMock.getGame).not.toHaveBeenCalled();
  });

  it('should call external API if no cached data', async () => {
    (cacheMock.cached as ReturnType<typeof vi.fn>).mockImplementation(
      (_key, factory, _ttl) => {
        return factory();
      },
    );

    const freshGame = { id: 2, name: 'Witcher 3 from API' };
    (delegateMock.getGame as ReturnType<typeof vi.fn>).mockResolvedValue(
      freshGame,
    );

    const result = await cachedApi.getGame('witcher-3');

    expect(result).toEqual(freshGame);

    expect(delegateMock.getGame).toHaveBeenCalledWith('witcher-3');
    expect(delegateMock.getGame).toHaveBeenCalledTimes(1);
  });
});

describe('RawgApiImplementation', () => {
  let rawgApi: RawgApi;
  const mockFetch = vi.fn();

  beforeEach(() => {
    rawgApi = new RawgApiImplementation('http://localhost', '', mockFetch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return null if no game from api', async () => {
    mockFetch.mockResolvedValueOnce(
      mockResponse(
        {
          ok: false,
          message: 'Not Found',
        },
        404,
      ),
    );

    const result = await rawgApi.getGame('null-game');

    expect(result).toEqual(null);
  });

  it('should throw error on any other issue', async () => {
    mockFetch.mockResolvedValueOnce(
      mockResponse(
        {
          ok: false,
          message: 'something went wrong',
        },
        500,
      ),
    );

    const result = rawgApi.getGame('error-game');
    await expect(result).rejects.toThrow('Failed to fetch game from rawg.');
  });
});
