const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const questionRoutes = require('./routes/questionRoutes');

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

// CORS — open by default; lock down by setting CORS_ORIGIN in env
const corsOptions = process.env.CORS_ORIGIN
    ? { origin: process.env.CORS_ORIGIN }
    : {}; // no restriction — allow all origins
app.use(cors(corsOptions));
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
    res.json({ message: 'Public Interview Question Vault API is running ✅' });
});

app.use('/api/questions', questionRoutes);

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    });
