import z from 'zod';

export const searchGameDTO = z.object({
  title: z.string().min(1),
  rating: z.number().nullable(),
  image: z.url().nullable(),
  platforms: z.array(z.string()),
  slug: z.string(),
});

const ratingSchema = z.object({
  average: z.number(),
  top: z.number(),
  count: z.number().int(),
});

const dealSchema = z.object({
  dealUrl: z.url(),
  price: z.number(),
  currency: z.string().length(3),
});

export const gameDTOSchema = z.object({
  title: z.string().min(1),
  description: z.string().nullable(),
  released: z.date().nullable(),
  rating: ratingSchema,
  image: z.url().nullable(),
  platforms: z.array(z.string()),
  genres: z.array(z.string()),
  developers: z.array(z.string()),
  publishers: z.array(z.string()),
  website: z.url().nullable(),
  slug: z.string(),
  deals: z.array(dealSchema),
});

export const searchGameResponse = z.object({
  games: z.array(searchGameDTO),
  total: z.number(),
});

export const gameParamsSchema = z.object({
  title: z.string().min(3),
});

export const gameQuerySchema = z.object({
  country: z.string().optional(),
});

export const gameSearchSchema = z.object({
  title: z.string().min(3),
});

export const rateLimitSchema = z.object({
  error: z.string(),
  message: z.string(),
});
