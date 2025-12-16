import './AlertBanner.css';

function AlertBanner({ alerts }) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="alert-banner">
      <h3>🔔 Recent Alerts</h3>
      <div className="alerts-list">
        {alerts.map((alert) => (
          <div key={alert._id} className={`alert-item ${alert.severity}`}>
            <span className="alert-icon">
              {alert.severity === 'critical' && '🚨'}
              {alert.severity === 'warning' && '⚠️'}
              {alert.severity === 'info' && 'ℹ️'}
            </span>
            <div className="alert-content">
              <p className="alert-message">{alert.message}</p>
              <p className="alert-time">
                {new Date(alert.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlertBanner;
