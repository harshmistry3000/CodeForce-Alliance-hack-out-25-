// utils/mailService.js
import nodemailer from 'nodemailer';

// Create the transporter object and export it directly
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export default transporter;