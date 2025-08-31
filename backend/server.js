// server.js (main file)

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // If you are using a separate frontend

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Import and use routes
const authRoutes = require('./src/routes/authRoutes');
const govtRoutes = require('./src/routes/govtRoutes');
const startupRoutes = require('./src/routes/startupRoutes');
const auditorRoutes = require('./src/routes/auditorRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/govt', govtRoutes);
app.use('/api/startup', startupRoutes);
app.use('/api/auditor', auditorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});