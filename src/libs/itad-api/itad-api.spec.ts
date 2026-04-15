import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ItadApi } from './itad-api.interface.js';
import { ItadApiImplementation } from './itad-api.service.js';
import { mockResponse } from '@/utils/mock.js';

describe('ItadgApiImplementation', () => {
  let itadApi: ItadApi;
  const mockFetch = vi.fn();

  beforeEach(() => {
    itadApi = new ItadApiImplementation('http://localhost', '', mockFetch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return null if no game from api', async () => {
    mockFetch.mockResolvedValue(
      mockResponse({
        found: false,
      }),
    );

    const result = await itadApi.getGame('null-game');

    expect(result).equal(null);
  });

  it('should throw error on any other issue', async () => {
    mockFetch.mockResolvedValue(
      mockResponse(
        {
          ok: false,
          message: 'something went wrong',
        },
        500,
      ),
    );

    const result = itadApi.getGame('null-game');

    await expect(result).rejects.toThrow('Failed to fetch game from itad.');
  });

  it('should return empty deals if getPrices throws', async () => {
    mockFetch.mockResolvedValueOnce(
      mockResponse({ found: true, id: 'abc123' }),
    );
    mockFetch.mockResolvedValueOnce(
      mockResponse({
        slug: 'factorio',
        title: 'factorio',
        tags: [],
        developers: [],
        publishers: [],
      }),
    );
    mockFetch.mockResolvedValueOnce(mockResponse({ ok: false }, 500));

    const result = await itadApi.getGame('factorio');

    expect(result).toEqual({
      info: {
        slug: 'factorio',
        title: 'factorio',
        tags: [],
        developers: [],
        publishers: [],
      },
      deals: [],
    });
  });
});
