import { CacheAdapter, RedisCacheAdapter } from '@jeengbe/cache';
import assert from 'assert';
import { Redis } from 'ioredis';
import { createRedisOptions } from './redis.js';
import { Config } from '@/config.js';

export async function createCacheAdapter(
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
