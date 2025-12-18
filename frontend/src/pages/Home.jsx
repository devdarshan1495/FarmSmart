import { Link } from 'react-router-dom';
import { Radio, Droplets, Map, TrendingUp, Bell, Layers } from 'lucide-react';
import Navbar from '../components/Navbar';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <Navbar />
      
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Smart Farm Monitoring: <span className="gradient-text">Track From Anywhere</span>
            </h1>
            <p className="hero-description">
              Monitor your farms with real-time IoT sensors. Track moisture, temperature, 
              and water levels. Automate irrigation and get instant alerts - all from one dashboard.
            </p>
            <div className="hero-buttons">
              <Link to="/signup" className="btn-primary">
                Get Started
              </Link>
              <Link to="/login" className="btn-secondary">
                Login
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-value">3+</span>
                <span className="stat-label">Active Farms</span>
              </div>
              <div className="stat">
                <span className="stat-value">18</span>
                <span className="stat-label">IoT Sensors</span>
              </div>
              <div className="stat">
                <span className="stat-value">Real-time</span>
                <span className="stat-label">Monitoring</span>
              </div>
            </div>
          </div>
          
          <div className="hero-image">
            <div className="dashboard-preview">
              <div className="preview-header">
                <div className="preview-dot preview-dot-red"></div>
                <div className="preview-dot preview-dot-yellow"></div>
                <div className="preview-dot preview-dot-green"></div>
              </div>
              <div className="preview-content">
                <div className="preview-card">
                  <div className="card-icon"><TrendingUp size={24} strokeWidth={1.5} /></div>
                  <div className="card-title">Analytics</div>
                  <div className="card-graph"></div>
                </div>
                <div className="preview-card">
                  <div className="card-icon"><Droplets size={24} strokeWidth={1.5} /></div>
                  <div className="card-title">Moisture</div>
                  <div className="card-value">45%</div>
                </div>
                <div className="preview-card">
                  <div className="card-icon"><Radio size={24} strokeWidth={1.5} /></div>
                  <div className="card-title">Temperature</div>
                  <div className="card-value">28°C</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features-container">
          <h2 className="section-title">Powerful Features for Smart Farming</h2>
          <p className="section-subtitle">Everything you need to manage your farms efficiently</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><Radio size={40} strokeWidth={1.5} /></div>
              <h3 className="feature-title">Real-time Monitoring</h3>
              <p className="feature-description">
                Track soil moisture, temperature, and water levels with IoT sensors updating every 30 seconds.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon"><Droplets size={40} strokeWidth={1.5} /></div>
              <h3 className="feature-title">Auto Irrigation</h3>
              <p className="feature-description">
                Automatic irrigation triggers when moisture drops below 30%. Save water and optimize crop health.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon"><Map size={40} strokeWidth={1.5} /></div>
              <h3 className="feature-title">Interactive Maps</h3>
              <p className="feature-description">
                Visualize sensor positions on interactive maps with real GPS coordinates from Kharghar.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon"><TrendingUp size={40} strokeWidth={1.5} /></div>
              <h3 className="feature-title">Analytics & Graphs</h3>
              <p className="feature-description">
                View historical data trends with beautiful charts. Track individual sensors or compare all at once.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon"><Bell size={40} strokeWidth={1.5} /></div>
              <h3 className="feature-title">Smart Alerts</h3>
              <p className="feature-description">
                Get instant notifications for critical conditions like low moisture or irrigation status changes.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon"><Layers size={40} strokeWidth={1.5} /></div>
              <h3 className="feature-title">Multiple Farms</h3>
              <p className="feature-description">
                Link and monitor multiple farms from one dashboard. Switch between farms effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Transform Your Farm?</h2>
          <p className="cta-description">
            Join farmers who are already using SmartFarm to increase efficiency and crop yields.
          </p>
          <Link to="/signup" className="cta-button">
            Start Monitoring Now →
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
