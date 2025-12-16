# Smart Farming Project - Complete File Structure

## 📁 Project Overview

```
SmartFarm/
├── README.md                 # Complete project documentation
├── QUICKSTART.md            # Quick start guide
│
├── backend/                 # Node.js + Express Backend
│   ├── config/
│   │   └── db.js           # MongoDB connection configuration
│   │
│   ├── models/             # Mongoose Schemas
│   │   ├── User.js         # User model (name, email, password, role)
│   │   ├── Field.js        # Field model (name, location, moisture, irrigating)
│   │   ├── Sensor.js       # Sensor model (fieldId, sensorType, lastValue)
│   │   └── Reading.js      # Reading model (sensorId, value, timestamp)
│   │
│   ├── routes/             # API Routes
│   │   ├── authRoutes.js   # POST /api/auth/register, /login
│   │   ├── fieldRoutes.js  # GET/POST/PUT /api/fields
│   │   ├── sensorRoutes.js # POST/GET /api/sensors
│   │   ├── readingRoutes.js# POST/GET /api/readings
│   │   └── weatherRoutes.js# GET /api/weather/:city
│   │
│   ├── utils/
│   │   └── cronJobs.js     # Auto-irrigation cron job (runs every 1 min)
│   │
│   ├── .env                # Environment variables
│   ├── .env.example        # Example env file
│   ├── .gitignore          # Git ignore file
│   ├── package.json        # Dependencies and scripts
│   ├── server.js           # Main entry point
│   └── testData.js         # Sample data generator
│
└── frontend/               # React + Vite Frontend
    ├── public/             # Static files
    │
    ├── src/
    │   ├── api/
    │   │   └── axios.js    # Axios configuration with interceptors
    │   │
    │   ├── components/     # Reusable Components
    │   │   ├── WeatherCard.jsx      # Weather display component
    │   │   ├── WeatherCard.css
    │   │   ├── SensorChart.jsx      # Line chart using Recharts
    │   │   └── (no CSS - inline in parent)
    │   │
    │   ├── pages/          # Page Components
    │   │   ├── Login.jsx           # Login/Register page
    │   │   ├── Login.css
    │   │   ├── Dashboard.jsx       # Main dashboard with fields
    │   │   ├── Dashboard.css
    │   │   ├── FieldDetails.jsx    # Field details with sensors
    │   │   └── FieldDetails.css
    │   │
    │   ├── App.jsx         # Main app with React Router
    │   ├── App.css         # Global styles
    │   ├── main.jsx        # Entry point
    │   └── index.css       # Base CSS
    │
    ├── .env                # Frontend environment variables
    ├── .gitignore          # Git ignore
    ├── index.html          # HTML template
    ├── package.json        # Dependencies and scripts
    ├── vite.config.js      # Vite configuration
    └── eslint.config.js    # ESLint configuration
```

## 🔧 Backend Files Summary

### Configuration
- **server.js**: Express app setup, middleware (CORS, JSON), route mounting
- **config/db.js**: MongoDB connection with Mongoose (auto-creates database)
- **.env**: Environment variables (PORT, MONGO_URI, JWT_SECRET, WEATHER_API_KEY)

### Models (Mongoose Schemas)
- **User.js**: Authentication (name, email, hashed password, role)
- **Field.js**: Field data (name, location, moisture, irrigation status)
- **Sensor.js**: Sensor info (linked to field, type, last value)
- **Reading.js**: Sensor readings (linked to sensor, value, timestamp)

### Routes (API Endpoints)
- **authRoutes.js**: User registration and login with JWT
- **fieldRoutes.js**: CRUD operations for fields
- **sensorRoutes.js**: Create and retrieve sensors
- **readingRoutes.js**: Submit readings, update sensor and field
- **weatherRoutes.js**: Fetch weather from OpenWeatherMap API

### Utilities
- **cronJobs.js**: Auto-irrigation logic using node-cron
  - Runs every 1 minute
  - Starts irrigation if moisture < 20%
  - Stops after 2 minutes using setTimeout

## 🎨 Frontend Files Summary

### Configuration
- **main.jsx**: React app entry point
- **App.jsx**: React Router setup (/, /dashboard, /field/:id)
- **vite.config.js**: Vite configuration
- **.env**: API URL configuration

### Pages
- **Login.jsx**: Login/Register with toggle, form handling
- **Dashboard.jsx**: Field grid, add field form, weather card
- **FieldDetails.jsx**: Field info, sensors, readings, chart

### Components
- **WeatherCard.jsx**: Fetches and displays weather data
- **SensorChart.jsx**: Line chart using Recharts library

### API
- **axios.js**: Axios instance with token interceptor

## 📦 Dependencies

### Backend
```json
{
  "express": "Server framework",
  "mongoose": "MongoDB ODM",
  "dotenv": "Environment variables",
  "cors": "Cross-origin requests",
  "bcryptjs": "Password hashing",
  "jsonwebtoken": "JWT authentication",
  "node-cron": "Scheduled tasks",
  "axios": "HTTP client"
}
```

### Frontend
```json
{
  "react": "UI library",
  "react-dom": "React rendering",
  "react-router-dom": "Routing",
  "axios": "HTTP client",
  "recharts": "Charts library",
  "vite": "Build tool"
}
```

## 🔑 Key Features

### Auto-Creation of MongoDB
- **No manual database creation needed**
- Mongoose automatically creates 'smartfarm' database
- Collections (users, fields, sensors, readings) auto-created on first save

### Auto-Irrigation System
- Cron job checks fields every 1 minute
- If moisture < 20% and not irrigating:
  - Set irrigating = true
  - Record start time
  - Schedule stop after 2 minutes

### Sensor Data Flow
1. POST /api/readings with sensorId and value
2. Save reading to database
3. Update sensor.lastValue and sensor.lastUpdated
4. Update field.moisture
5. Return success response

### Authentication Flow
1. User registers/logs in
2. Server returns JWT token
3. Frontend stores token in localStorage
4. Axios interceptor adds token to all requests
5. Protected routes verify token

## 🎯 API Endpoints Summary

```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/fields           - Get all fields
POST   /api/fields           - Create field
PUT    /api/fields/:id       - Update field
POST   /api/sensors          - Create sensor
GET    /api/sensors/:fieldId - Get sensors by field
POST   /api/readings         - Submit reading
GET    /api/readings/:sensorId - Get readings
GET    /api/weather/:city    - Get weather data
```

## 🚀 Running the Project

### Start Backend
```bash
cd backend
npm install
npm start
```

### Start Frontend
```bash
cd frontend
npm install
npm run dev
```

### Test with Sample Data
```bash
cd backend
node testData.js
```

## 📊 Database Schema

### users
- _id: ObjectId
- name: String
- email: String (unique)
- password: String (hashed)
- role: String (farmer/expert)
- createdAt: Date
- updatedAt: Date

### fields
- _id: ObjectId
- name: String
- location: String
- moisture: Number
- irrigating: Boolean
- irrigationStartTime: Date
- createdAt: Date
- updatedAt: Date

### sensors
- _id: ObjectId
- fieldId: ObjectId (ref: Field)
- sensorType: String (moisture)
- lastValue: Number
- lastUpdated: Date
- createdAt: Date
- updatedAt: Date

### readings
- _id: ObjectId
- sensorId: ObjectId (ref: Sensor)
- value: Number
- timestamp: Date
- createdAt: Date
- updatedAt: Date

## ✅ All Files Created

**Backend (11 files)**
- server.js
- config/db.js
- models/ (4 files)
- routes/ (5 files)
- utils/cronJobs.js
- .env, .env.example
- package.json
- testData.js

**Frontend (14 files)**
- src/App.jsx, main.jsx
- src/api/axios.js
- src/pages/ (6 files)
- src/components/ (3 files)
- .env
- package.json
- CSS files (5 files)

**Documentation (3 files)**
- README.md
- QUICKSTART.md
- STRUCTURE.md

**Total: 28+ files created!**

---

This is a complete, working MERN project ready for your exam! 🎓✨
