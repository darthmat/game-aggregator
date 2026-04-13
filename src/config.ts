import 'dotenv/config';
import * as z from 'zod';

export const envSchema = z.object({
  host: z.string().default('localhost'),
  port: z.coerce.number().default(4000),
  db: z
    .object({
      host: z.string(),
      port: z.coerce.number(),
      user: z.string(),
      password: z.string(),
      database: z.string(),
    })
    .required(),
  redis: z.object({
    host: z.string().default('localhost'),
    port: z.coerce.number().default(6379),
    password: z.string().optional(),
    sentinel: z.boolean().default(false),
    db: z.number().default(0),
  }),
  api: z.object({
    rawg: z.object({
      base: z.string(),
      key: z.string(),
    }),
    itad: z.object({
      base: z.string(),
      key: z.string(),
    }),
  }),
});

export const config = envSchema.parse({
  host: process.env.APP_HOST,
  port: process.env.PORT,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    sentinel: process.env.REDIS_SENTINEL,
    db: process.env.REDIS_DB,
  },
  api: {
    rawg: {
      base: process.env.RAWG_BASE_URL,
      key: process.env.RAWG_API_KEY,
    },
    itad: {
      base: process.env.ITAD_BASE_URL,
      key: process.env.ITAD_API_KEY,
    },
  },
});

export type Config = typeof config;
