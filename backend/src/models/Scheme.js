// src/models/Scheme.js

const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
    schemeName: { type: String, required: true },
    description: { type: String, required: true },
    allocatedFunds: { type: Number, required: true },
    milestones: [{
        description: String,
        verificationRules: String, // e.g., "volume > 1000kg"
    }],
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('Scheme', schemeSchema);