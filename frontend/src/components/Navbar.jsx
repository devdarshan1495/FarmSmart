import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user') || 'null');

  // Session management - logout on tab close
  useEffect(() => {
    // Transfer from localStorage to sessionStorage on mount (if exists)
    const localUser = localStorage.getItem('user');
    const localToken = localStorage.getItem('token');
    
    if (localUser && localToken && !sessionStorage.getItem('user')) {
      sessionStorage.setItem('user', localUser);
      sessionStorage.setItem('token', localToken);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }

    // Clear session on tab close
    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const handleLogout = () => {
    // Only clear auth data, keep linkedFarms in localStorage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">SmartFarm</span>
        </Link>
        
        <div className="navbar-menu">
          {user ? (
            <>
              {user.role !== 'expert' && (
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
              )}
              {user.role === 'expert' && (
                <Link to="/admin/dashboard" className="nav-btn nav-btn-admin">
                  Admin Panel
                </Link>
              )}
              <button onClick={handleLogout} className="nav-btn nav-btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-btn nav-btn-secondary">
                Login
              </Link>
              <Link to="/signup" className="nav-btn nav-btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
