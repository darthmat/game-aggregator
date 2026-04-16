import { Config } from '@/config.js';
import { CacheAdapter, RedisCacheAdapter } from '@jeengbe/cache';
import assert from 'assert';
import { Redis, RedisOptions } from 'ioredis';

export interface RedisConfig {
  host?: string;
  port?: number;
  password?: string;
  db?: number;
}

interface IRedis {
  cacheAdapter: CacheAdapter;
  client: Redis;
}

export async function createRedisCacheAdapter(config: Config): Promise<IRedis> {
  assert(config.redis.host, 'Redis host must be set');

  const client = new Redis(createRedisOptions(config.redis));

  await new Promise<void>((resolve, reject) => {
    client.once('ready', resolve);
    client.once('error', reject);
  });

  return {
    cacheAdapter: new RedisCacheAdapter(client),
    client,
  };
}

function createRedisOptions(config: RedisConfig): RedisOptions {
  assert(config.host, 'Redis host must be set');

  return {
    host: config.host,
    port: config.port,
    password: config.password,
    db: config.db,
  };
}
