/* eslint-disable @typescript-eslint/naming-convention */
import { Kysely, Generated } from 'kysely';

export type Database = Kysely<GameAggregatorDatabaseTables>;

export interface GameAggregatorDatabaseTables {
  search_history: SearchHistoryTable;
}

interface SearchHistoryTable {
  id: Generated<number>;
  query: string;
  created_at: Generated<Date>;
}
