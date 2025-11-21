const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const { getRedis } = require('../config/redisClient');

const store = {
  incr: (...args) => {
    const redis = getRedis();
    return redis.incr(...args);
  }
};

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests'
});

module.exports = limiter;
