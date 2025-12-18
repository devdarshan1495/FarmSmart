import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Settings, Plus, Radio, Eye, LogOut } from 'lucide-react';
import './Admin.css';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Only clear auth data, keep user-specific data like linkedFarms
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect to landing page
    navigate('/');
  };

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/farms', label: 'Manage Farms', icon: Settings },
    { path: '/admin/farms/add', label: 'Add Farm', icon: Plus },
    { path: '/admin/sensors/add', label: 'Add Sensor', icon: Radio },
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>SmartFarm</h2>
          <p style={{ margin: '8px 0 0 0', fontSize: '0.85rem', opacity: 0.8 }}>Admin Panel</p>
        </div>
        <nav className="admin-nav">
          {navItems.map(item => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="admin-nav-icon"><IconComponent size={20} strokeWidth={1.5} /></span>
                <span>{item.label}</span>
              </Link>
            );
          })}
          
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '20px 0' }}></div>
          
          <Link to="/dashboard" className="admin-nav-item">
            <span className="admin-nav-icon"><Eye size={20} strokeWidth={1.5} /></span>
            <span>Farmer View</span>
          </Link>
          
          <button 
            onClick={handleLogout}
            className="admin-nav-item logout-btn"
            style={{ 
              width: '100%', 
              border: 'none', 
              background: 'transparent',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <span className="admin-nav-icon"><LogOut size={20} strokeWidth={1.5} /></span>
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
