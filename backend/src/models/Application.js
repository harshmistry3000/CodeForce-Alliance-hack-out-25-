// src/models/Application.js

const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    startupId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    schemeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Scheme', required: true },
    companyName: { type: String, required: true },
    // All fields in the application form go here
    documents: [{
        documentName: String,
        path: String, // Stored file path
        isVerified: { type: Boolean, default: false },
    }],
    currentStatus: {
        type: String,
        enum: ['pending', 'submitted', 'in_review', 'approved', 'rejected', 'payment_pending', 'payment_complete'],
        default: 'submitted'
    },
    auditTrail: [{
        action: String,
        timestamp: Date,
        comments: String,
        actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    }],
    payments: [{
        amount: Number,
        milestone: String,
        razorpayOrderId: String,
        status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
        timestamp: Date,
    }],
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);  