import { describe, it, expect } from 'vitest';
import { urlBuilder } from '../urlBuilder.js';

describe('urlBuilder', () => {
  it('should return correct url', () => {
    const url = 'https://api.rawg.io/api/games';
    const result = urlBuilder(url);

    expect(result).toBe('https://api.rawg.io/api/games');
  });

  it('should add secret key to parameter', () => {
    const url = 'https://api.rawg.io/api/games';
    const result = urlBuilder(url, undefined, 'key-123');

    expect(result).toBe('https://api.rawg.io/api/games?key=key-123');
  });

  it('should add any parameter than key', () => {
    const url = 'https://api.rawg.io/api/games';
    const params = { search: 'witcher', page: '2' };
    const result = urlBuilder(url, params);

    expect(result).toBe('https://api.rawg.io/api/games?search=witcher&page=2');
  });

  it('should correctly encode text', () => {
    const url = 'https://example.com/api';
    const params = {
      query: 'gta v',
      tags: 'action&adventure',
    };
    const result = urlBuilder(url, params);

    expect(result).toBe(
      'https://example.com/api?query=gta+v&tags=action%26adventure',
    );
  });

  it('should throw error on bad url', () => {
    expect(() => {
      urlBuilder('/bad-url', { page: '1' });
    }).toThrow(TypeError);
  });
});
