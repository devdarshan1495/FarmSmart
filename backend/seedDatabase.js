const mongoose = require('mongoose');
const Field = require('./models/Field');
const Sensor = require('./models/Sensor');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/smartfarm')
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

const seedData = async () => {
  try {
    // Clear existing data
    await Field.deleteMany({});
    await Sensor.deleteMany({});
    console.log('Cleared existing data');

    // Create 3 farms with different configurations
    const farm1 = await Field.create({
      farmId: 'FARM001',
      name: 'Green Valley Farm',
      location: 'Sacramento, CA',
      area: '10 acres',
      moisture: 65,
      temperature: 22,
      waterLevel: 'high'
    });

    const farm2 = await Field.create({
      farmId: 'FARM002',
      name: 'Sunny Hills Agriculture',
      location: 'Fresno, CA',
      area: '15 acres',
      moisture: 45,
      temperature: 28,
      waterLevel: 'medium'
    });

    const farm3 = await Field.create({
      farmId: 'FARM003',
      name: 'Riverside Crops',
      location: 'San Diego, CA',
      area: '8 acres',
      moisture: 55,
      temperature: 24,
      waterLevel: 'low'
    });

    console.log('Created 3 farms');

    // FARM001 sensors - 6 sensors (2 of each type) in a 3x2 grid
    const farm1Sensors = [
      { fieldId: farm1._id, sensorType: 'moisture', position: 'A1', lastValue: 65, unit: '%' },
      { fieldId: farm1._id, sensorType: 'moisture', position: 'B1', lastValue: 62, unit: '%' },
      { fieldId: farm1._id, sensorType: 'temperature', position: 'A2', lastValue: 22, unit: '°C' },
      { fieldId: farm1._id, sensorType: 'temperature', position: 'B2', lastValue: 23, unit: '°C' },
      { fieldId: farm1._id, sensorType: 'waterLevel', position: 'C1', lastValue: 85, unit: '%' },
      { fieldId: farm1._id, sensorType: 'waterLevel', position: 'C2', lastValue: 82, unit: '%' }
    ];

    // FARM002 sensors - 9 sensors (3 of each type) in a 3x3 grid
    const farm2Sensors = [
      { fieldId: farm2._id, sensorType: 'moisture', position: 'A1', lastValue: 45, unit: '%' },
      { fieldId: farm2._id, sensorType: 'moisture', position: 'A2', lastValue: 48, unit: '%' },
      { fieldId: farm2._id, sensorType: 'moisture', position: 'A3', lastValue: 42, unit: '%' },
      { fieldId: farm2._id, sensorType: 'temperature', position: 'B1', lastValue: 28, unit: '°C' },
      { fieldId: farm2._id, sensorType: 'temperature', position: 'B2', lastValue: 29, unit: '°C' },
      { fieldId: farm2._id, sensorType: 'temperature', position: 'B3', lastValue: 27, unit: '°C' },
      { fieldId: farm2._id, sensorType: 'waterLevel', position: 'C1', lastValue: 55, unit: '%' },
      { fieldId: farm2._id, sensorType: 'waterLevel', position: 'C2', lastValue: 58, unit: '%' },
      { fieldId: farm2._id, sensorType: 'waterLevel', position: 'C3', lastValue: 52, unit: '%' }
    ];

    // FARM003 sensors - 5 sensors (mixed) in scattered positions
    const farm3Sensors = [
      { fieldId: farm3._id, sensorType: 'moisture', position: 'A1', lastValue: 55, unit: '%' },
      { fieldId: farm3._id, sensorType: 'moisture', position: 'C3', lastValue: 52, unit: '%' },
      { fieldId: farm3._id, sensorType: 'temperature', position: 'B2', lastValue: 24, unit: '°C' },
      { fieldId: farm3._id, sensorType: 'waterLevel', position: 'A3', lastValue: 35, unit: '%' },
      { fieldId: farm3._id, sensorType: 'waterLevel', position: 'C1', lastValue: 38, unit: '%' }
    ];

    await Sensor.insertMany([...farm1Sensors, ...farm2Sensors, ...farm3Sensors]);
    console.log('Created sensors for all farms');
    console.log('FARM001: 6 sensors (2 of each type)');
    console.log('FARM002: 9 sensors (3 of each type)');
    console.log('FARM003: 5 sensors (mixed)');

    console.log('\n✅ Seeding complete!');
    console.log('\nFarm IDs you can use:');
    console.log('- FARM001 (Green Valley Farm)');
    console.log('- FARM002 (Sunny Hills Agriculture)');
    console.log('- FARM003 (Riverside Crops)');
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
