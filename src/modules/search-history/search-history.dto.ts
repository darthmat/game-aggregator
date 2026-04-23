import z from 'zod';
import { searchHistoryItemSchema } from './search-history.schema.js';

export type SearchHistoryDTO = z.infer<typeof searchHistoryItemSchema>;
