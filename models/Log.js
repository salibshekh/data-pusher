const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    event_id: { type: String, required: true },
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
    received_timestamp: { type: Date, default: Date.now },
    processed_timestamp: { type: Date },
    received_data: { type: mongoose.Schema.Types.Mixed },
    status: { type: String, enum: ['received', 'queued', 'success', 'failed'], default: 'received' },
    response_code: { type: Number },
    error_message: { type: String }
}, { timestamps: true });

LogSchema.index({ event_id: 1 });
LogSchema.index({ account: 1 });

module.exports = mongoose.model('Log', LogSchema);
