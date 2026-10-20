#!/bin/bash
# ==============================================================================
# Valu8er - EC2 Server Setup Script (Ubuntu)
# Run this ONCE on your new EC2 instance to install everything:
# Node.js, Nginx, Git, Certbot (SSL), and configure Nginx for Vue 3 SPA.
# ==============================================================================

set -e

echo ">>> Updating system packages..."
sudo apt update && sudo apt upgrade -y

echo ">>> Installing essential tools (curl, git, ufw)..."
sudo apt install -y curl git ufw

echo ">>> Installing Node.js (LTS version) & npm..."
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v

echo ">>> Installing Nginx..."
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx

echo ">>> Installing Certbot for free SSL (Let's Encrypt)..."
sudo apt install -y certbot python3-certbot-nginx

echo ">>> Configuring Firewall (UFW)..."
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

echo ">>> Setting up web directory: /var/www/valu8er..."
sudo mkdir -p /var/www/valu8er
sudo chown -R $USER:$USER /var/www/valu8er

echo ">>> Configuring Nginx site configuration..."
sudo tee /etc/nginx/sites-available/valu8er > /dev/null << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name valu8er.com www.valu8er.com;

    root /var/www/valu8er/dist;
    index index.html;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript application/json image/svg+xml;

    # Vue Router SPA Fallback (Prevents 404 on refresh)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Static Asset Cache
    location ~* \.(?:css|js|woff2?|ttf|eot|svg|png|jpg|jpeg|gif|ico|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Enable the site and remove default
sudo ln -sf /etc/nginx/sites-available/valu8er /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx syntax
sudo nginx -t
sudo systemctl reload nginx

echo ""
echo "=========================================================="
echo "✅ Server setup complete!"
echo "Next steps:"
echo "1. Clone your repo into /var/www/valu8er"
echo "2. Point your GoDaddy DNS to this EC2 Elastic IP"
echo "3. Run: sudo certbot --nginx -d valu8er.com -d www.valu8er.com"
echo "=========================================================="
