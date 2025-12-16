import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import SensorChart from '../components/SensorChart';
import WeatherCard from '../components/WeatherCard';
import SensorMap from '../components/SensorMap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './FieldDetails.css';

function FieldDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [field, setField] = useState(null);
  const [sensors, setSensors] = useState([]);
  const [readings, setReadings] = useState({});
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchFieldDetails();
    fetchSensors();
    fetchAlerts();
    
    const interval = setInterval(() => {
      fetchFieldDetails();
      fetchSensors();
      fetchAlerts();
    }, 10000);
    
    return () => clearInterval(interval);
  }, [id]);

  useEffect(() => {
    if (sensors.length > 0) {
      sensors.forEach(sensor => fetchReadings(sensor._id));
    }
  }, [sensors]);

  const fetchFieldDetails = async () => {
    try {
      const response = await api.get('/fields');
      const foundField = response.data.find(f => f._id === id);
      setField(foundField);
    } catch (error) {
      console.error('Error fetching field:', error);
    }
  };

  const fetchSensors = async () => {
    try {
      const response = await api.get(`/sensors/${id}`);
      setSensors(response.data);
    } catch (error) {
      console.error('Error fetching sensors:', error);
    }
  };

  const fetchReadings = async (sensorId) => {
    try {
      const response = await api.get(`/readings/${sensorId}`);
      setReadings(prev => ({ ...prev, [sensorId]: response.data }));
    } catch (error) {
      console.error('Error fetching readings:', error);
    }
  };

  const fetchAlerts = async () => {
    try {
      const response = await api.get(`/alerts/${id}`);
      setAlerts(response.data);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  const sensorsByType = sensors.reduce((acc, sensor) => {
    if (!acc[sensor.sensorType]) acc[sensor.sensorType] = [];
    acc[sensor.sensorType].push(sensor);
    return acc;
  }, {});

  const createSensorMap = () => {
    const grid = Array(3).fill(null).map(() => Array(3).fill(null));
    sensors.forEach(sensor => {
      const row = sensor.position.charCodeAt(0) - 65;
      const col = parseInt(sensor.position[1]) - 1;
      if (row >= 0 && row < 3 && col >= 0 && col < 3) {
        grid[row][col] = sensor;
      }
    });
    return grid;
  };

  const prepareMasterGraphData = () => {
    const allTimestamps = new Set();
    Object.values(readings).forEach(readingArray => {
      readingArray.forEach(reading => {
        allTimestamps.add(new Date(reading.timestamp).getTime());
      });
    });

    const sortedTimestamps = Array.from(allTimestamps).sort().slice(-20);
    
    return sortedTimestamps.map(timestamp => {
      const dataPoint = { time: new Date(timestamp).toLocaleTimeString() };
      
      sensors.forEach(sensor => {
        const sensorReadings = readings[sensor._id] || [];
        const reading = sensorReadings.find(r => 
          Math.abs(new Date(r.timestamp).getTime() - timestamp) < 5000
        );
        if (reading) {
          dataPoint[`${sensor.sensorType}_${sensor.position}`] = reading.value;
        }
      });
      
      return dataPoint;
    });
  };

  const getSensorColor = (type) => {
    switch(type) {
      case 'moisture': return '#3b82f6';
      case 'temperature': return '#ef4444';
      case 'waterLevel': return '#10b981';
      default: return '#6b7280';
    }
  };

  if (!field) return <div className="loading">Loading farm data...</div>;

  const sensorMap = createSensorMap();
  const masterData = prepareMasterGraphData();

  return (
    <div className="field-details">
      <header>
        <button onClick={() => navigate('/dashboard')}>← Back</button>
        <div className="farm-header">
          <h1>{field.farmId} - {field.name}</h1>
          <p>{field.location} | {field.area}</p>
        </div>
      </header>

      {alerts.length > 0 && (
        <div className="alerts-banner">
          {alerts.slice(0, 3).map((alert) => (
            <div key={alert._id} className={`alert-item ${alert.severity}`}>
              {alert.message}
            </div>
          ))}
        </div>
      )}

      <div className="details-container">
        <div className="stats-row">
          <div className="stat-box">
            <span className="stat-icon">▼</span>
            <div>
              <p className="stat-label">Avg Moisture</p>
              <p className="stat-value">{field.moisture?.toFixed(1) || 0}%</p>
            </div>
          </div>
          <div className="stat-box">
            <span className="stat-icon">●</span>
            <div>
              <p className="stat-label">Avg Temperature</p>
              <p className="stat-value">{field.temperature?.toFixed(1) || 0}°C</p>
            </div>
          </div>
          <div className="stat-box">
            <span className="stat-icon">■</span>
            <div>
              <p className="stat-label">Water Level</p>
              <p className="stat-value">{field.waterLevel}</p>
            </div>
          </div>
          <div className={`stat-box ${field.irrigating ? 'irrigating' : ''}`}>
            <span className="stat-icon">◆</span>
            <div>
              <p className="stat-label">Irrigation</p>
              <p className="stat-value">{field.irrigating ? 'Active' : 'Inactive'}</p>
            </div>
          </div>
        </div>

        <div className="sensor-map-card">
          <h2>Live Sensor Map - Kharghar, Navi Mumbai</h2>
          <SensorMap sensors={sensors} />
          <div className="map-legend">
            <span><span className="legend-box moisture"></span> Moisture</span>
            <span><span className="legend-box temperature"></span> Temperature</span>
            <span><span className="legend-box waterLevel"></span> Water Level</span>
          </div>
        </div>

        {Object.entries(sensorsByType).map(([type, typeSensors]) => (
          <div key={type} className="sensor-table-card">
            <h2>
              {type.charAt(0).toUpperCase() + type.slice(1)} Sensors
            </h2>
            <table className="sensor-table">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Current Value</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {typeSensors.map(sensor => (
                  <tr key={sensor._id}>
                    <td><strong>{sensor.position}</strong></td>
                    <td className="value-cell">
                      {sensor.lastValue?.toFixed(1)}{sensor.unit}
                    </td>
                    <td>
                      <span className="live-badge">
                        <span className="pulse-dot"></span> Live
                      </span>
                    </td>
                    <td>{new Date(sensor.lastUpdated).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        {Object.entries(sensorsByType).map(([type, typeSensors]) => (
          <div key={`graph-${type}`} className="graph-card">
            <h2>{type.charAt(0).toUpperCase() + type.slice(1)} Trend (All Sensors)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="time"
                  type="category"
                  allowDuplicatedCategory={false}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                {typeSensors.map(sensor => {
                  const data = (readings[sensor._id] || []).slice(-20).map(r => ({
                    time: new Date(r.timestamp).toLocaleTimeString(),
                    value: r.value
                  }));
                  return (
                    <Line
                      key={sensor._id}
                      data={data}
                      type="monotone"
                      dataKey="value"
                      name={`${sensor.position} (${sensor.unit})`}
                      stroke={getSensorColor(type)}
                      strokeWidth={2}
                      dot={false}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}

        {sensors.length > 0 && masterData.length > 0 && (
          <div className="graph-card master-graph">
            <h2>Master Graph - All Sensors Combined</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={masterData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                {sensors.map(sensor => (
                  <Line
                    key={sensor._id}
                    type="monotone"
                    dataKey={`${sensor.sensorType}_${sensor.position}`}
                    name={`${sensor.position} ${sensor.sensorType}`}
                    stroke={getSensorColor(sensor.sensorType)}
                    strokeWidth={2}
                    dot={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <WeatherCard location={field.location} />
      </div>
    </div>
  );
}

export default FieldDetails;
