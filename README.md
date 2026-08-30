<div align="center">

# 🤖 RASYASPEEDNET BOT

### WhatsApp Bot • Termux • VPS • Pairing Code

[![GitHub](https://img.shields.io/badge/GitHub-RASYASPEEDNET-181717?style=for-the-badge&logo=github)](https://github.com/RASYASPEEDNET/bot)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Bot-25D366?style=for-the-badge&logo=whatsapp)](https://www.whatsapp.com/)
[![Termux](https://img.shields.io/badge/Termux-Android-black?style=for-the-badge&logo=android)]
[![VPS](https://img.shields.io/badge/VPS-Linux-blue?style=for-the-badge&logo=linux)]

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
- [🔄 Update Bot](#-update-bot)
- [🖥️ Install VPS](#️-install-vps)
- [🚀 PM2](#-pm2)
- [🔔 Telegram Notification](#-telegram-notification)
- [📁 Struktur Project](#-struktur-project)
- [🔐 Keamanan GitHub](#-keamanan-github)
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

Command ini otomatis:

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

Karena folder tersebut digunakan untuk menyimpan session koneksi WhatsApp.

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

Semua command berikut dijalankan dari folder bot.

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

# 🔑 PAIRING ULANG / GANTI NOMOR

Jika ingin menghubungkan nomor WhatsApp baru:

```bash
cd ~/bot && rm -rf session && npm start
```

Bot akan meminta:

```text
📱 Masukkan nomor WhatsApp untuk pairing
```

> ⚠️ Perintah ini menghapus session WhatsApp lama.

---

# 🧹 HAPUS SESSION SAJA

Jika ingin menghapus session tanpa langsung menjalankan bot:

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

Jika muncul error:

```text
Cannot find module
```

atau dependency rusak:

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

Install dependency terbaru:

```bash
npm install
```

Jalankan:

```bash
npm start
```

---

# ⚡ UPDATE + START

Semua sekaligus:

```bash
cd ~/bot && git pull && npm install && npm start
```

---

# 🧹 UPDATE TANPA MENGHAPUS SESSION

Gunakan:

```bash
cd ~/bot && git pull && npm install && npm start
```

Session tidak perlu dihapus.

---

# 🗑️ HAPUS BOT

Jika ingin menghapus seluruh bot:

```bash
rm -rf ~/bot
```

> ⚠️ Ini akan menghapus source code, dependency, konfigurasi lokal, dan session yang berada di `~/bot`.

---

# ♻️ INSTALL ULANG DARI AWAL

Jika ingin benar-benar mulai dari awal:

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
| 🔑 Pairing ulang | `cd ~/bot && rm -rf session && npm start` |
| 🧹 Hapus session | `cd ~/bot && rm -rf session` |
| 📦 Install dependency | `cd ~/bot && npm install` |
| 🛠️ Perbaiki dependency | `cd ~/bot && rm -rf node_modules && npm install` |
| 🔄 Update | `cd ~/bot && git pull` |
| ⚡ Update + start | `cd ~/bot && git pull && npm install && npm start` |
| 🗑️ Hapus bot | `rm -rf ~/bot` |
| ♻️ Install ulang | `rm -rf ~/bot && git clone https://github.com/RASYASPEEDNET/bot.git ~/bot && cd ~/bot && npm install && cp -n .env.example .env && npm start` |

---

# 🖥️ INSTALL VPS

Untuk Ubuntu/Debian:

```bash
sudo apt update -y && sudo apt install -y git curl && if [ -d "$HOME/bot/.git" ]; then cd "$HOME/bot" && git pull; elif [ -d "$HOME/bot" ]; then cd "$HOME/bot"; else git clone https://github.com/RASYASPEEDNET/bot.git "$HOME/bot" && cd "$HOME/bot"; fi && bash vps-install.sh && npm start
```

Setelah selesai, bot akan berjalan.

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

## Simpan konfigurasi

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

Contoh alur:

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

Jangan memasukkan token rahasia langsung ke source code.

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

Jika sistem notification server membutuhkan konfigurasi Telegram, simpan:

```text
TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID
```

di server notification dan **jangan masukkan token tersebut ke GitHub**.

---

# 🔒 KEAMANAN TELEGRAM

Struktur yang disarankan:

```text
                    ┌─────────────────┐
                    │  WhatsApp User  │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │    Bot Node.js  │
                    └────────┬────────┘
                             │
                      NOTIFY_URL
                             │
                             ▼
                    ┌─────────────────┐
                    │ Notification    │
                    │ Server          │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Telegram Admin  │
                    └─────────────────┘
```

Dengan cara ini token Telegram tidak perlu disimpan di repository publik.

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
    │
    ├── 📄 README.md
    ├── 📄 .env.example
    ├── 📄 .gitignore
    │
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

> `session/` dibuat otomatis setelah proses pairing dan **tidak boleh di-upload ke repository publik**.

---

# 🔐 KEAMANAN GITHUB

Repository publik harus menggunakan `.gitignore`.

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

# 📄 `.ENV.EXAMPLE`

Contoh isi:

```env
# Notification Server
NOTIFY_URL=
NOTIFY_KEY=

# Session
SESSION_DIR=./session
```

> Jangan masukkan token asli ke `.env.example`.

---

# 🛡️ CONTOH `.GITIGNORE`

Gunakan:

```gitignore
node_modules/
.env
session/
sessions/
auth/
creds/
logs/
*.log
*.tmp
npm-debug.log*
```

---

# 🛠️ TROUBLESHOOTING

## ❌ Cannot find module './message.js'

Pastikan file:

```text
message.js
```

berada di:

```text
~/bot/message.js
```

Cek:

```bash
cd ~/bot
ls -la
```

Harus ada:

```text
index.js
message.js
package.json
```

Jika file masih berbentuk ZIP:

```text
message.js.zip
```

extract terlebih dahulu.

```bash
unzip -o message.js.zip
```

Kemudian:

```bash
npm start
```

---

# ❌ Cannot find module

Jalankan:

```bash
cd ~/bot
rm -rf node_modules
npm install
npm start
```

---

# ❌ `npm start` TIDAK MENJALANKAN BOT

Cek:

```bash
cd ~/bot
cat package.json
```

Pastikan terdapat:

```json
"scripts": {
  "start": "node index.js"
}
```

---

# ❌ SESSION BERMASALAH

Jika koneksi WhatsApp tidak dapat digunakan:

```bash
cd ~/bot
rm -rf session
npm start
```

Kemudian pairing ulang.

> Gunakan perintah ini hanya jika memang siap melakukan pairing kembali.

---

# ❌ WHATSAPP DISCONNECT

Coba:

```bash
cd ~/bot && npm start
```

Jika masih bermasalah:

```bash
cd ~/bot && rm -rf session && npm start
```

---

# ❌ TELEGRAM TIDAK MENERIMA NOTIFIKASI

Periksa:

```text
NOTIFY_URL
NOTIFY_KEY
```

Pastikan notification server aktif.

Periksa juga:

```text
TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID
```

pada server notification.

Jangan memasukkan token Telegram ke GitHub.

---

# 🧹 BERSIHKAN NODE_MODULES

Jika ingin membersihkan dependency:

```bash
cd ~/bot && rm -rf node_modules
```

Kemudian install kembali:

```bash
npm install
```

---

# 🔄 BERSIHKAN SESSION

```bash
cd ~/bot && rm -rf session
```

Kemudian:

```bash
npm start
```

---

# ♻️ RESET BOT

Jika ingin reset dependency + session:

```bash
cd ~/bot && rm -rf node_modules session && npm install && npm start
```

---

# 💥 RESET TOTAL

Jika ingin menghapus seluruh bot:

```bash
rm -rf ~/bot
```

Kemudian install kembali:

```bash
git clone https://github.com/RASYASPEEDNET/bot.git ~/bot
cd ~/bot
npm install
cp -n .env.example .env
npm start
```

---

# 📌 COMMAND PALING PENTING

### 🚀 Install pertama kali

```bash
pkg update -y && pkg upgrade -y && pkg install -y git nodejs python make clang unzip curl && git clone https://github.com/RASYASPEEDNET/bot.git ~/bot && cd ~/bot && bash termux-install.sh && npm start
```

### ▶️ Jalankan

```bash
cd ~/bot && npm start
```

### 🔑 Pairing ulang

```bash
cd ~/bot && rm -rf session && npm start
```

### 🔄 Update

```bash
cd ~/bot && git pull && npm install && npm start
```

### 🛠️ Perbaiki dependency

```bash
cd ~/bot && rm -rf node_modules && npm install && npm start
```

### ♻️ Reset session + dependency

```bash
cd ~/bot && rm -rf node_modules session && npm install && npm start
```

### 🗑️ Hapus bot

```bash
rm -rf ~/bot
```

---

# 🌐 REPOSITORY

```text
https://github.com/RASYASPEEDNET/bot
```

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
║       Telegram Notification          ║
║                                      ║
╚══════════════════════════════════════╝
```

### Made with ❤️ by RASYASPEEDNET

</div>
