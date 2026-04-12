export interface GameDTO {
  readonly id: number;
  readonly name: string;
  readonly description: string | null;
  readonly released: Date;
  readonly rating: Rating;
  readonly image: URL | null;
  readonly platforms: readonly string[];
  readonly genres: readonly string[];
  readonly developers: readonly string[];
  readonly publishers: readonly string[];
  readonly website: URL;
  readonly prices: readonly number[];
}

interface Rating {
  average: number;
  top: number;
  count: number;
}
