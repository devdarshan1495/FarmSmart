import { useState, useEffect } from 'react';
import api from '../api/axios';
import './WeatherCard.css';

function WeatherCard({ location }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (location) {
      fetchWeather(location);
    }
  }, [location]);

  const fetchWeather = async (city) => {
    try {
      const response = await api.get(`/weather/${city}`);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setWeather(null);
    }
  };

  if (!location) return null;

  return (
    <div className="weather-card">
      <h3>🌤️ Weather - {location}</h3>
      {weather ? (
        <div className="weather-info">
          <div className="weather-item">
            <span className="weather-icon">🌡️</span>
            <div>
              <p className="weather-label">Temperature</p>
              <p className="weather-value">{weather.temperature}°C</p>
            </div>
          </div>
          <div className="weather-item">
            <span className="weather-icon">💧</span>
            <div>
              <p className="weather-label">Humidity</p>
              <p className="weather-value">{weather.humidity}%</p>
            </div>
          </div>
          <div className="weather-item">
            <span className="weather-icon">☁️</span>
            <div>
              <p className="weather-label">Condition</p>
              <p className="weather-value">{weather.condition}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="weather-error">Weather data unavailable. Add API key in backend/.env</p>
      )}
    </div>
  );
}

export default WeatherCard;
