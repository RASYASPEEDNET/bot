#!/usr/bin/env bash

set -e

echo ""
echo "========================================"
echo "          NDZ BOT - VPS INSTALL         "
echo "========================================"
echo ""

if [ "$(id -u)" -ne 0 ]; then
    echo "❌ Jalankan sebagai root:"
    echo ""
    echo "sudo bash vps-install.sh"
    exit 1
fi

echo "[1/7] Update sistem..."
apt-get update -y

echo ""
echo "[2/7] Install dependency sistem..."
apt-get install -y \
    curl \
    git \
    unzip \
    build-essential \
    python3 \
    ca-certificates

echo ""
echo "[3/7] Memeriksa Node.js..."

NODE_MAJOR=""

if command -v node >/dev/null 2>&1; then
    NODE_MAJOR="$(node -v | sed 's/^v//' | cut -d. -f1)"
fi

if [ -z "$NODE_MAJOR" ] || [ "$NODE_MAJOR" -lt 20 ]; then
    echo "Node.js 20+ diperlukan."

    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

    apt-get install -y nodejs
fi

echo ""
echo "Node.js:"
node -v

echo ""
echo "npm:"
npm -v

echo ""
echo "[4/7] Install dependency Node.js..."
npm install

echo ""
echo "[5/7] Membuat folder runtime..."
mkdir -p session
mkdir -p logs
mkdir -p sampah

echo ""
echo "[6/7] Menyiapkan .env..."

if [ ! -f ".env" ]; then

    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "✓ .env dibuat dari .env.example"
    else
        touch .env
        echo "✓ .env dibuat"
    fi

else

    echo "✓ .env sudah tersedia"
    echo "  File .env tidak diubah."

fi

echo ""
echo "[7/7] Install PM2..."

if ! command -v pm2 >/dev/null 2>&1; then
    npm install -g pm2
else
    echo "✓ PM2 sudah terinstall"
fi

echo ""
echo "========================================"
echo "          INSTALLATION SELESAI          "
echo "========================================"
echo ""

echo "Node.js : $(node -v)"
echo "npm     : $(npm -v)"
echo "PM2     : $(pm2 -v)"
echo ""

echo "Untuk pertama kali menjalankan bot:"
echo ""
echo "    npm start"
echo ""

echo "Bot akan meminta nomor WhatsApp"
echo "dan menampilkan kode pairing."
echo ""

echo "Setelah berhasil pairing, hentikan"
echo "proses dengan CTRL+C lalu jalankan:"
echo ""
echo "    pm2 start ecosystem.config.cjs"
echo "    pm2 save"
echo ""

echo "Cek status:"
echo ""
echo "    pm2 status"
echo ""

echo "Lihat log:"
echo ""
echo "    pm2 logs ndz-bot"
echo ""

echo "========================================"
echo ""
