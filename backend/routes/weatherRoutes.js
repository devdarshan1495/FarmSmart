const express = require('express');
const router = express.Router();
const axios = require('axios');

// Get weather by city
router.get('/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const apiKey = process.env.WEATHER_API_KEY;
    
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    // Return only required data
    const weatherData = {
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      condition: response.data.weather[0].description
    };

    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

module.exports = router;
