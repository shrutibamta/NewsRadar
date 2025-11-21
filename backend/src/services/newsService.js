const Article = require('../models/Article');
const { getRedis } = require('../config/redisClient');
const { fetchNewsFromProvider } = require('./externalNewsApi');
const crypto = require('crypto');

const DEFAULT_TTL = 60 * 5;

function newsCacheKey(category, cursor, limit, q) {
  const hash = crypto.createHash('md5').update(`${category}:${cursor || ''}:${limit}:${q || ''}`).digest('hex');
  return `news:${hash}`;
}

function encodeCursor(item) {
  const payload = JSON.stringify({ lastDate: item.publishedAt, lastId: item._id });
  return Buffer.from(payload).toString('base64');
}

function decodeCursor(cursor) {
  if (!cursor) return null;
  try {
    return JSON.parse(Buffer.from(cursor, 'base64').toString());
  } catch (e) { return null; }
}

async function getNews({ category='general', cursor=null, limit=20, q='' }) {
  const redis = getRedis();
  const cacheKey = newsCacheKey(category, cursor, limit, q);
  try {
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);
  } catch (e) { /* ignore cache errors */ }

  const decoded = decodeCursor(cursor);
  const query = { category };
  if (q) query.title = { $regex: q, $options: 'i' };

  if (decoded) {
    query.$or = [
      { publishedAt: { $lt: new Date(decoded.lastDate) } },
      { publishedAt: decoded.lastDate, _id: { $lt: decoded.lastId } }
    ];
  }

  const docs = await Article.find(query)
    .sort({ publishedAt: -1, _id: -1 })
    .limit(limit + 1);

  if (docs.length === 0) {
    const articles = await fetchNewsFromProvider(category, limit);
    if (articles && articles.length) {
      const toInsert = articles.map(a => ({
        title: a.title,
        source: a.source && a.source.name,
        author: a.author,
        url: a.url,
        category,
        publishedAt: a.publishedAt ? new Date(a.publishedAt) : new Date(),
        description: a.description,
        fetchedAt: new Date()
      }));
      await Article.insertMany(toInsert).catch(()=>{});
      // re-run
      return getNews({ category, cursor, limit, q });
    }
  }

  const hasMore = docs.length > limit;
  const items = docs.slice(0, limit);
  const nextCursor = hasMore ? encodeCursor(docs[limit - 1]) : null;
  const result = { items, nextCursor };

  try {
    await redis.set(cacheKey, JSON.stringify(result), 'EX', DEFAULT_TTL);
  } catch (e) {}

  return result;
}

module.exports = { getNews };
