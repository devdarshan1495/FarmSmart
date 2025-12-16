const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const cronJobs = require('./utils/cronJobs');
const sensorSimulator = require('./utils/sensorSimulator');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/fields', require('./routes/fieldRoutes'));
app.use('/api/sensors', require('./routes/sensorRoutes'));
app.use('/api/readings', require('./routes/readingRoutes'));
app.use('/api/weather', require('./routes/weatherRoutes'));
app.use('/api/alerts', require('./routes/alertRoutes'));

// Start cron jobs and sensor simulation
cronJobs.startAutoIrrigation();
sensorSimulator.startSensorSimulation();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
