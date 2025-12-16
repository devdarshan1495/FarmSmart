# 🚀 EXACT STEPS TO RUN YOUR PROJECT

## ⚠️ Current Issue
Port 5000 is already in use. Let's fix this first.

---

## 🔧 STEP 1: Stop Any Running Processes

Run this command to kill any process using port 5000:
```bash
lsof -ti:5000 | xargs kill -9
```

Or just close any other backend servers you have running.

---

## 📦 STEP 2: Install MongoDB

### Option A: Install MongoDB Locally (Recommended for Mac)

**Install using Homebrew:**
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community@7.0

# Start MongoDB
brew services start mongodb-community@7.0
```

**Or install manually:**
1. Download from: https://www.mongodb.com/try/download/community
2. Follow the installation wizard
3. Start MongoDB:
   ```bash
   mongod --config /usr/local/etc/mongod.conf
   ```

### Option B: Use MongoDB Atlas (Cloud - Easier!)

**If MongoDB local installation is difficult, use cloud:**

1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up for FREE account
3. Create a FREE cluster (M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
6. **Update backend/.env** with this connection string

---

## ⚙️ STEP 3: Configure Backend

### Edit: `backend/.env`

**Current file has:**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/smartfarm
JWT_SECRET=smartfarm_secret_key_2024
WEATHER_API_KEY=get_your_key_from_openweathermap_org
```

**What to change:**

1. **MONGO_URI** - Choose one:
   - **Local MongoDB:** Keep as is: `mongodb://localhost:27017/smartfarm`
   - **MongoDB Atlas:** Replace with your connection string from Atlas

2. **WEATHER_API_KEY** (Optional for now):
   - Get FREE key from: https://openweathermap.org/api
   - Sign up → Copy API key → Paste here
   - **Note:** Can skip for now, weather feature will just not work

**Example with Atlas:**
```env
PORT=5000
MONGO_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/smartfarm?retryWrites=true&w=majority
JWT_SECRET=smartfarm_secret_key_2024
WEATHER_API_KEY=your_api_key_here
```

---

## 🚀 STEP 4: Start Everything

### Open 3 Terminals

**Terminal 1: MongoDB (if using local)**
```bash
# Check if MongoDB is running
brew services list | grep mongodb

# If not running, start it
brew services start mongodb-community@7.0

# Or manually
mongod
```

**Terminal 2: Backend**
```bash
cd /Users/devdarshansaravanan/SFT/PROJECT/SmartFarm/backend
npm start
```

**You should see:**
```
Server running on port 5000
MongoDB Connected Successfully
Database will be auto-created if it does not exist
Auto-irrigation cron job started
```

**Terminal 3: Frontend**
```bash
cd /Users/devdarshansaravanan/SFT/PROJECT/SmartFarm/frontend
npm run dev
```

**You should see:**
```
VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## 🌐 STEP 5: Open Browser

Go to: **http://localhost:5173**

---

## ✅ QUICK TEST

1. **Register:**
   - Name: Test User
   - Email: test@test.com
   - Password: test123
   - Role: farmer
   - Click "Register"

2. **Add Field:**
   - Name: Field 1
   - Location: Chennai
   - Click "Add Field"

3. **Click on Field** → See details

4. **Add Sensor** → Click "Add Sensor"

5. **Submit Reading:**
   - Select sensor
   - Value: 15
   - Click "Submit"
   - See chart appear!

6. **Wait 1 minute** → Field will start irrigating (moisture < 20)

---

## 🐛 TROUBLESHOOTING

### Problem: "Port 5000 already in use"
**Solution:**
```bash
# Kill the process
lsof -ti:5000 | xargs kill -9

# Then restart backend
cd backend
npm start
```

### Problem: "MongoDB connection error"
**Solution:**
```bash
# Check if MongoDB is running
ps aux | grep mongod

# Start MongoDB
brew services start mongodb-community@7.0
# OR
mongod
```

**Or use MongoDB Atlas** (cloud) and update MONGO_URI in backend/.env

### Problem: "Cannot GET /api/..."
**Solution:** Make sure backend is running on port 5000

### Problem: Weather not working
**Solution:** 
1. Get API key: https://openweathermap.org/api
2. Update WEATHER_API_KEY in backend/.env
3. Restart backend

### Problem: Frontend shows blank page
**Solution:**
```bash
# Clear and reinstall
cd frontend
rm -rf node_modules
npm install
npm run dev
```

---

## 📝 SUMMARY OF WHAT YOU NEED TO DO

1. ✅ **Kill port 5000:** `lsof -ti:5000 | xargs kill -9`
2. ✅ **Install MongoDB:** `brew install mongodb-community@7.0` OR use MongoDB Atlas
3. ✅ **Start MongoDB:** `brew services start mongodb-community@7.0`
4. ✅ **Update backend/.env:** Set MONGO_URI (keep local or use Atlas)
5. ✅ **Start backend:** `cd backend && npm start`
6. ✅ **Start frontend:** `cd frontend && npm run dev`
7. ✅ **Open browser:** http://localhost:5173

---

## 🎯 EASIEST PATH (If MongoDB installation is hard)

**Use MongoDB Atlas (Cloud):**

1. Go to: https://mongodb.com/cloud/atlas
2. Sign up (free)
3. Create free cluster (M0)
4. Click "Connect" → Get connection string
5. Update `backend/.env`:
   ```env
   MONGO_URI=mongodb+srv://youruser:yourpass@cluster.mongodb.net/smartfarm
   ```
6. Run: `cd backend && npm start`
7. Run: `cd frontend && npm run dev`
8. Open: http://localhost:5173

---

## 💡 WEATHER API KEY (Optional)

1. Go to: https://openweathermap.org/api
2. Click "Sign Up"
3. Verify email
4. Go to: API Keys section
5. Copy the key
6. Paste in `backend/.env`:
   ```env
   WEATHER_API_KEY=your_copied_key_here
   ```
7. Restart backend: `cd backend && npm start`

**Note:** Free tier keys can take 1-2 hours to activate. Skip for now if needed.

---

## ✨ YOU'RE DONE!

Once you see:
- ✅ Backend: "MongoDB Connected Successfully" + "Server running on port 5000"
- ✅ Frontend: "Local: http://localhost:5173/"

**Open http://localhost:5173 and start using the app!** 🎉
