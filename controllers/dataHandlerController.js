const Account = require('../models/Account');
const Log = require('../models/Log');
const forwardQueue = require('../services/queueService').forwardQueue;

exports.incoming = async (req, res) => {
    try {

        if (!req.is('application/json')) return res.status(400).json({ success: false, message: 'Content-Type must be application/json' });

        const token = req.headers['cl-x-token'];
        const eventId = req.headers['cl-x-event-id'];

        if (!token || !eventId) return res.status(400).json({ success: false, message: 'Missing required headers' });

        const account = await Account.findOne({ app_secret_token: token });
        if (!account) return res.status(401).json({ success: false, message: 'Invalid token' });

        const existing = await Log.findOne({ event_id: eventId, account: account._id });
        if (existing) return res.status(409).json({ success: false, message: 'Duplicate event_id' });

        req.account = account;

        await Log.create({
            event_id: eventId,
            account: account._id,
            received_data: req.body,
            status: 'queued',
            received_timestamp: new Date()
        });

        await forwardQueue.add({ accountId: account._id.toString(), eventId, data: req.body });

        res.json({ success: true, message: 'Data received' });
    } catch (err) {
        console.error('incoming error', err);
        res.status(500).json({ success: false, message: err.message });
    }
};
