import { registerAs } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

export default registerAs('cache', () => {
  if (process.env.CACHE_STORE === 'redis') {
    return {
      ttl: Number(process.env.CACHE_TTL),
      max: Number(process.env.CACHE_MAX),
      store: redisStore,
      host: process.env.CACHE_HOST,
      port: Number(process.env.CACHE_PORT),
    };
  } else {
    return {
      ttl: Number(process.env.CACHE_TTL),
      max: Number(process.env.CACHE_MAX),
    };
  }
});
