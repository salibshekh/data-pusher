module.exports = {
    DEFAULT_RATE_LIMIT_POINTS: Number(process.env.RATE_LIMIT_POINTS) || 5,
    DEFAULT_RATE_LIMIT_DURATION: Number(process.env.RATE_LIMIT_DURATION) || 1,
    WORKER_CONCURRENCY: Number(process.env.WORKER_CONCURRENCY) || 5,
};
