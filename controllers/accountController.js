const Account = require('../models/Account');
const Destination = require('../models/Destination');
const AccountMember = require('../models/AccountMember');
const Log = require('../models/Log');

exports.createAccount = async (req, res) => {
    try {
        const { account_name, website } = req.body;
        const created_by = req.user ? req.user._id : undefined;
        const account = await Account.create({ account_name, website, created_by });
        res.status(201).json({ success: true, account });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getAccount = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id).lean();
        if (!account) return res.status(404).json({ success: false, message: 'Account not found' });
        res.json({ success: true, account });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const accountId = req.params.id;
        const account = await Account.findById(accountId);
        if (!account) return res.status(404).json({ success: false, message: 'Not found' });

        await Promise.all([
            Destination.deleteMany({ account: accountId }),
            AccountMember.deleteMany({ account: accountId }),
            Log.deleteMany({ account: accountId }),
            Account.deleteOne({ _id: accountId })
        ]);

        res.json({ success: true, message: 'Account and related data deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
