#!/data/data/com.termux/files/usr/bin/bash

set -e

echo ""
echo "========================================"
echo "        BOT BY DIN-STORE                "
echo "========================================"
echo ""

echo "[1/6] Update package Termux..."
pkg update -y
pkg upgrade -y

echo ""
echo "[2/6] Install dependency sistem..."
pkg install -y \
    nodejs \
    git \
    python \
    make \
    clang \
    unzip \
    curl

echo ""
echo "[3/6] Cek Node.js..."

node -v
npm -v

echo ""
echo "[4/6] Install dependency Node.js..."

npm install

echo ""
echo "[5/6] Membuat folder runtime..."

mkdir -p session
mkdir -p logs
mkdir -p sampah

echo ""
echo "[6/6] Menyiapkan environment..."

if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "✓ .env dibuat dari .env.example"
    else
        touch .env
        echo "✓ .env dibuat"
    fi
else
    echo "✓ .env sudah ada, tidak diubah"
fi

echo ""
echo "========================================"
echo "          INSTALLATION SELESAI          "
echo "========================================"
echo ""

echo "Untuk menjalankan bot:"
echo ""
echo "    npm start"
echo ""

echo "Jika belum memiliki session,"
echo "bot akan meminta nomor WhatsApp"
echo "untuk mendapatkan kode pairing."
echo ""

echo "Untuk menjalankan mode development:"
echo ""
echo "    npm run dev"
echo ""

echo "========================================"
echo ""
