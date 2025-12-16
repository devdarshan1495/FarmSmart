import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import AlertBanner from '../components/AlertBanner';
import './Dashboard.css';

function Dashboard() {
  const [farmId, setFarmId] = useState('');
  const [linkedFarms, setLinkedFarms] = useState([]);
  const [user, setUser] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      navigate('/');
      return;
    }
    setUser(userData);
    
    const savedFarms = JSON.parse(localStorage.getItem('linkedFarms') || '[]');
    setLinkedFarms(savedFarms);
    
    fetchAlerts();
    
    const interval = setInterval(() => {
      fetchAlerts();
      savedFarms.forEach(farm => refreshFarmData(farm));
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  const refreshFarmData = async (farm) => {
    try {
      const response = await api.get(`/fields/farm/${farm.farmId}`);
      setLinkedFarms(prev => prev.map(f => 
        f.farmId === farm.farmId ? { ...f, ...response.data } : f
      ));
    } catch (error) {
      console.error('Error refreshing farm data:', error);
    }
  };

  const fetchAlerts = async () => {
    try {
      const response = await api.get('/alerts');
      setAlerts(response.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  const handleLinkFarm = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await api.get(`/fields/farm/${farmId.toUpperCase()}`);
      const farmData = response.data;
      
      if (linkedFarms.some(f => f.farmId === farmData.farmId)) {
        setError('Farm already linked');
        return;
      }
      
      const updatedFarms = [...linkedFarms, farmData];
      setLinkedFarms(updatedFarms);
      localStorage.setItem('linkedFarms', JSON.stringify(updatedFarms));
      setFarmId('');
    } catch (error) {
      setError('Invalid Farm ID. Try: FARM001, FARM002, or FARM003');
    }
  };

  const handleRemoveFarm = (farmIdToRemove) => {
    const updatedFarms = linkedFarms.filter(f => f.farmId !== farmIdToRemove);
    setLinkedFarms(updatedFarms);
    localStorage.setItem('linkedFarms', JSON.stringify(updatedFarms));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="dashboard">
      <header>
        <h1>🌱 Smart Farm Monitor</h1>
        <div>
          <span>Welcome, {user?.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <AlertBanner alerts={alerts} />

      <div className="link-farm-section">
        <h2>Link to a Farm</h2>
        <p className="info-text">Enter a Farm ID to monitor its sensors and data</p>
        <form onSubmit={handleLinkFarm} className="farm-id-form">
          <input
            type="text"
            placeholder="Enter Farm ID (e.g., FARM001)"
            value={farmId}
            onChange={(e) => setFarmId(e.target.value)}
            required
          />
          <button type="submit">Link Farm</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p className="hint-text">Available Farms: FARM001, FARM002, FARM003</p>
      </div>

      <div className="linked-farms-section">
        <h2>Your Linked Farms</h2>
        {linkedFarms.length === 0 ? (
          <p className="no-farms">No farms linked yet. Enter a Farm ID above to get started.</p>
        ) : (
          <div className="farms-grid">
            {linkedFarms.map((farm) => (
              <div key={farm.farmId} className="farm-card" onClick={() => navigate(`/field/${farm._id}`)}>
                <div className="farm-card-header">
                  <h3>{farm.farmId}</h3>
                  <button 
                    className="remove-btn" 
                    onClick={(e) => { e.stopPropagation(); handleRemoveFarm(farm.farmId); }}
                  >
                    ✕
                  </button>
                </div>
                <h4>{farm.name}</h4>
                <p>📍 {farm.location}</p>
                <p>📐 {farm.area}</p>
                <div className="farm-stats">
                  <div className="stat">
                    <span className="label">Moisture</span>
                    <span className="value">{farm.moisture?.toFixed(1) || 0}%</span>
                  </div>
                  <div className="stat">
                    <span className="label">Temp</span>
                    <span className="value">{farm.temperature?.toFixed(1) || 0}°C</span>
                  </div>
                  <div className="stat">
                    <span className="label">Water</span>
                    <span className="value">{farm.waterLevel || 'medium'}</span>
                  </div>
                </div>
                {farm.irrigating && (
                  <div className="irrigation-badge">💧 Irrigating...</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
