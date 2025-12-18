import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import './Admin.css';

const AddFarm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    farmId: '',
    name: '',
    location: '',
    area: '',
    moisture: 50,
    temperature: 25,
    waterLevel: 'medium'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateFarmId = () => {
    const timestamp = Date.now().toString().slice(-4);
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    return `FARM${timestamp}${random}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      
      // Generate farmId if not provided
      const dataToSubmit = {
        ...formData,
        farmId: formData.farmId || generateFarmId()
      };

      await axios.post('/fields', dataToSubmit, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Farm created successfully!');
      navigate('/admin/farms');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create farm');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="admin-header">
        <h1>Add New Farm</h1>
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
              Farm ID (Optional - Auto-generated if empty)
            </label>
            <input
              type="text"
              name="farmId"
              value={formData.farmId}
              onChange={handleChange}
              placeholder="e.g., FARM004 (leave empty for auto)"
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 600 }}>
              Farm Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Green Valley Farm"
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 600 }}>
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="e.g., Kharghar, Navi Mumbai"
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 600 }}>
              Area
            </label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="e.g., 10 acres"
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 600 }}>
              Initial Moisture Level (%)
            </label>
            <input
              type="number"
              name="moisture"
              value={formData.moisture}
              onChange={handleChange}
              min="0"
              max="100"
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 600 }}>
              Initial Temperature (°C)
            </label>
            <input
              type="number"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              min="0"
              max="50"
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 600 }}>
              Water Level
            </label>
            <select
              name="waterLevel"
              value={formData.waterLevel}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                border: '2px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem'
              }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
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
              {loading ? 'Creating...' : 'Create Farm'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/farms')}
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

export default AddFarm;
