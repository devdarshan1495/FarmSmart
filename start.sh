#!/bin/bash

# Smart Farm Startup Script
echo "🌱 Starting Smart Farm Application..."

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Check if MongoDB is running
echo -e "${BLUE}Checking MongoDB...${NC}"
if pgrep -x "mongod" > /dev/null; then
    echo -e "${GREEN}✓ MongoDB is running${NC}"
else
    echo -e "${BLUE}Starting MongoDB...${NC}"
    brew services start mongodb-community@7.0
    sleep 3
fi

# Kill any processes on ports 5001 and 5173
echo -e "${BLUE}Cleaning up ports...${NC}"
lsof -ti:5001 | xargs kill -9 2>/dev/null
lsof -ti:5173 | xargs kill -9 2>/dev/null
sleep 1

# Start backend
echo -e "${BLUE}Starting Backend Server...${NC}"
cd "$(dirname "$0")/backend"
node server.js &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend started (PID: $BACKEND_PID)${NC}"

# Wait for backend to be ready
sleep 3

# Start frontend
echo -e "${BLUE}Starting Frontend...${NC}"
cd ../frontend
npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend started (PID: $FRONTEND_PID)${NC}"

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 Smart Farm is Ready!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "  ${BLUE}Backend:${NC}  http://localhost:5001"
echo -e "  ${BLUE}Frontend:${NC} http://localhost:5173"
echo ""
echo -e "${BLUE}Opening browser...${NC}"
sleep 3
open http://localhost:5173

echo ""
echo -e "${RED}Press Ctrl+C to stop all services${NC}"

# Wait for Ctrl+C
trap "echo ''; echo 'Shutting down...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
