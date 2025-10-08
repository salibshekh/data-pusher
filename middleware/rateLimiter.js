const { RateLimiterRedis } = require('rate-limiter-flexible');
const redisClient = require('../config/redis');
const { DEFAULT_RATE_LIMIT_POINTS, DEFAULT_RATE_LIMIT_DURATION } = require('../config/constants');

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    points: DEFAULT_RATE_LIMIT_POINTS,
    duration: DEFAULT_RATE_LIMIT_DURATION,
    keyPrefix: 'rlflx'
});

module.exports = async (req, res, next) => {
    try {
        const key = req.account ? `account_${req.account._id.toString()}` : req.ip;
        await limiter.consume(key, 1);
        next();
    } catch (rej) {
        res.status(429).json({ success: false, message: 'Too many requests' });
    }
};
