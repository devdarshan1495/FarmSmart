import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Droplets, CheckCircle, Plus } from 'lucide-react';
import axios from '../../api/axios';
import './Admin.css';

const FarmManagement = () => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFarms();
  }, []);

  const fetchFarms = async () => {
    try {
      const response = await axios.get('/fields');
      setFarms(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching farms:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}? This will also delete all sensors associated with this farm.`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/fields/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Farm deleted successfully!');
      fetchFarms(); // Refresh list
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete farm');
    }
  };

  if (loading) {
    return (
      <div className="admin-header">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="admin-header">
        <h1>Manage Farms</h1>
        <div className="admin-header-actions">
          <Link to="/admin/farms/add" className="btn btn-primary">
            <Plus size={16} strokeWidth={2} style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }} /> Add New Farm
          </Link>
        </div>
      </div>

      <div className="admin-section">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            fontSize: '0.95rem'
          }}>
            <thead>
              <tr style={{ 
                background: 'var(--bg-light)',
                borderBottom: '2px solid var(--border-color)'
              }}>
                <th style={{ padding: 'var(--spacing-md)', textAlign: 'left' }}>Farm ID</th>
                <th style={{ padding: 'var(--spacing-md)', textAlign: 'left' }}>Name</th>
                <th style={{ padding: 'var(--spacing-md)', textAlign: 'left' }}>Location</th>
                <th style={{ padding: 'var(--spacing-md)', textAlign: 'left' }}>Area</th>
                <th style={{ padding: 'var(--spacing-md)', textAlign: 'left' }}>Moisture</th>
                <th style={{ padding: 'var(--spacing-md)', textAlign: 'left' }}>Status</th>
                <th style={{ padding: 'var(--spacing-md)', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {farms.map(farm => (
                <tr key={farm._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: 'var(--spacing-md)' }}>
                    <strong>{farm.farmId}</strong>
                  </td>
                  <td style={{ padding: 'var(--spacing-md)' }}>{farm.name}</td>
                  <td style={{ padding: 'var(--spacing-md)' }}>{farm.location}</td>
                  <td style={{ padding: 'var(--spacing-md)' }}>{farm.area}</td>
                  <td style={{ padding: 'var(--spacing-md)' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: farm.moisture < 30 ? '#ffebee' : '#e8f5e9',
                      color: farm.moisture < 30 ? '#d32f2f' : '#2e7d32',
                      fontWeight: 600
                    }}>
                      {farm.moisture}%
                    </span>
                  </td>
                  <td style={{ padding: 'var(--spacing-md)' }}>
                    {farm.irrigating ? (
                      <span style={{ color: '#1976d2', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Droplets size={16} strokeWidth={2} /> Irrigating
                      </span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle size={16} strokeWidth={2} /> Normal
                      </span>
                    )}
                  </td>
                  <td style={{ padding: 'var(--spacing-md)' }}>
                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                      <Link 
                        to={`/field/${farm._id}`}
                        style={{
                          padding: '6px 12px',
                          background: 'var(--primary-green)',
                          color: 'white',
                          borderRadius: 'var(--radius-sm)',
                          textDecoration: 'none',
                          fontSize: '0.85rem'
                        }}
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(farm._id, farm.name)}
                        style={{
                          padding: '6px 12px',
                          background: '#d32f2f',
                          color: 'white',
                          border: 'none',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          fontSize: '0.85rem'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {farms.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: 'var(--spacing-xl)',
              color: 'var(--text-muted)'
            }}>
              No farms found. <Link to="/admin/farms/add">Add your first farm</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FarmManagement;
