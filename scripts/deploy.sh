#!/bin/bash
# ==============================================================================
# Valu8er - 1-Click Update Script
# Whenever you make changes in GitHub, simply run this file on the server:
# ./deploy.sh
# ==============================================================================

set -e

# Ensure 2GB swap space exists (prevents Out of Memory on 1GB RAM instances)
if ! swapon --show | grep -q '/swapfile'; then
    if [ ! -f /swapfile ]; then
        echo "💾 Creating 2GB swap memory..."
        sudo fallocate -l 2G /swapfile
        sudo chmod 600 /swapfile
        sudo mkswap /swapfile
        echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
    fi
    sudo swapon /swapfile || true
fi

export NODE_OPTIONS="--max-old-space-size=2048"

echo "🚀 Starting Valu8er deployment..."
cd /var/www/valu8er

echo "📥 Pulling latest changes from GitHub..."
git pull origin main

echo "📦 Installing any updated dependencies..."
npm install --no-audit --prefer-offline

echo "🔨 Building Vue 3 + Vite production assets..."
npm run build

echo "🔒 Setting permissions for Nginx..."
sudo chmod -R 755 /var/www/valu8er

echo "🔄 Reloading Nginx web server..."
sudo systemctl reload nginx

echo ""
echo "🎉 SUCCESS: Valu8er is now updated and live at https://valu8er.com!"
echo "Timestamp: $(date)"
