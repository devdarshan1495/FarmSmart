#!/bin/bash

# Stop all Smart Farm processes
echo "🛑 Stopping Smart Farm Application..."

# Kill processes on ports
lsof -ti:5001 | xargs kill -9 2>/dev/null
lsof -ti:5173 | xargs kill -9 2>/dev/null

# Kill any node processes running server.js
pkill -f "node server.js" 2>/dev/null

# Kill any npm dev processes
pkill -f "vite" 2>/dev/null

echo "✓ All services stopped"
echo ""
echo "MongoDB is still running. To stop it:"
echo "  brew services stop mongodb-community@7.0"
