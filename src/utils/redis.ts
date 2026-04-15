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

export async function createRedisCacheAdapter(
  config: Config,
): Promise<CacheAdapter> {
  assert(config.redis.host, 'Redis host must be set');

  const redis = new Redis(createRedisOptions(config.redis));

  await new Promise<void>((resolve, reject) => {
    redis.once('ready', resolve);
    redis.once('error', reject);
  });

  return new RedisCacheAdapter(redis);
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
