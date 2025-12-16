import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for different sensor types
const createCustomIcon = (type, emoji) => {
  return L.divIcon({
    html: `<div style="background: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 20px; border: 3px solid ${
      type === 'moisture' ? '#3b82f6' : type === 'temperature' ? '#ef4444' : '#10b981'
    }; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">${emoji}</div>`,
    className: 'custom-sensor-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  });
};

function SensorMap({ sensors }) {
  if (!sensors || sensors.length === 0) {
    return <div className="no-map">No sensor data available for map</div>;
  }

  // Calculate center of all sensors
  const avgLat = sensors.reduce((sum, s) => sum + (s.lat || 0), 0) / sensors.length;
  const avgLng = sensors.reduce((sum, s) => sum + (s.lng || 0), 0) / sensors.length;
  const center = [avgLat || 19.0426, avgLng || 73.0652]; // Default to Kharghar

  const getIcon = (type) => {
    switch(type) {
      case 'moisture': return '▼';
      case 'temperature': return '●';
      case 'waterLevel': return '■';
      default: return '○';
    }
  };

  const getColor = (type) => {
    switch(type) {
      case 'moisture': return '#3b82f6';
      case 'temperature': return '#ef4444';
      case 'waterLevel': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <MapContainer 
      center={center} 
      zoom={16} 
      style={{ height: '500px', width: '100%', borderRadius: '15px' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {sensors.map((sensor) => (
        <Marker
          key={sensor._id}
          position={[sensor.lat, sensor.lng]}
          icon={createCustomIcon(sensor.sensorType, getIcon(sensor.sensorType))}
        >
          <Popup>
            <div style={{ textAlign: 'center' }}>
              <strong>{sensor.position} - {sensor.sensorType}</strong>
              <br />
              <span style={{ fontSize: '18px', color: getColor(sensor.sensorType), fontWeight: 'bold' }}>
                {sensor.lastValue?.toFixed(1)}{sensor.unit}
              </span>
              <br />
              <small>Updated: {new Date(sensor.lastUpdated).toLocaleTimeString()}</small>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default SensorMap;
