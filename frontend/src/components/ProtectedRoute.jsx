import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireExpert = false }) => {
  const token = sessionStorage.getItem('token');
  const userStr = sessionStorage.getItem('user');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requireExpert && userStr) {
    const user = JSON.parse(userStr);
    if (user.role !== 'expert') {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
