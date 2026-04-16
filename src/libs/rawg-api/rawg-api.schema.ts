/* eslint-disable @typescript-eslint/naming-convention */
/* RAWG api unfortunately use some snake case data */
import z from 'zod';

const rawgBaseGameSchema = z.object({
  slug: z.string(),
  name: z.string(),
  rating: z.number().nullish().default(0),
  background_image: z.string().nullish(),
  platforms: z
    .array(z.object({ platform: z.object({ name: z.string() }) }))
    .default([]),
});

export const rawgGameInfoResponseSchema = rawgBaseGameSchema
  .extend({
    description: z.string().nullish().default(''),
    released: z.string().nullish(),
    website: z.string().catch(''),
    rating_top: z.number().nullish().default(0),
    ratings_count: z.number().nullish().default(0),
    developers: z
      .array(
        z.object({
          name: z.string(),
        }),
      )
      .default([]),
    publishers: z
      .array(
        z.object({
          name: z.string(),
        }),
      )
      .default([]),
    genres: z
      .array(
        z.object({
          name: z.string(),
        }),
      )
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
    developers: data.developers,
    publishers: data.publishers,
    genres: data.genres,
  }));

export const rawgSearchResponseSchema = rawgBaseGameSchema.transform(
  (data) => ({
    slug: data.slug,
    title: data.name,
    backgroundImage: data.background_image,
    rating: data.rating,
    platforms: data.platforms,
  }),
);

export const searchRawgGameInfoResponseSchema = z.object({
  count: z.number(),
  results: z.array(rawgSearchResponseSchema),
  next: z.string().nullable(),
  previous: z.string().nullable(),
});
