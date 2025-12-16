import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';
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
      <Navbar />

      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Monitor and manage your linked farms</p>
          </div>
          <div className="user-info">
            <span className="user-name">👤 {user?.name}</span>
            <span className="user-role">{user?.role}</span>
          </div>
        </div>

        <AlertBanner alerts={alerts} />

        <div className="link-farm-section">
          <div className="section-icon">🔗</div>
          <div className="section-content">
            <h2>Link to a Farm</h2>
            <p className="info-text">Enter a Farm ID to monitor its sensors and data in real-time</p>
            <form onSubmit={handleLinkFarm} className="farm-id-form">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Enter Farm ID (e.g., FARM001)"
                  value={farmId}
                  onChange={(e) => setFarmId(e.target.value)}
                  required
                />
                <button type="submit">Link Farm</button>
              </div>
              {error && <p className="error-message">⚠️ {error}</p>}
            </form>
            <div className="available-farms">
              <span className="label">Available Farms:</span>
              <div className="farm-badges">
                <span className="farm-badge" onClick={() => setFarmId('FARM001')}>FARM001</span>
                <span className="farm-badge" onClick={() => setFarmId('FARM002')}>FARM002</span>
                <span className="farm-badge" onClick={() => setFarmId('FARM003')}>FARM003</span>
              </div>
            </div>
          </div>
        </div>

        <div className="linked-farms-section">
          <h2>Your Linked Farms ({linkedFarms.length})</h2>
          {linkedFarms.length === 0 ? (
            <div className="no-farms">
              <div className="no-farms-icon">🏡</div>
              <p>No farms linked yet</p>
              <span>Enter a Farm ID above to get started monitoring</span>
            </div>
          ) : (
            <div className="farms-grid">
              {linkedFarms.map((farm) => (
                <div key={farm.farmId} className="farm-card" onClick={() => navigate(`/field/${farm._id}`)}>
                  <div className="farm-card-header">
                    <div className="farm-id-badge">{farm.farmId}</div>
                    <button 
                      className="remove-btn" 
                      onClick={(e) => { e.stopPropagation(); handleRemoveFarm(farm.farmId); }}
                      title="Remove farm"
                    >
                      ✕
                    </button>
                  </div>
                  <h3>{farm.name}</h3>
                  <p className="location">📍 {farm.location}</p>
                  <p className="area">📏 {farm.area}</p>
                  
                  <div className="farm-stats">
                    <div className="stat">
                      <span className="stat-icon">💧</span>
                      <span className="stat-value">{farm.moisture?.toFixed(1) || 0}%</span>
                      <span className="stat-label">Moisture</span>
                    </div>
                    <div className="stat">
                      <span className="stat-icon">🌡️</span>
                      <span className="stat-value">{farm.temperature?.toFixed(1) || 0}°C</span>
                      <span className="stat-label">Temperature</span>
                    </div>
                    <div className="stat">
                      <span className="stat-icon">💦</span>
                      <span className="stat-value">{farm.waterLevel || 'medium'}</span>
                      <span className="stat-label">Water Level</span>
                    </div>
                  </div>
                  
                  {farm.irrigating && (
                    <div className="irrigation-badge">
                      <span className="pulse-dot"></span>
                      Irrigation Active
                    </div>
                  )}
                  
                  <div className="view-details">View Details →</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
