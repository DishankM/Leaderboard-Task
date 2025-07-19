// server/models/ClaimHistory.js
const mongoose = require('mongoose');

const ClaimHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    claimedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ClaimHistory', ClaimHistorySchema);