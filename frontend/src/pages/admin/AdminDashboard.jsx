import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wheat, Radio, AlertTriangle, Droplets, Plus, Settings, Eye } from 'lucide-react';
import axios from '../../api/axios';
import './Admin.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalFarms: 0,
    totalSensors: 0,
    activeAlerts: 0,
    irrigating: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [fieldsRes, alertsRes] = await Promise.all([
        axios.get('/fields'),
        axios.get('/alerts')
      ]);

      const fields = fieldsRes.data;
      const alerts = alertsRes.data;

      // Count total sensors
      let totalSensors = 0;
      for (const field of fields) {
        const sensorsRes = await axios.get(`/sensors/${field._id}`);
        totalSensors += sensorsRes.data.length;
      }

      // Count irrigating fields
      const irrigating = fields.filter(f => f.irrigating).length;

      setStats({
        totalFarms: fields.length,
        totalSensors,
        activeAlerts: alerts.length,
        irrigating
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
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
        <h1>Admin Dashboard</h1>
        <div className="admin-header-actions">
          <Link to="/admin/farms/add" className="btn btn-primary">
            + Add New Farm
          </Link>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <div>
              <div className="stat-value">{stats.totalFarms}</div>
              <div className="stat-label">Total Farms</div>
            </div>
            <div className="stat-icon green"><Wheat size={32} strokeWidth={1.5} /></div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div>
              <div className="stat-value">{stats.totalSensors}</div>
              <div className="stat-label">Total Sensors</div>
            </div>
            <div className="stat-icon blue"><Radio size={32} strokeWidth={1.5} /></div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div>
              <div className="stat-value">{stats.activeAlerts}</div>
              <div className="stat-label">Active Alerts</div>
            </div>
            <div className="stat-icon orange"><AlertTriangle size={32} strokeWidth={1.5} /></div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div>
              <div className="stat-value">{stats.irrigating}</div>
              <div className="stat-label">Currently Irrigating</div>
            </div>
            <div className="stat-icon red"><Droplets size={32} strokeWidth={1.5} /></div>
          </div>
        </div>
      </div>

      <div className="admin-section">
        <h3>Quick Actions</h3>
        <div className="quick-actions">
          <Link to="/admin/farms/add" className="quick-action-btn">
            <div className="quick-action-icon"><Plus size={36} strokeWidth={1.5} /></div>
            <div>Add Farm</div>
          </Link>
          <Link to="/admin/sensors/add" className="quick-action-btn">
            <div className="quick-action-icon"><Radio size={36} strokeWidth={1.5} /></div>
            <div>Add Sensor</div>
          </Link>
          <Link to="/admin/farms" className="quick-action-btn">
            <div className="quick-action-icon"><Settings size={36} strokeWidth={1.5} /></div>
            <div>Manage Farms</div>
          </Link>
          <Link to="/dashboard" className="quick-action-btn">
            <div className="quick-action-icon"><Eye size={36} strokeWidth={1.5} /></div>
            <div>Farmer View</div>
          </Link>
        </div>
      </div>

      <div className="admin-section">
        <h3>System Overview</h3>
        <p style={{ color: 'var(--text-muted)' }}>
          Welcome to the SmartFarm Admin Panel. From here you can manage all farms, sensors, and users.
          Use the sidebar to navigate between different sections.
        </p>
      </div>
    </>
  );
};

export default AdminDashboard;
