const redis = require('../config/redis');

exports.get = async (key) => {
    const v = await redis.get(key);
    if (!v) return null;
    try { return JSON.parse(v); } catch (e) { return v; }
};

exports.set = async (key, value, ttl = 60) => {
    const str = typeof value === 'string' ? value : JSON.stringify(value);
    if (ttl > 0) await redis.set(key, str, 'EX', ttl);
    else await redis.set(key, str);
};
