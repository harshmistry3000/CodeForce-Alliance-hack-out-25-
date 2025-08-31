const express = require('express');
const router = express.Router();
const { getPendingApplications, reviewApplication } = require('../controllers/auditorController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/applications/pending', authMiddleware, roleMiddleware(['auditor']), getPendingApplications);
router.put('/applications/:applicationId/review', authMiddleware, roleMiddleware(['auditor']), reviewApplication);

module.exports = router;