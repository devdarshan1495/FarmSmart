# Smart Farming MERN Project

A beginner-friendly MERN stack Smart Farming application for college exam demonstration.

## Features

### Backend
- Node.js + Express server
- MongoDB with Mongoose (auto-creates database and collections)
- User authentication with JWT
- Field management with moisture monitoring
- Sensor data ingestion
- Automatic irrigation system (node-cron)
- Weather API integration (OpenWeatherMap)

### Frontend
- React with Vite
- Login/Register page
- Dashboard with field cards
- Field details with sensor readings
- Real-time charts using Recharts
- Weather information display

## Project Structure

```
SmartFarm/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   ├── User.js            # User schema
│   │   ├── Field.js           # Field schema
│   │   ├── Sensor.js          # Sensor schema
│   │   └── Reading.js         # Reading schema
│   ├── routes/
│   │   ├── authRoutes.js      # Login/Register
│   │   ├── fieldRoutes.js     # Field CRUD
│   │   ├── sensorRoutes.js    # Sensor operations
│   │   ├── readingRoutes.js   # Sensor data
│   │   └── weatherRoutes.js   # Weather API
│   ├── utils/
│   │   └── cronJobs.js        # Auto-irrigation logic
│   ├── .env                   # Environment variables
│   ├── package.json
│   └── server.js              # Entry point
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js       # API configuration
    │   ├── components/
    │   │   ├── WeatherCard.jsx
    │   │   └── SensorChart.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── FieldDetails.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env
    └── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed locally OR MongoDB Atlas account
- OpenWeatherMap API key (free from openweathermap.org)

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (`.env` file already created):
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/smartfarm
JWT_SECRET=smartfarm_secret_key_2024
WEATHER_API_KEY=your_openweathermap_api_key
```

**Note:** 
- For local MongoDB: Use `mongodb://localhost:27017/smartfarm`
- For MongoDB Atlas: Use your connection string
- Get Weather API key from: https://openweathermap.org/api

4. Start the backend server:
```bash
npm start
```

Or use nodemon for development:
```bash
npm run dev
```

Server will run on: http://localhost:5000

### Frontend Setup

1. Open new terminal and navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. The `.env` file is already configured:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the frontend:
```bash
npm run dev
```

Frontend will run on: http://localhost:5173

## MongoDB Important Notes

**The database and collections are automatically created by Mongoose!**

- You do NOT need to manually create the database
- Collections (users, fields, sensors, readings) are auto-created when you first save data
- Just make sure MongoDB is running locally or use MongoDB Atlas

### Starting Local MongoDB

**Mac/Linux:**
```bash
mongod
```

**Windows:**
```bash
"C:\Program Files\MongoDB\Server\<version>\bin\mongod.exe"
```

### Using MongoDB Atlas (Cloud)

1. Create account at mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Replace MONGO_URI in backend/.env

## How to Use the Application

### 1. Register/Login
- Open http://localhost:5173
- Register a new account (farmer or expert)
- Login with credentials

### 2. Add Fields
- Click "Add Field" on dashboard
- Enter field name and location
- View all your fields in the grid

### 3. Add Sensors
- Click on a field card
- Click "Add Sensor" button
- Sensor will be added to the field

### 4. Submit Sensor Readings
- Select a sensor from dropdown
- Enter moisture value (0-100)
- Submit reading
- View the chart update automatically

### 5. Auto-Irrigation Feature
- Cron job runs every 1 minute
- If field moisture < 20%, irrigation starts automatically
- Irrigation stops after 2 minutes
- Status visible on field cards

### 6. Weather Information
- Enter city name in weather card
- View temperature, humidity, and conditions
- Updates automatically

## API Endpoints

### Auth
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

### Fields
- GET `/api/fields` - Get all fields
- POST `/api/fields` - Create field
- PUT `/api/fields/:id` - Update field

### Sensors
- POST `/api/sensors` - Create sensor
- GET `/api/sensors/:fieldId` - Get sensors by field

### Readings
- POST `/api/readings` - Submit sensor reading
- GET `/api/readings/:sensorId` - Get readings

### Weather
- GET `/api/weather/:city` - Get weather data

## Technologies Used

### Backend
- Express.js - Web framework
- Mongoose - MongoDB ODM
- bcryptjs - Password hashing
- jsonwebtoken - Authentication
- node-cron - Scheduled tasks
- axios - HTTP client
- dotenv - Environment variables
- cors - Cross-origin requests

### Frontend
- React 19 - UI library
- React Router - Navigation
- Axios - API calls
- Recharts - Data visualization
- Vite - Build tool

## Key Concepts for Viva

1. **MERN Stack**: MongoDB, Express, React, Node.js
2. **RESTful API**: CRUD operations with proper HTTP methods
3. **Authentication**: JWT tokens for secure access
4. **MongoDB**: NoSQL database with Mongoose schemas
5. **Cron Jobs**: Scheduled tasks for automation
6. **API Integration**: Third-party weather service
7. **React Hooks**: useState, useEffect for state management
8. **Component-based Architecture**: Reusable UI components

## Troubleshooting

### MongoDB Connection Error
- Check if MongoDB is running: `mongod`
- Verify MONGO_URI in backend/.env

### Weather API Not Working
- Get API key from openweathermap.org
- Update WEATHER_API_KEY in backend/.env
- Note: Free tier may take 1-2 hours to activate

### Port Already in Use
- Backend: Change PORT in backend/.env
- Frontend: Vite will automatically suggest alternate port

### CORS Error
- Ensure backend is running on port 5000
- Check VITE_API_URL in frontend/.env

## Demo Flow for Exam

1. Show project structure
2. Explain MongoDB auto-creation feature
3. Start backend and frontend
4. Register a user
5. Add a field
6. Add sensor to field
7. Submit readings and show chart
8. Demonstrate auto-irrigation (set moisture < 20)
9. Show weather API integration
10. Explain key code sections

## License

This project is for educational purposes only.

---
**Created by:** Devdarshan
**Purpose:** College Exam Demonstration
