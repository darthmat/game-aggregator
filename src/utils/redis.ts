import assert from 'assert';
import { RedisOptions } from 'ioredis';

export interface RedisConfig {
  host?: string;
  port?: number;
  password?: string;
  sentinel?: boolean;
  db?: number;
}

export function createRedisOptions(config: RedisConfig): RedisOptions {
  assert(config.host, 'Redis host must be set');

  return config.sentinel
    ? {
        sentinels: [
          {
            host: config.host,
            port: config.port,
          },
        ],
        password: config.password,
        db: config.db,
        name: 'mymaster',
        // See: https://github.com/redis/ioredis/issues/1390
        keepAlive: 15 * 60 * 1000,
      }
    : {
        host: config.host,
        port: config.port,
        password: config.password,
        db: config.db,
      };
}
