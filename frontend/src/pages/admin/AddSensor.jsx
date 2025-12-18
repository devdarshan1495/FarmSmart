import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import './Admin.css';

const AddSensor = () => {
  const navigate = useNavigate();
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fieldId: '',
    sensorType: 'moisture',
    position: '',
    lat: '',
    lng: ''
  });

  useEffect(() => {
    fetchFarms();
  }, []);

  const fetchFarms = async () => {
    try {
      const response = await axios.get('/fields');
      console.log('Farms fetched:', response.data);
      setFarms(response.data);
      if (response.data.length === 0) {
        setError('No farms found. Please add a farm first.');
      }
    } catch (err) {
      console.error('Error fetching farms:', err);
      setError('Failed to load farms. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      
      await axios.post('/sensors', {
        ...formData,
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng)
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Sensor created successfully!');
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create sensor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="admin-header">
        <h1>Add New Sensor</h1>
      </div>

      <div className="admin-section">
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
          {error && (
            <div style={{ 
              padding: 'var(--spacing-md)', 
              background: '#ffebee', 
              color: '#d32f2f',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--spacing-md)'
            }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 600 }}>
              Select Farm *
            </label>
            <select
              name="fieldId"
              value={formData.fieldId}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem'
              }}
            >
              <option value="">Choose a farm ({farms.length} available)</option>
              {farms.map(farm => (
                <option key={farm._id} value={farm._id}>
                  {farm.name} ({farm.farmId})
                </option>
              ))}
            </select>
            {farms.length === 0 && (
              <p style={{ color: 'var(--status-error)', fontSize: '0.9rem', marginTop: 'var(--spacing-sm)' }}>
                No farms found. Please add a farm first from the sidebar.
              </p>
            )}
          </div>

          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 600 }}>
              Sensor Type *
            </label>
            <select
              name="sensorType"
              value={formData.sensorType}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem'
              }}
            >
              <option value="moisture">Soil Moisture</option>
              <option value="temperature">Temperature</option>
              <option value="waterLevel">Water Level</option>
            </select>
          </div>

          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 600 }}>
              Position (Grid Location)
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="e.g., A1, B2, C3"
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
            <div>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 600 }}>
                Latitude *
              </label>
              <input
                type="number"
                name="lat"
                value={formData.lat}
                onChange={handleChange}
                required
                step="0.0001"
                placeholder="e.g., 19.0426"
                style={{
                  width: '100%',
                  padding: 'var(--spacing-md)',
                  border: '2px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 600 }}>
                Longitude *
              </label>
              <input
                type="number"
                name="lng"
                value={formData.lng}
                onChange={handleChange}
                required
                step="0.0001"
                placeholder="e.g., 73.0652"
                style={{
                  width: '100%',
                  padding: 'var(--spacing-md)',
                  border: '2px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1rem'
                }}
              />
            </div>
          </div>

          <div style={{ 
            padding: 'var(--spacing-md)', 
            background: 'var(--bg-light)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--spacing-lg)',
            fontSize: '0.9rem',
            color: 'var(--text-muted)'
          }}>
            💡 <strong>Tip:</strong> For Kharghar area, use coordinates around:<br/>
            Latitude: 19.04 to 19.05<br/>
            Longitude: 73.06 to 73.07
          </div>

          <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                padding: 'var(--spacing-md) var(--spacing-xl)',
                fontSize: '1rem'
              }}
            >
              {loading ? 'Creating...' : 'Create Sensor'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="btn"
              style={{
                padding: 'var(--spacing-md) var(--spacing-xl)',
                fontSize: '1rem',
                background: 'var(--bg-light)',
                color: 'var(--text-dark)'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddSensor;
