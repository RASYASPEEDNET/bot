<div align="center">

# 🤖 RASYASPEEDNET BOT

### WhatsApp Bot • Termux • VPS • Pairing Code

[![GitHub](https://img.shields.io/badge/GitHub-RASYASPEEDNET-181717?style=for-the-badge&logo=github)](https://github.com/RASYASPEEDNET/bot)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Bot-25D366?style=for-the-badge&logo=whatsapp)](https://www.whatsapp.com/)
[![Termux](https://img.shields.io/badge/Termux-Android-black?style=for-the-badge&logo=android)](https://termux.dev/)

**WhatsApp Bot yang dapat dijalankan di Android Termux maupun VPS Linux.**

<br>

<img src="https://raw.githubusercontent.com/RASYASPEEDNET/bot/main/collection/logo.png" width="180">

<br><br>

### ⚡ INSTALL → PAIRING → ONLINE

</div>

---

# 📋 DAFTAR ISI

- [✨ Fitur](#-fitur)
- [📱 Install Termux](#-install-termux)
- [🔑 Pairing WhatsApp](#-pairing-whatsapp)
- [🛠️ Perintah Termux](#️-perintah-termux)
- [🔌 Mengatasi Koneksi](#-mengatasi-koneksi-bot)
- [🔄 Update Bot](#-update-bot)
- [🖥️ Install VPS](#️-install-vps)
- [🚀 PM2](#-pm2)
- [🔔 Telegram Notification](#-telegram-notification)
- [📁 Struktur Project](#-struktur-project)
- [🔐 Keamanan](#-keamanan)
- [🛠️ Troubleshooting](#️-troubleshooting)
- [🗑️ Uninstall](#️-uninstall)
- [⭐ Support](#-support)

---

# ✨ FITUR

| Fitur | Status |
|---|:---:|
| 🤖 WhatsApp Bot | ✅ |
| 📱 Pairing Code | ✅ |
| 📲 Termux Android | ✅ |
| 🖥️ VPS Linux | ✅ |
| 🔄 Auto Reconnect | ✅ |
| 💾 Session WhatsApp | ✅ |
| 🔔 Telegram Notification | ✅ |
| ⚡ One Command Installer | ✅ |
| 🚀 PM2 Support | ✅ |
| 🧩 Library / Plugin | ✅ |
| 🔐 `.env` Configuration | ✅ |

---

# 📱 INSTALL TERMUX

> Gunakan Termux versi terbaru.

## ⚡ ONE COMMAND INSTALL

Jalankan dari folder HOME Termux:

```bash
pkg update -y && pkg upgrade -y && pkg install -y git nodejs python make clang unzip curl && if [ -d "$HOME/bot/.git" ]; then cd "$HOME/bot" && git pull; elif [ -d "$HOME/bot" ]; then cd "$HOME/bot"; else git clone https://github.com/RASYASPEEDNET/bot.git "$HOME/bot" && cd "$HOME/bot"; fi && bash termux-install.sh && npm start
```

Command tersebut otomatis:

```text
┌──────────────────────────────────────────┐
│          🤖 RASYASPEEDNET BOT            │
├──────────────────────────────────────────┤
│ ✓ Update package                         │
│ ✓ Install dependency                     │
│ ✓ Clone repository                       │
│ ✓ Update repository                      │
│ ✓ Masuk folder bot                       │
│ ✓ Install Node modules                   │
│ ✓ Menjalankan bot                        │
│ ✓ Memulai proses pairing                 │
└──────────────────────────────────────────┘
```

Jika repository belum ada:

```text
GitHub
  ↓
git clone
  ↓
~/bot
  ↓
install
  ↓
npm start
  ↓
pairing
```

Jika repository sudah ada:

```text
~/bot
  ↓
git pull
  ↓
install/update dependency
  ↓
npm start
```

---

# 🔑 PAIRING WHATSAPP

Jika belum memiliki session, bot akan menampilkan:

```text
╔══════════════════════════════════════╗
║       🤖 RASYASPEEDNET BOT           ║
╚══════════════════════════════════════╝

📱 Masukkan nomor WhatsApp untuk pairing

Contoh: 6281234567890

Nomor WhatsApp:
```

Masukkan nomor dengan format:

```text
628xxxxxxxxxx
```

Contoh:

```text
6281234567890
```

## ❌ Jangan gunakan

```text
081234567890
```

```text
+6281234567890
```

```text
628 1234 5678
```

## ✅ Format yang benar

```text
6281234567890
```

---

# 📲 CARA MEMASUKKAN KODE PAIRING

Setelah nomor dimasukkan, bot akan memberikan kode:

```text
🔑 Kode Pairing: ABCD1234
```

Buka WhatsApp:

```text
WhatsApp
   ↓
Perangkat tertaut
   ↓
Tautkan perangkat
   ↓
Tautkan dengan nomor telepon
   ↓
Masukkan kode pairing
```

Jika berhasil:

```text
╔══════════════════════════════════════╗
║     ✅ WHATSAPP BERHASIL ONLINE      ║
╚══════════════════════════════════════╝

📱 Nomor : 6281234567890

✓ Bot siap digunakan
✓ Session tersimpan
```

---

# 🟢 SETELAH BERHASIL PAIRING

Jangan hapus folder:

```text
session/
```

Session digunakan untuk mempertahankan koneksi WhatsApp.

Jika session masih ada:

```text
npm start
     ↓
session ditemukan
     ↓
mencoba koneksi
     ↓
WhatsApp ONLINE
```

Jika session tidak ada:

```text
npm start
     ↓
session tidak ditemukan
     ↓
📱 meminta nomor
     ↓
🔑 pairing
```

---

# 🛠️ PERINTAH TERMUX

## 📂 Masuk ke folder bot

```bash
cd ~/bot
```

---

## ▶️ Jalankan bot

```bash
cd ~/bot && npm start
```

---

## 🔄 Restart Bot

```bash
cd ~/bot && npm start
```

---

# 🔌 MENGATASI KONEKSI BOT

Jika muncul:

```text
❌ Koneksi WhatsApp terputus.
• Disconnect Reason: 428
```

atau:

```text
❌ Koneksi WhatsApp terputus.
• Disconnect Reason: 408
```

dan bot terus melakukan reconnect, bisa jadi terdapat proses Node.js yang masih berjalan atau lebih dari satu proses bot aktif.

## 🛑 HENTIKAN PROSES NODE.JS

Jalankan:

```bash
pkill -f "node"
```

Kemudian:

```bash
cd ~/bot
npm start
```

### ⚡ SEKALI JALAN

```bash
pkill -f "node" && cd ~/bot && npm start
```

> ⚠️ `pkill -f "node"` akan menghentikan semua proses Node.js yang sedang berjalan di Termux.

---

# 🔑 PAIRING ULANG / GANTI NOMOR

Jika ingin menghubungkan nomor WhatsApp lain:

```bash
cd ~/bot && rm -rf session && npm start
```

Setelah itu bot akan meminta nomor baru.

> ⚠️ Perintah ini menghapus session WhatsApp lama.

---

# 🧹 HAPUS SESSION SAJA

Jika hanya ingin menghapus session:

```bash
cd ~/bot && rm -rf session
```

Kemudian:

```bash
cd ~/bot && npm start
```

---

# 📦 INSTALL DEPENDENCY

Jika dependency belum ter-install:

```bash
cd ~/bot && npm install
```

Kemudian:

```bash
npm start
```

---

# 🛠️ PERBAIKI DEPENDENCY

Jika muncul:

```text
Cannot find module
```

jalankan:

```bash
cd ~/bot && rm -rf node_modules && npm install
```

Kemudian:

```bash
npm start
```

---

# 🔄 UPDATE BOT

Untuk mengambil versi terbaru dari GitHub:

```bash
cd ~/bot && git pull
```

Kemudian:

```bash
npm install
```

Lalu:

```bash
npm start
```

---

# ⚡ UPDATE + START

```bash
cd ~/bot && git pull && npm install && npm start
```

---

# 🛡️ UPDATE TANPA MENGHAPUS SESSION

Gunakan:

```bash
cd ~/bot && git pull && npm install && npm start
```

Session tetap dipertahankan.

---

# 🗑️ HAPUS BOT

Untuk menghapus seluruh bot:

```bash
rm -rf ~/bot
```

> ⚠️ Perintah ini menghapus source code, dependency, `.env`, dan session yang berada di folder `~/bot`.

---

# ♻️ INSTALL ULANG DARI AWAL

```bash
rm -rf ~/bot && git clone https://github.com/RASYASPEEDNET/bot.git ~/bot && cd ~/bot && npm install && cp -n .env.example .env && npm start
```

---

# 📌 CHEAT SHEET TERMUX

| Kebutuhan | Command |
|---|---|
| 📂 Masuk folder | `cd ~/bot` |
| ▶️ Jalankan | `cd ~/bot && npm start` |
| 🔄 Restart | `cd ~/bot && npm start` |
| 🔌 Stop semua Node | `pkill -f "node"` |
| ⚡ Stop + start | `pkill -f "node" && cd ~/bot && npm start` |
| 🔑 Pairing ulang | `cd ~/bot && rm -rf session && npm start` |
| 🧹 Hapus session | `cd ~/bot && rm -rf session` |
| 📦 Install dependency | `cd ~/bot && npm install` |
| 🛠️ Perbaiki dependency | `cd ~/bot && rm -rf node_modules && npm install` |
| 🔄 Update | `cd ~/bot && git pull` |
| ⚡ Update + start | `cd ~/bot && git pull && npm install && npm start` |
| 🗑️ Hapus bot | `rm -rf ~/bot` |

---

# 🖥️ INSTALL VPS

Untuk Ubuntu/Debian:

```bash
sudo apt update -y && sudo apt install -y git curl && if [ -d "$HOME/bot/.git" ]; then cd "$HOME/bot" && git pull; elif [ -d "$HOME/bot" ]; then cd "$HOME/bot"; else git clone https://github.com/RASYASPEEDNET/bot.git "$HOME/bot" && cd "$HOME/bot"; fi && bash vps-install.sh && npm start
```

Jika belum memiliki session:

```text
📱 Masukkan nomor WhatsApp untuk pairing
```

---

# 🚀 PM2

PM2 digunakan agar bot tetap berjalan di background VPS.

## Install PM2

```bash
npm install -g pm2
```

## Jalankan bot

```bash
cd ~/bot
pm2 start ecosystem.config.cjs
```

## Simpan

```bash
pm2 save
```

## Cek status

```bash
pm2 status
```

## Lihat log

```bash
pm2 logs ndz-bot
```

## Restart

```bash
pm2 restart ndz-bot
```

## Stop

```bash
pm2 stop ndz-bot
```

## Start

```bash
pm2 start ndz-bot
```

## Hapus

```bash
pm2 delete ndz-bot
```

---

# 🔄 UPDATE BOT DENGAN PM2

```bash
cd ~/bot && git pull && npm install && pm2 restart ndz-bot
```

---

# 🔔 TELEGRAM NOTIFICATION

Bot dapat menggunakan sistem notifikasi Telegram.

Alur:

```text
┌───────────────────┐
│   👤 Pengguna     │
└─────────┬─────────┘
          │
          │ Pairing
          ▼
┌───────────────────┐
│   🤖 WhatsApp Bot │
└─────────┬─────────┘
          │
          │ Notification
          ▼
┌───────────────────┐
│ 🔔 Notification   │
│      Server       │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│    📱 Telegram    │
│      Admin        │
└───────────────────┘
```

Notifikasi dapat digunakan untuk:

```text
🔔 Pairing dimulai
📱 Nomor WhatsApp
✅ WhatsApp berhasil online
❌ WhatsApp terputus
```

---

# 🔐 KONFIGURASI `.ENV`

Buat `.env` dari template:

```bash
cd ~/bot
cp .env.example .env
```

Edit:

```bash
nano .env
```

Contoh:

```env
NOTIFY_URL=https://server-notifikasi-kamu.example
NOTIFY_KEY=KEY_RAHASIA_KAMU
SESSION_DIR=./session
```

> Jangan upload `.env` ke GitHub.

---

# 🔒 KEAMANAN TELEGRAM

Jika menggunakan Notification Server / Cloudflare Worker, token Telegram sebaiknya disimpan di server notification.

Jangan memasukkan:

```text
TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID
```

ke repository publik.

Struktur:

```text
WhatsApp Bot
      │
      ▼
Notification Server
      │
      ▼
Telegram Admin
```

---

# 📁 STRUKTUR PROJECT

```text
RASYASPEEDNET/
│
└── bot/
    │
    ├── 📄 index.js
    ├── 📄 message.js
    ├── 📄 setting.js
    ├── 📄 package.json
    ├── 📄 ecosystem.config.cjs
    ├── 📄 README.md
    ├── 📄 .env.example
    ├── 📄 .gitignore
    ├── 📄 termux-install.sh
    ├── 📄 vps-install.sh
    │
    ├── 📁 collection/
    │
    ├── 📁 lib/
    │   ├── fakequoted.js
    │   ├── indown.js
    │   ├── message.js
    │   ├── myfunction.js
    │   ├── plugins.js
    │   ├── serialize.js
    │   ├── skrep.js
    │   └── ymlConverter.js
    │
    └── 📁 session/
```

> `session/` dibuat otomatis setelah pairing dan jangan di-upload ke GitHub.

---

# 🔐 KEAMANAN GITHUB

## ❌ JANGAN UPLOAD

```text
.env
session/
sessions/
auth/
creds/
node_modules/
logs/
*.log
```

Jangan memasukkan:

```text
Telegram Bot Token
API Key
Password
Cookie
WhatsApp Session
Private Key
Secret Key
```

ke dalam source code.

---

# ✅ YANG BOLEH DI-UPLOAD

```text
index.js
message.js
setting.js
package.json
ecosystem.config.cjs
.env.example
.gitignore
README.md
termux-install.sh
vps-install.sh
lib/
collection/
```

---

# 🛠️ TROUBLESHOOTING

## ❌ Cannot find module './message.js'

Pastikan:

```text
~/bot/message.js
```

tersedia.

Cek:

```bash
cd ~/bot
ls -la
```

Harus terlihat:

```text
index.js
message.js
package.json
```

Jika file masih:

```text
message.js.zip
```

extract:

```bash
unzip -o message.js.zip
```

Kemudian:

```bash
npm start
```

---

## ❌ Cannot find module

```bash
cd ~/bot
rm -rf node_modules
npm install
npm start
```

---

## ❌ `npm start` tidak berjalan

Periksa:

```bash
cd ~/bot
cat package.json
```

Pastikan terdapat script:

```json
{
  "scripts": {
    "start": "node index.js"
  }
}
```

---

## ❌ 408 / 428

Jika muncul:

```text
Disconnect Reason: 408
```

atau:

```text
Disconnect Reason: 428
```

coba:

```bash
pkill -f "node"
```

kemudian:

```bash
cd ~/bot && npm start
```

Atau langsung:

```bash
pkill -f "node" && cd ~/bot && npm start
```

### ⚠️ Jangan langsung hapus session

Jika bot masih bisa reconnect:

```text
408 / 428
   ↓
reconnect
   ↓
ONLINE
```

**jangan gunakan `rm -rf session` terlebih dahulu.**

Gunakan penghapusan session hanya jika memang ingin pairing ulang atau session sudah rusak.

---

## ❌ Bot terus restart

Cek proses Node:

```bash
ps aux | grep node
```

Hentikan proses:

```bash
pkill -f "node"
```

Kemudian jalankan satu bot saja:

```bash
cd ~/bot && npm start
```

---

## ❌ Telegram tidak menerima notifikasi

Periksa:

```text
NOTIFY_URL
NOTIFY_KEY
```

Pastikan Notification Server aktif.

Jika menggunakan Telegram langsung, periksa:

```text
TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID
```

Jangan memasukkan token Telegram ke repository publik.

---

# 🧹 RESET DEPENDENCY

```bash
cd ~/bot && rm -rf node_modules && npm install && npm start
```

---

# 🔄 RESET SESSION

```bash
cd ~/bot && rm -rf session && npm start
```

Bot akan meminta pairing ulang.

---

# ♻️ RESET BOT

Untuk reset dependency dan session:

```bash
cd ~/bot && rm -rf node_modules session && npm install && npm start
```

---

# 💥 RESET TOTAL

Hapus seluruh bot:

```bash
rm -rf ~/bot
```

Kemudian clone kembali:

```bash
git clone https://github.com/RASYASPEEDNET/bot.git ~/bot
```

Masuk:

```bash
cd ~/bot
```

Install:

```bash
npm install
```

Buat `.env`:

```bash
cp .env.example .env
```

Jalankan:

```bash
npm start
```

---

# 🗑️ UNINSTALL

Jika ingin menghapus bot dari Termux:

```bash
rm -rf ~/bot
```

Jika juga ingin menghapus package yang dipasang khusus untuk bot, hapus sesuai kebutuhan secara manual.

---

# 📌 COMMAND PALING PENTING

### 🚀 Install

```bash
pkg update -y && pkg upgrade -y && pkg install -y git nodejs python make clang unzip curl && if [ -d "$HOME/bot/.git" ]; then cd "$HOME/bot" && git pull; elif [ -d "$HOME/bot" ]; then cd "$HOME/bot"; else git clone https://github.com/RASYASPEEDNET/bot.git "$HOME/bot" && cd "$HOME/bot"; fi && bash termux-install.sh && npm start
```

### ▶️ Start

```bash
cd ~/bot && npm start
```

### 🔌 Perbaiki proses Node

```bash
pkill -f "node" && cd ~/bot && npm start
```

### 🔑 Pairing ulang

```bash
cd ~/bot && rm -rf session && npm start
```

### 🔄 Update

```bash
cd ~/bot && git pull && npm install && npm start
```

### 🛠️ Repair dependency

```bash
cd ~/bot && rm -rf node_modules && npm install && npm start
```

### 🗑️ Hapus bot

```bash
rm -rf ~/bot
```

---

# 🌐 REPOSITORY

<div align="center">

### 🔗 RASYASPEEDNET BOT

https://github.com/RASYASPEEDNET/bot

</div>

---

# ⭐ SUPPORT

Jika project ini bermanfaat, jangan lupa memberikan ⭐ pada repository.

<div align="center">

```text
╔══════════════════════════════════════╗
║                                      ║
║       🤖 RASYASPEEDNET BOT           ║
║                                      ║
║       WhatsApp Automation            ║
║       Termux • VPS • Pairing         ║
║       Telegram Notification           ║
║                                      ║
╚══════════════════════════════════════╝
```

### Made with ❤️ by RASYASPEEDNET

</div>
