const express = require('express');
const router = express.Router();
const { createScheme, getSchemes, getAnalytics } = require('../controllers/govtController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/schemes', authMiddleware, roleMiddleware(['government']), createScheme);
router.get('/schemes', authMiddleware, roleMiddleware(['government']), getSchemes);
router.get('/analytics', authMiddleware, roleMiddleware(['government']), getAnalytics);

module.exports = router;