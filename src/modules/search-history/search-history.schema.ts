import { z } from 'zod';

export const searchHistoryItemSchema = z.object({
  query: z.string(),
  searchCount: z.number().int().nonnegative(),
});

export const searchHistorySchema = z.array(searchHistoryItemSchema);

export const serviceUnavailableSchema = z.object({
  error: z.string(),
  message: z.string(),
});
