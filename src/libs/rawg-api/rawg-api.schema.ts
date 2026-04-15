/* eslint-disable @typescript-eslint/naming-convention */
/* RAWG api unfortunately use some snake case data*/
import z from 'zod';

export const rawgGameInfoResponseSchema = z
  .object({
    slug: z.string(),
    name: z.string(),
    description: z.string().nullish().default(''),
    released: z.string().nullish(),
    background_image: z.string().nullish(),
    website: z.string().catch(''),
    rating: z.number().nullish().default(0),
    rating_top: z.number().nullish().default(0),
    ratings_count: z.number().nullish().default(0),
    platforms: z
      .array(z.object({ platform: z.object({ name: z.string() }) }))
      .default([]),
  })
  .transform((data) => ({
    slug: data.slug,
    title: data.name,
    description: data.description,
    released: data.released,
    backgroundImage: data.background_image,
    website: data.website,
    rating: data.rating,
    ratingTop: data.rating_top,
    ratingCount: data.ratings_count,
    platforms: data.platforms,
  }));

export type RawgGameInfo = z.infer<typeof rawgGameInfoResponseSchema>;
