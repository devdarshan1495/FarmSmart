const axios = require('axios');
const Sensor = require('../models/Sensor');

const API_URL = 'http://localhost:5001/api';

// Generate realistic sensor values
const generateSensorValue = (sensorType, currentValue = 0) => {
  switch (sensorType) {
    case 'moisture':
      // Moisture: 0-100%, tends to decrease over time
      const moistureChange = Math.random() * 10 - 6; // -6 to +4 (tends to decrease)
      return Math.max(0, Math.min(100, currentValue + moistureChange));
    
    case 'temperature':
      // Temperature: 15-40°C with realistic variations
      const tempChange = Math.random() * 4 - 2; // -2 to +2
      return Math.max(15, Math.min(40, currentValue + tempChange || 25 + tempChange));
    
    case 'waterLevel':
      // Water level: 0-100%
      const waterChange = Math.random() * 8 - 5; // -5 to +3 (tends to decrease)
      return Math.max(0, Math.min(100, currentValue + waterChange));
    
    default:
      return 0;
  }
};

// Broadcast sensor readings
const broadcastSensorReadings = async () => {
  try {
    const sensors = await Sensor.find();
    
    if (sensors.length === 0) {
      console.log('No sensors found. Waiting for sensors to be added...');
      return;
    }

    for (const sensor of sensors) {
      // Generate new value based on sensor type and last value
      const newValue = generateSensorValue(sensor.sensorType, sensor.lastValue);
      const roundedValue = Math.round(newValue * 10) / 10;

      // Post reading to API
      try {
        await axios.post(`${API_URL}/readings`, {
          sensorId: sensor._id,
          value: roundedValue
        });
        
        console.log(`📡 ${sensor.sensorType} sensor: ${roundedValue}${sensor.unit || ''}`);
      } catch (error) {
        // Ignore errors during simulation
      }
    }
  } catch (error) {
    console.error('Sensor simulator error:', error.message);
  }
};

// Start sensor simulation
const startSensorSimulation = () => {
  console.log('🚀 Sensor simulator started (broadcasts every 30 seconds)');
  
  // Broadcast immediately
  setTimeout(() => broadcastSensorReadings(), 5000);
  
  // Then broadcast every 30 seconds
  setInterval(broadcastSensorReadings, 30000);
};

module.exports = { startSensorSimulation };
