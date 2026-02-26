const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const questionRoutes = require('./routes/questionRoutes');

const app = express();
const PORT = 5001;

const MONGO_URI = 'mongodb://localhost:27017/interview-vault';

app.use(cors());
app.use(express.json());


app.use('/api/questions', questionRoutes);


mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error.message);
    });
