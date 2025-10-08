const Log = require('../models/Log');
const Account = require('../models/Account');

exports.listLogs = async (req, res) => {
    try {
        const { accountId } = req.query;
        const filter = {};

        if (accountId) {
            if (/^[0-9a-fA-F]{24}$/.test(accountId)) {
                filter.account = accountId;
            } else {
                const acc = await Account.findOne({ account_id: accountId }).lean();
                if (!acc) return res.status(404).json({ success: false, message: 'Account not found' });
                filter.account = acc._id;
            }
        }

        const logs = await Log.find(filter)
            .sort({ received_timestamp: -1 })
            .limit(200)
            .lean();

        res.json({ success: true, logs });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
