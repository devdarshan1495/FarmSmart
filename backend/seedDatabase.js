const mongoose = require('mongoose');
const Field = require('./models/Field');
const Sensor = require('./models/Sensor');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Atlas connected for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

const seedData = async () => {
  try {
    // Clear existing data
    await Field.deleteMany({});
    await Sensor.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user (expert role)
    const adminPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'Admin User',
      email: 'admin@smartfarm.com',
      password: adminPassword,
      role: 'expert'
    });
    console.log('Created admin user (admin@smartfarm.com / admin123)');

    // Create regular farmer user
    const farmerPassword = await bcrypt.hash('farmer123', 10);
    await User.create({
      name: 'John Farmer',
      email: 'farmer@smartfarm.com',
      password: farmerPassword,
      role: 'farmer'
    });
    console.log('Created farmer user (farmer@smartfarm.com / farmer123)');

    // Create 3 farms in Kharghar, India with different configurations
    const farm1 = await Field.create({
      farmId: 'FARM001',
      name: 'Green Valley Farm',
      location: 'Kharghar, Navi Mumbai',
      area: '10 acres',
      moisture: 65,
      temperature: 22,
      waterLevel: 'high'
    });

    const farm2 = await Field.create({
      farmId: 'FARM002',
      name: 'Sunny Hills Agriculture',
      location: 'Kharghar, Navi Mumbai',
      area: '15 acres',
      moisture: 45,
      temperature: 28,
      waterLevel: 'medium'
    });

    const farm3 = await Field.create({
      farmId: 'FARM003',
      name: 'Riverside Crops',
      location: 'Kharghar, Navi Mumbai',
      area: '8 acres',
      moisture: 55,
      temperature: 24,
      waterLevel: 'low'
    });

    console.log('Created 3 farms');

    // FARM001 sensors - 6 sensors (2 of each type) with Kharghar coordinates
    const farm1Sensors = [
      { fieldId: farm1._id, sensorType: 'moisture', position: 'A1', lastValue: 65, unit: '%', lat: 19.0426, lng: 73.0652 },
      { fieldId: farm1._id, sensorType: 'moisture', position: 'B1', lastValue: 62, unit: '%', lat: 19.0430, lng: 73.0655 },
      { fieldId: farm1._id, sensorType: 'temperature', position: 'A2', lastValue: 22, unit: '°C', lat: 19.0428, lng: 73.0658 },
      { fieldId: farm1._id, sensorType: 'temperature', position: 'B2', lastValue: 23, unit: '°C', lat: 19.0432, lng: 73.0662 },
      { fieldId: farm1._id, sensorType: 'waterLevel', position: 'C1', lastValue: 85, unit: '%', lat: 19.0424, lng: 73.0665 },
      { fieldId: farm1._id, sensorType: 'waterLevel', position: 'C2', lastValue: 82, unit: '%', lat: 19.0435, lng: 73.0668 }
    ];

    // FARM002 sensors - 9 sensors (3 of each type) with Kharghar coordinates
    const farm2Sensors = [
      { fieldId: farm2._id, sensorType: 'moisture', position: 'A1', lastValue: 45, unit: '%', lat: 19.0450, lng: 73.0680 },
      { fieldId: farm2._id, sensorType: 'moisture', position: 'A2', lastValue: 48, unit: '%', lat: 19.0453, lng: 73.0683 },
      { fieldId: farm2._id, sensorType: 'moisture', position: 'A3', lastValue: 42, unit: '%', lat: 19.0456, lng: 73.0686 },
      { fieldId: farm2._id, sensorType: 'temperature', position: 'B1', lastValue: 28, unit: '°C', lat: 19.0459, lng: 73.0689 },
      { fieldId: farm2._id, sensorType: 'temperature', position: 'B2', lastValue: 29, unit: '°C', lat: 19.0462, lng: 73.0692 },
      { fieldId: farm2._id, sensorType: 'temperature', position: 'B3', lastValue: 27, unit: '°C', lat: 19.0465, lng: 73.0695 },
      { fieldId: farm2._id, sensorType: 'waterLevel', position: 'C1', lastValue: 55, unit: '%', lat: 19.0468, lng: 73.0698 },
      { fieldId: farm2._id, sensorType: 'waterLevel', position: 'C2', lastValue: 58, unit: '%', lat: 19.0471, lng: 73.0701 },
      { fieldId: farm2._id, sensorType: 'waterLevel', position: 'C3', lastValue: 52, unit: '%', lat: 19.0474, lng: 73.0704 }
    ];

    // FARM003 sensors - 5 sensors (mixed) with Kharghar coordinates
    const farm3Sensors = [
      { fieldId: farm3._id, sensorType: 'moisture', position: 'A1', lastValue: 55, unit: '%', lat: 19.0400, lng: 73.0620 },
      { fieldId: farm3._id, sensorType: 'moisture', position: 'C3', lastValue: 52, unit: '%', lat: 19.0405, lng: 73.0625 },
      { fieldId: farm3._id, sensorType: 'temperature', position: 'B2', lastValue: 24, unit: '°C', lat: 19.0410, lng: 73.0630 },
      { fieldId: farm3._id, sensorType: 'waterLevel', position: 'A3', lastValue: 35, unit: '%', lat: 19.0415, lng: 73.0635 },
      { fieldId: farm3._id, sensorType: 'waterLevel', position: 'C1', lastValue: 38, unit: '%', lat: 19.0420, lng: 73.0640 }
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
