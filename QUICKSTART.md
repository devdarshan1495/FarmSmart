# Quick Start Guide - Smart Farming Project

## 🚀 Start the Application

### Step 1: Start MongoDB (if using local MongoDB)
```bash
mongod
```
Leave this terminal running.

### Step 2: Start Backend Server
Open a new terminal:
```bash
cd backend
npm start
```
Backend runs on: http://localhost:5000

### Step 3: Start Frontend
Open another terminal:
```bash
cd frontend
npm run dev
```
Frontend runs on: http://localhost:5173

### Step 4: Open Application
Go to: http://localhost:5173

## 📝 Quick Test Flow

1. **Register**: Create account as "farmer"
2. **Add Field**: Name: "Field 1", Location: "Chennai"
3. **Click Field**: View field details
4. **Add Sensor**: Click "Add Sensor" button
5. **Submit Reading**: 
   - Select sensor
   - Enter value: 15 (to test auto-irrigation)
   - Submit
6. **Watch**: Irrigation starts automatically (moisture < 20)
7. **Check Weather**: Enter city name in dashboard

## ⚙️ Environment Setup

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/smartfarm
JWT_SECRET=smartfarm_secret_key_2024
WEATHER_API_KEY=get_your_key_from_openweathermap_org
```

### Get Weather API Key
1. Go to: https://openweathermap.org/api
2. Sign up for free account
3. Get API key from account dashboard
4. Replace in backend/.env

### MongoDB Options

**Option 1: Local MongoDB**
- Install MongoDB Community Edition
- Run: `mongod`
- Use: `mongodb://localhost:27017/smartfarm`

**Option 2: MongoDB Atlas (Cloud)**
- Create free account: https://www.mongodb.com/cloud/atlas
- Create cluster
- Get connection string
- Replace MONGO_URI in backend/.env

## 🎯 Key Features to Demonstrate

1. ✅ User Registration & Login
2. ✅ Field Management (Add/View)
3. ✅ Sensor Management
4. ✅ Sensor Data Submission
5. ✅ Real-time Charts (Recharts)
6. ✅ Auto-Irrigation (Cron Job)
7. ✅ Weather API Integration
8. ✅ MongoDB Auto-Creation

## 🔧 Troubleshooting

**MongoDB not connecting?**
- Check if mongod is running
- Verify MONGO_URI in .env

**Weather not showing?**
- Add valid API key in .env
- Free tier keys may take 1-2 hours to activate

**Port already in use?**
- Backend: Change PORT in backend/.env
- Frontend: Vite will suggest alternate port

## 📱 Screenshots

### Login Page
- Clean UI with register/login toggle
- Role selection (farmer/expert)

### Dashboard
- Weather card at top
- Add field form
- Field cards grid
- Click card to view details

### Field Details
- Field information
- Sensor list
- Add readings form
- Line chart of readings
- Real-time irrigation status

## 🎓 Exam Talking Points

1. **MERN Stack**: Full-stack JavaScript application
2. **RESTful API**: Standard HTTP methods (GET, POST, PUT)
3. **JWT Authentication**: Secure token-based auth
4. **Mongoose**: Schema validation, auto-creation of DB
5. **React Hooks**: useState, useEffect for state
6. **Component Architecture**: Reusable components
7. **Cron Jobs**: Scheduled automation tasks
8. **External API**: Weather service integration
9. **Charts**: Data visualization with Recharts
10. **Responsive Design**: Clean, modern UI

## 📚 Code Explanation (Viva)

### Backend Key Files
- `server.js`: Express app setup, middleware, routes
- `config/db.js`: MongoDB connection (auto-creates DB)
- `models/*.js`: Mongoose schemas
- `routes/*.js`: API endpoints
- `utils/cronJobs.js`: Auto-irrigation logic

### Frontend Key Files
- `App.jsx`: React Router setup
- `pages/Login.jsx`: Authentication UI
- `pages/Dashboard.jsx`: Main dashboard
- `pages/FieldDetails.jsx`: Detailed view with charts
- `components/SensorChart.jsx`: Recharts integration

## ✨ Auto-Irrigation Logic

```javascript
// Runs every 1 minute
if (field.moisture < 20 && !field.irrigating) {
  // Start irrigation
  field.irrigating = true;
  
  // Stop after 2 minutes
  setTimeout(() => {
    field.irrigating = false;
  }, 2 * 60 * 1000);
}
```

## 🎉 You're Ready!

All dependencies are installed. Just start MongoDB, backend, and frontend!
