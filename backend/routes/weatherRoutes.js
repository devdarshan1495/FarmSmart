const express = require('express');
const router = express.Router();
const axios = require('axios');

// Get weather by city
router.get('/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const apiKey = process.env.WEATHER_API_KEY;
    
    // If no API key, return mock data for demo
    if (!apiKey || apiKey === 'get_your_key_from_openweathermap_org') {
      const mockData = {
        temperature: 28,
        humidity: 65,
        condition: 'partly cloudy',
        windSpeed: 12,
        pressure: 1013,
        visibility: 10,
        icon: '02d'
      };
      return res.json(mockData);
    }
    
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    // Return weather data
    const weatherData = {
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      condition: response.data.weather[0].description,
      windSpeed: response.data.wind.speed,
      pressure: response.data.main.pressure,
      visibility: response.data.visibility / 1000,
      icon: response.data.weather[0].icon
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Weather API error:', error.message);
    // Return mock data on error
    res.json({
      temperature: 28,
      humidity: 65,
      condition: 'partly cloudy',
      windSpeed: 12,
      pressure: 1013,
      visibility: 10,
      icon: '02d'
    });
  }
});

module.exports = router;
