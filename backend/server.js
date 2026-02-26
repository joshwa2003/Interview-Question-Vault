const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const questionRoutes = require('./routes/questionRoutes');

const app = express();

// ✅ Use environment variable — Render sets PORT automatically
const PORT = process.env.PORT || 5001;

// ✅ Use environment variable — never hardcode MongoDB URI
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/interview-vault';

// ✅ CORS — allow frontend origin from env variable (or all origins in dev)
const allowedOrigin = process.env.FRONTEND_URL || '*';

app.use(cors({
    origin: allowedOrigin,
}));

app.use(express.json());

// ✅ Health check route — useful for Render to verify service is running
app.get('/', (req, res) => {
    res.send('Interview Question Vault API is running ✅');
});

app.use('/api/questions', questionRoutes);

// ✅ Connect to MongoDB, then start server
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('❌ MongoDB connection failed:', error.message);
        process.exit(1);
    });
