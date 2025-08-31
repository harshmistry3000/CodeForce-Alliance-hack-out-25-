const express = require('express');
const router = express.Router();
const { submitApplication, getStartupApplications } = require('../controllers/startupController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/applications', authMiddleware, roleMiddleware(['startup']), submitApplication);
router.get('/applications', authMiddleware, roleMiddleware(['startup']), getStartupApplications);

module.exports = router;