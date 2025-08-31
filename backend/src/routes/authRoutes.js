const express = require('express');
const router = express.Router();
const { registerStartup, createAuditor, login, verifyOtp } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/register/startup', registerStartup);
router.post('/register/auditor', authMiddleware, roleMiddleware(['government']), createAuditor);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);

module.exports = router;