require('dotenv').config();
const connectDB = require('../config/database');
const { forwardQueue } = require('../services/queueService');
const Account = require('../models/Account');
const Destination = require('../models/Destination');
const Log = require('../models/Log');
const { WORKER_CONCURRENCY } = require('../config/constants');
const webhookService = require('../services/webhookService');

const start = async () => {
    await connectDB(process.env.MONGO_URI);
    console.log('Worker connected to DB');

    forwardQueue.process(WORKER_CONCURRENCY, async (job) => {
        const { accountId, eventId, data } = job.data;
        try {
            // find destinations for account
            const destinations = await Destination.find({ account: accountId, active: true }).lean();
            for (const dest of destinations) {
                try {
                    // headers map -> plain object
                    let headers = {};
                    if (dest.headers) {
                        for (const [k, v] of dest.headers.entries()) headers[k] = v;
                    }
                    if (!headers['Content-Type']) headers['Content-Type'] = 'application/json';

                    const resp = await webhookService.fire({ method: dest.method, url: dest.url, data, headers });
                    await Log.create({
                        event_id: `${eventId}_${dest._id.toString()}`,
                        account: accountId,
                        destination: dest._id,
                        received_data: data,
                        status: 'success',
                        response_code: resp.status,
                        processed_timestamp: new Date()
                    });
                } catch (errDest) {
                    await Log.create({
                        event_id: `${eventId}_${dest._id.toString()}`,
                        account: accountId,
                        destination: dest._id,
                        received_data: data,
                        status: 'failed',
                        error_message: (errDest && errDest.message) || 'unknown',
                        processed_timestamp: new Date()
                    });
                }
            }
            return Promise.resolve();
        } catch (err) {
            console.error('process job error', err);
            throw err;
        }
    });

    forwardQueue.on('completed', (job) => {
        console.log(job)
    });
};

start().catch((e) => {
    console.error('Worker failed', e);
    process.exit(1);
});
