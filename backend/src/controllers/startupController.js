const Application = require('../models/Application');
const Scheme = require('../models/Scheme');

exports.submitApplication = async (req, res) => {
    const { companyName, schemeId, projectDescription, documents } = req.body;
    const startupId = req.user.id; // From JWT payload
    try {
        const application = new Application({
            startupId,
            schemeId,
            companyName,
            projectDescription,
            documents,
            currentStatus: 'submitted',
        });
        await application.save();
        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ error: 'Application submission failed.' });
    }
};

exports.getStartupApplications = async (req, res) => {
    const startupId = req.user.id;
    try {
        const applications = await Application.find({ startupId }).populate('schemeId');
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve applications.' });
    }
};