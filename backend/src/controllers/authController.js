const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.registerStartup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role: 'startup' });
        await user.save();
        res.status(201).json({ message: 'Startup registered successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'User registration failed.' });
    }
};

exports.createAuditor = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role: 'auditor' });
        await user.save();
        res.status(201).json({ message: 'Auditor created successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Auditor creation failed.' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        const otp = crypto.randomInt(100000, 999999).toString();
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your Login OTP',
            text: `Your OTP for login is ${otp}. It is valid for 10 minutes.`,
        });

        res.status(200).json({ message: 'OTP sent to your email.' });
    } catch (error) {
        res.status(500).json({ error: 'Login process failed.' });
    }
};

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    // Input validation
    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required.' });
    }

    try {
        const user = await User.findOne({ email: email.toLowerCase().trim() });

        if (!user) {
            return res.status(400).json({ message: 'User not found.' });
        }

        // Check if OTP exists
        if (!user.otp) {
            return res.status(400).json({ message: 'No OTP found. Please request a new one.' });
        }

        // Normalize OTP strings (remove any whitespace)
        const storedOTP = user.otp.toString().trim();
        const providedOTP = otp.toString().trim();

        // Check OTP match
        if (storedOTP !== providedOTP) {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }

        // Check if OTP is expired
        if (!user.otpExpiry || user.otpExpiry < Date.now()) {
            // Clear expired OTP
            user.otp = undefined;
            user.otpExpiry = undefined;
            await user.save();
            return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
        }

        // OTP is valid - clear it and generate JWT
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            token,
            role: user.role,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            message: 'Login successful'
        });
    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({ error: 'OTP verification failed.' });
    }
};