const Application = require('../models/Application');
const axios = require('axios');

exports.simulatePayment = async (applicationId, milestone, amount) => {
    try {
        const application = await Application.findById(applicationId);
        if (!application) return console.log('Application not found for payment.');

        const RAZORPAY_KEY = process.env.RAZORPAY_KEY_ID;
        const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET;

        const auth = Buffer.from(`${RAZORPAY_KEY}:${RAZORPAY_SECRET}`).toString('base64');

        // Create an order via Razorpay API
        const orderResponse = await axios.post('https://api.razorpay.com/v1/orders', {
            amount: amount * 100, // Amount in paise
            currency: 'INR',
            receipt: `receipt_for_${applicationId}`,
            notes: { milestone: milestone }
        }, {
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/json'
            }
        });

        application.payments.push({
            amount,
            milestone,
            razorpayOrderId: orderResponse.data.id,
            status: 'success', // For simulation, assume success
            timestamp: Date.now()
        });

        application.currentStatus = 'payment_complete';
        await application.save();
        console.log(`Payment simulated successfully for application ${applicationId}. Razorpay Order ID: ${orderResponse.data.id}`);

    } catch (error) {
        console.error('Payment simulation failed:', error.response ? error.response.data : error.message);
    }
};