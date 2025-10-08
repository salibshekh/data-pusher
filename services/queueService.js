const Queue = require('bull');
const redisConfig = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
    password: process.env.REDIS_PASSWORD || undefined
};

const forwardQueue = new Queue('forward-queue', { redis: redisConfig });

forwardQueue.on('error', (err) => console.error('Queue error', err));
forwardQueue.on('ready', () => console.log('Queue ready'));

module.exports = { forwardQueue };
