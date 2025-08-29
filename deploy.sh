#!/bin/bash

# Configuration
PROJECT_DIR="/home/nwodo/kc-payment-frontend"
REPO_URL="https://github.com/NnaemekaAlgorithim/kc-payment-frontend.git"
BRANCH="main"

# Exit on error
set -e

echo "🔁 Starting frontend deployment..."

# Step 1: Go to project directory
cd "$PROJECT_DIR" || { echo "❌ Failed to navigate to $PROJECT_DIR"; exit 1; }

# Step 2: Pull latest code
echo "📥 Pulling latest code from Git..."
git fetch origin
git checkout "$BRANCH"
git pull origin "$BRANCH" || { echo "❌ Git pull failed"; exit 1; }

# Step 3: Install dependencies
echo "📦 Installing npm dependencies..."
npm install || { echo "❌ npm install failed"; exit 1; }

# Step 4: Build project
sudo chown -R $USER:$USER /home/nwodo/kc-payment-frontend/dist
echo "⚙️ Building frontend with Vite..."
npm run build || { echo "❌ Build failed"; exit 1; }

# Step 5: Set permissions
echo "🔐 Setting permissions for build folder..."
sudo chown -R www-data:www-data dist/
sudo chmod -R 755 dist/

# Step 6: Restart Nginx
echo "🔄 Restarting Nginx..."
sudo systemctl restart nginx || { echo "❌ Failed to restart Nginx"; exit 1; }

echo "✅ Frontend deployed successfully!"
