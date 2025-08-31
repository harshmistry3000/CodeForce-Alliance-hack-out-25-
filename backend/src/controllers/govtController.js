const Scheme = require('../models/Scheme');
const User = require('../models/User');
const Application = require('../models/Application');

exports.createScheme = async (req, res) => {
    const { schemeName, description, allocatedFunds, milestones } = req.body;
    try {
        const scheme = new Scheme({ schemeName, description, allocatedFunds, milestones });
        await scheme.save();
        res.status(201).json(scheme);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create scheme.' });
    }
};

exports.getSchemes = async (req, res) => {
    try {
        const schemes = await Scheme.find();
        res.status(200).json(schemes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve schemes.' });
    }
};

exports.getAnalytics = async (req, res) => {
    try {
        const totalSchemes = await Scheme.countDocuments();
        const activeSchemes = await Scheme.countDocuments({ status: 'active' });
        const totalFunds = await Scheme.aggregate([{ $group: { _id: null, total: { $sum: '$allocatedFunds' } } }]);
        const totalApplications = await Application.countDocuments();
        const approvedApplications = await Application.countDocuments({ currentStatus: 'approved' });

        res.status(200).json({
            totalSchemes,
            activeSchemes,
            totalFunds: totalFunds[0]?.total || 0,
            totalApplications,
            approvedApplications,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve analytics.' });
    }
};