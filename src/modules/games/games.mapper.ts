import { RawgSearchResponse } from '@/libs/rawg-api/rawg-api.interface.js';
import { GameDTO, SearchGameDTO } from './games.dto.js';
import { RichGameProfile } from './games.interface.js';

export function rawSearchGameDataToDto(
  searchGamesInfoResponse: RawgSearchResponse[],
): SearchGameDTO[] {
  return searchGamesInfoResponse.map((game) => {
    return {
      title: game.title,
      rating: game.rating,
      slug: game.slug,
      platforms: game.platforms.map((platform) => platform.platform.name),
      image: game.backgroundImage ?? null,
    };
  });
}

export function rawGameDataToDto({ core, deals }: RichGameProfile): GameDTO {
  return {
    title: core.title,
    description: core.description,
    released: core.released ? new Date(core.released) : null,
    rating: {
      top: core.ratingTop ?? 0,
      average: core.rating ?? 0,
      count: core.ratingCount ?? 0,
    },
    slug: core.slug,
    image: core.backgroundImage ?? null,
    platforms: core.platforms.map((platform) => platform.platform.name),
    genres: core.genres.map((genre) => genre.name),
    developers: core.developers.map((developer) => developer.name),
    publishers: core.publishers.map((publisher) => publisher.name),
    website: core.website,
    deals: deals.map((deal) => {
      return {
        dealUrl: deal.url,
        price: deal.price.amount,
        currency: deal.price.currency,
      };
    }),
  };
}
