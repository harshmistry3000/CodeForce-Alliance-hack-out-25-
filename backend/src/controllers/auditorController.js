const Application = require('../models/Application');
const { simulatePayment } = require('./paymentController');

exports.getPendingApplications = async (req, res) => {
    try {
        const applications = await Application.find({ currentStatus: 'submitted' }).populate('startupId schemeId');
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve pending applications.' });
    }
};

exports.reviewApplication = async (req, res) => {
    const { applicationId } = req.params;
    const { status, comments, documentName } = req.body;
    const auditorId = req.user.id;
    try {
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({ message: 'Application not found.' });
        }
        if (status === 'approved') {
            const doc = application.documents.find(d => d.documentName === documentName);
            if (doc) {
                doc.isVerified = true;
            }
            application.auditTrail.push({ action: `Document "${documentName}" approved`, timestamp: Date.now(), comments, actor: auditorId });
        } else if (status === 'rejected') {
            application.currentStatus = 'rejected';
            application.auditTrail.push({ action: 'Application Rejected', timestamp: Date.now(), comments, actor: auditorId });
            await application.save();
            return res.status(200).json({ message: 'Application rejected.' });
        }

        const allDocsVerified = application.documents.every(doc => doc.isVerified);
        if (allDocsVerified) {
            application.currentStatus = 'approved';
            application.auditTrail.push({ action: 'All documents verified. Application approved.', timestamp: Date.now(), actor: auditorId });
            await application.save();

            // **SMART CONTRACT ENGINE SIMULATION**
            await simulatePayment(applicationId, 'Milestone 1 Payment', 100000); // Trigger payment
            return res.status(200).json({ message: 'Application approved and payment triggered.' });
        }

        await application.save();
        res.status(200).json({ message: 'Document status updated.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to review application.' });
    }
};