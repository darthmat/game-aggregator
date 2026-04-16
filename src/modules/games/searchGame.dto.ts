import { RawgSearchResponse } from '@/libs/rawg-api/rawg-api.interface.js';

export interface SearchGameDTO {
  readonly title: string;
  readonly rating: number | null;
  readonly image: URL | null;
  readonly platforms: readonly string[];
  readonly slug: string;
}

export function rawSearchGameDataToDto(
  searchGamesInfoResponse: RawgSearchResponse[],
): SearchGameDTO[] {
  return searchGamesInfoResponse.map((game) => {
    return {
      title: game.title,
      rating: game.rating,
      slug: game.slug,
      platforms: game.platforms.map((platform) => platform.platform.name),
      image: game.backgroundImage ? new URL(game.backgroundImage) : null,
    };
  });
}
