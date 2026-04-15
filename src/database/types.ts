/* eslint-disable @typescript-eslint/naming-convention */
import { Kysely } from 'kysely';

export type Database = Kysely<GameAggregatorDatabaseTables>;

export interface GameAggregatorDatabaseTables {
  search_history: SearchHistoryTable;
}

interface SearchHistoryTable {
  id: number;
  query: string;
  created_at: Date;
}
