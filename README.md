# 🌾 SmartFarm - Intelligent Agriculture Management System

A modern MERN stack application for precision farming, featuring real-time sensor monitoring, automated irrigation control, and weather integration.

## 📋 Overview

SmartFarm is a comprehensive farm management platform that enables farmers to monitor soil conditions, manage multiple fields, track sensor readings in real-time, and make data-driven decisions for optimal crop yields.

## ✨ Features

### Core Functionality
- **Multi-Field Management**: Monitor and manage multiple farm fields from a single dashboard
- **Real-Time Sensor Monitoring**: Track soil moisture, temperature, pH levels, and more
- **Automated Irrigation Control**: Smart irrigation system based on soil moisture thresholds
- **Weather Integration**: Live weather data for informed decision-making
- **Interactive Data Visualization**: Charts and graphs powered by Recharts
- **Geospatial Mapping**: Location-based field visualization using Leaflet maps
- **Alert System**: Automated alerts for critical sensor readings

### User Experience
- **Modern UI/UX**: Clean, responsive design with custom theme system
- **Secure Authentication**: JWT-based login and registration
- **Real-Time Updates**: Live sensor data with automatic refresh
- **Mobile Responsive**: Works seamlessly across devices

## 🛠️ Technology Stack

### Backend
- **Node.js & Express**: RESTful API server
- **MongoDB Atlas**: Cloud database for scalable data storage
- **Mongoose**: ODM for MongoDB
- **JWT**: Secure authentication
- **Node-Cron**: Automated task scheduling
- **OpenWeatherMap API**: Weather data integration

### Frontend
- **React 19**: Modern UI framework
- **Vite**: Fast build tool and dev server
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Recharts**: Data visualization
- **Leaflet**: Interactive maps
- **CSS Variables**: Custom theme system

## 📁 Project Structure

```
SmartFarm/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB Atlas connection
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Field.js              # Field/Farm schema
│   │   ├── Sensor.js             # Sensor schema
│   │   ├── Reading.js            # Sensor reading schema
│   │   └── Alert.js              # Alert schema
│   ├── routes/
│   │   ├── authRoutes.js         # Authentication endpoints
│   │   ├── fieldRoutes.js        # Field management
│   │   ├── sensorRoutes.js       # Sensor operations
│   │   ├── readingRoutes.js      # Sensor data retrieval
│   │   ├── alertRoutes.js        # Alert management
│   │   └── weatherRoutes.js      # Weather API integration
│   ├── utils/
│   │   ├── cronJobs.js           # Automated irrigation logic
│   │   └── sensorSimulator.js   # Development data simulation
│   ├── seedDatabase.js           # Database seeding script
│   ├── server.js                 # Express server entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js          # Axios configuration
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation component
│   │   │   ├── AlertBanner.jsx   # Alert notifications
│   │   │   ├── SensorChart.jsx   # Data visualization
│   │   │   ├── SensorMap.jsx     # Leaflet map component
│   │   │   └── WeatherCard.jsx   # Weather display
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Landing page
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Signup.jsx        # Registration page
│   │   │   ├── Dashboard.jsx     # Main dashboard
│   │   │   └── FieldDetails.jsx  # Field detail view
│   │   ├── themes/
│   │   │   └── theme.css         # Custom theme variables
│   │   ├── App.jsx               # Main app component
│   │   └── main.jsx              # React entry point
│   ├── package.json
│   └── vite.config.js
│
├── start.sh                      # Startup script
├── stop.sh                       # Cleanup script
└── package.json                  # Root package configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd SmartFarm
```

2. **Install dependencies**
```bash
npm install
```

This will install dependencies for both backend and frontend.

3. **Configure environment variables**

Create a `.env` file in the `backend/` directory:

```env
PORT=5001
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
WEATHER_API_KEY=your_openweathermap_api_key
```

4. **Seed the database** (Optional)
```bash
cd backend
node seedDatabase.js
cd ..
```

This creates sample farms, sensors, and initial data.

5. **Start the application**
```bash
npm start
```

This runs both backend (port 5001) and frontend (port 5173) concurrently.

### Default Login Credentials
- **Email**: admin@smartfarm.com
- **Password**: admin123

## 📊 Database Schema

### Collections

#### Users
- Email, password (hashed), name, role
- JWT authentication

#### Fields
- Farm ID, name, location, area
- Moisture thresholds for irrigation
- Sensor associations

#### Sensors
- Type (moisture, temperature, pH, etc.)
- Field assignment
- Status and calibration data

#### Readings
- Sensor ID, timestamp, value, unit
- Historical data tracking

#### Alerts
- Sensor triggers, severity levels
- Automatic notifications

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Fields
- `GET /api/fields` - Get all fields
- `POST /api/fields` - Create new field
- `GET /api/fields/:id` - Get field details
- `PUT /api/fields/:id` - Update field
- `DELETE /api/fields/:id` - Delete field

### Sensors
- `GET /api/sensors` - Get all sensors
- `POST /api/sensors` - Create sensor
- `GET /api/sensors/field/:fieldId` - Get field sensors

### Readings
- `GET /api/readings/sensor/:sensorId` - Get sensor readings
- `POST /api/readings` - Add new reading

### Weather
- `GET /api/weather/:location` - Get weather data

## 🎨 Theme System

The application uses CSS variables for consistent theming:

```css
--primary-green: #2d5016
--accent-green: #4a7c2c
--bg-white: #ffffff
--text-dark: #2c3e50
```

All colors, spacing, shadows, and transitions are centralized in `/frontend/src/themes/theme.css`.

## 🔄 Automated Features

### Irrigation Control
- Monitors soil moisture every minute
- Triggers irrigation when below threshold
- Automatic system deactivation at safe levels

### Sensor Simulation
- Generates realistic sensor data during development
- Simulates moisture, temperature, and pH variations

## 📱 Screenshots

The application features:
- Responsive landing page with hero section
- Interactive dashboard with farm cards
- Detailed field view with sensor charts
- Real-time alerts and notifications
- Weather integration panel

## 🐛 Development

### Running in Development Mode

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

### Building for Production

```bash
cd frontend
npm run build
```

## 🤝 Contributing

This is an educational project. Feel free to fork and enhance!

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

Developed as a college project demonstrating full-stack MERN development skills.

## 🙏 Acknowledgments

- OpenWeatherMap for weather API
- MongoDB Atlas for cloud database
- React and Vite communities
- Leaflet for mapping capabilities

---

**Note**: This application demonstrates modern web development practices including RESTful API design, responsive UI, real-time data handling, and cloud database integration.
