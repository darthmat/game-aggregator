import { RichGameProfile } from './game.interface.js';

export interface GameDTO {
  readonly title: string;
  readonly description: string | null;
  readonly released: Date | null;
  readonly rating: Rating;
  readonly image: URL | null;
  readonly platforms: readonly string[];
  readonly genres: readonly string[];
  readonly developers: readonly string[];
  readonly publishers: readonly string[];
  readonly website: URL | null;
  readonly deals: readonly Deal[];
}

interface Rating {
  average: number;
  top: number;
  count: number;
}

interface Deal {
  dealUrl: URL;
  price: number;
  currency: string;
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
    image: core.backgroundImage ? new URL(core.backgroundImage) : null,
    platforms: core.platforms.map((platform) => platform.platform.name),
    genres: core.genres.map((genre) => genre.name),
    developers: core.developers.map((developer) => developer.name),
    publishers: core.publishers.map((publisher) => publisher.name),
    website: core.website ? new URL(core.website) : null,
    deals: deals.map((deal) => {
      return {
        dealUrl: new URL(deal.url),
        price: deal.price.amount,
        currency: deal.price.currency,
      };
    }),
  };
}
