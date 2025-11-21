const Redis = require('ioredis');
let redis;

function initRedis() {
  const host = process.env.REDIS_HOST || '127.0.0.1';
  const port = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379;
  redis = new Redis({ host, port });
  redis.on('connect', () => console.log('Redis connected'));
  redis.on('error', (e) => console.error('Redis error', e));
}

function getRedis() {
  if (!redis) initRedis();
  return redis;
}

module.exports = { initRedis, getRedis };
