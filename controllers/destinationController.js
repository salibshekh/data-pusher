const Destination = require('../models/Destination');

exports.createDestination = async (req, res) => {
    try {
        const { accountId, url, method, headers } = req.body;
        if (!accountId || !url || !method) return res.status(400).json({ success: false, message: 'Missing fields' });

        const dest = await Destination.create({
            account: accountId,
            url,
            method,
            headers: headers || {},
            created_by: req.user ? req.user._id : undefined
        });

        res.status(201).json({ success: true, destination: dest });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.listForAccount = async (req, res) => {
    try {
        const accountId = req.params.accountId;
        const list = await Destination.find({ account: accountId }).lean();
        res.json({ success: true, data: list });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updateDestination = async (req, res) => {
    try {
        const id = req.params.id;
        const update = req.body;
        const updated = await Destination.findByIdAndUpdate(id, update, { new: true });
        if (!updated) return res.status(404).json({ success: false, message: 'Destination not found' });
        res.json({ success: true, destination: updated });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteDestination = async (req, res) => {
    try {
        const id = req.params.id;
        await Destination.deleteOne({ _id: id });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
