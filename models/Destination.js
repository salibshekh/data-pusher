const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    url: { type: String, required: true },
    method: { type: String, required: true, enum: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'] },
    headers: { type: Map, of: String, default: {} },
    active: { type: Boolean, default: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

DestinationSchema.index({ account: 1 });

module.exports = mongoose.model('Destination', DestinationSchema);
