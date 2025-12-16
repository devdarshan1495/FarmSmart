// Test Script to Add Sample Data
// Run: node testData.js

const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function createSampleData() {
  try {
    console.log('🌱 Creating sample data for Smart Farm...\n');

    // Register a user
    console.log('1. Registering user...');
    const userRes = await axios.post(`${API_URL}/auth/register`, {
      name: 'John Farmer',
      email: 'john@farm.com',
      password: 'password123',
      role: 'farmer'
    });
    console.log('✓ User registered:', userRes.data.user.email);
    
    const token = userRes.data.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };

    // Create fields
    console.log('\n2. Creating fields...');
    const field1 = await axios.post(`${API_URL}/fields`, {
      name: 'Rice Field A',
      location: 'Chennai'
    }, config);
    console.log('✓ Field created:', field1.data.name);

    const field2 = await axios.post(`${API_URL}/fields`, {
      name: 'Wheat Field B',
      location: 'Coimbatore'
    }, config);
    console.log('✓ Field created:', field2.data.name);

    // Create sensors
    console.log('\n3. Creating sensors...');
    const sensor1 = await axios.post(`${API_URL}/sensors`, {
      fieldId: field1.data._id,
      sensorType: 'moisture'
    }, config);
    console.log('✓ Sensor created for:', field1.data.name);

    const sensor2 = await axios.post(`${API_URL}/sensors`, {
      fieldId: field2.data._id,
      sensorType: 'moisture'
    }, config);
    console.log('✓ Sensor created for:', field2.data.name);

    // Add readings
    console.log('\n4. Adding sensor readings...');
    const readings = [25, 30, 28, 22, 18, 15];
    
    for (let value of readings) {
      await axios.post(`${API_URL}/readings`, {
        sensorId: sensor1.data._id,
        value: value
      }, config);
      console.log(`✓ Reading added: ${value}%`);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('\n✅ Sample data created successfully!');
    console.log('\nLogin credentials:');
    console.log('Email: john@farm.com');
    console.log('Password: password123');
    console.log('\nNote: Last reading was 15% (below 20), irrigation should start automatically!');
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data?.message || error.message);
  }
}

createSampleData();
