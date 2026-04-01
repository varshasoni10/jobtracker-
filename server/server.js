import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    setInterval(() => console.log('Still alive'), 5000);
};

startServer();
