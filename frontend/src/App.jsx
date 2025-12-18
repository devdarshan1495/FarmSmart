import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import FieldDetails from './pages/FieldDetails';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddFarm from './pages/admin/AddFarm';
import AddSensor from './pages/admin/AddSensor';
import FarmManagement from './pages/admin/FarmManagement';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/field/:id" element={<FieldDetails />} />
        
        {/* Admin Routes - Protected and require 'expert' role */}
        <Route path="/admin" element={
          <ProtectedRoute requireExpert={true}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="farms" element={<FarmManagement />} />
          <Route path="farms/add" element={<AddFarm />} />
          <Route path="sensors/add" element={<AddSensor />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
