# 🤖 RASYASPEEDNET BOT

WhatsApp Bot yang bisa dijalankan di **Termux Android** maupun **VPS Linux**.

Repository:
https://github.com/RASYASPEEDNET/bot

---

## 📱 INSTALL TERMUX

### 1. Update Termux

```bash
pkg update -y
```

### 2. Upgrade Termux

```bash
pkg upgrade -y
```

### 3. Install Git

```bash
pkg install git -y
```

### 4. Install Node.js

```bash
pkg install nodejs -y
```

### 5. Clone Repository

```bash
git clone https://github.com/RASYASPEEDNET/bot.git
```

### 6. Masuk ke folder bot

```bash
cd bot
```

### 7. Install dependency

```bash
npm install
```

### 8. Jalankan bot

```bash
npm start
```

---

# ⚡ INSTALL CEPAT TERMUX

Kalau ingin install dari awal sekaligus:

```bash
pkg update -y && pkg upgrade -y
```

```bash
pkg install git nodejs -y
```

```bash
git clone https://github.com/RASYASPEEDNET/bot.git
```

```bash
cd bot
```

```bash
npm install
```

```bash
npm start
```

---

# 📲 PAIRING WHATSAPP

Setelah menjalankan:

```bash
npm start
```

Bot akan meminta nomor WhatsApp.

Masukkan dengan format:

```text
628xxxxxxxxxx
```

Contoh:

```text
6281234567890
```

Gunakan format **628...**, bukan:

```text
081234567890
```

dan bukan:

```text
+6281234567890
```

Setelah itu kode pairing akan ditampilkan di terminal.

Di WhatsApp buka:

```text
Perangkat tertaut
→ Tautkan perangkat
→ Tautkan dengan nomor telepon
```

Masukkan kode pairing yang diberikan bot.

---

# 🔄 MENJALANKAN BOT LAGI

Jika sudah pernah pairing:

```bash
cd bot
```

```bash
npm start
```

Session akan digunakan kembali selama folder `session` tidak dihapus.

---

# 🔐 PAIRING ULANG / GANTI NOMOR

Hapus session:

```bash
rm -rf session
```

Kemudian jalankan:

```bash
npm start
```

Masukkan nomor WhatsApp yang baru.

---

# 🖥️ INSTALL VPS

Disarankan menggunakan Ubuntu/Debian.

### 1. Update VPS

```bash
sudo apt update -y
```

### 2. Install Git

```bash
sudo apt install git -y
```

### 3. Install Node.js

```bash
sudo apt install nodejs npm -y
```

### 4. Clone repository

```bash
git clone https://github.com/RASYASPEEDNET/bot.git
```

### 5. Masuk folder

```bash
cd bot
```

### 6. Install dependency

```bash
npm install
```

### 7. Jalankan untuk pairing

```bash
npm start
```

Masukkan nomor WhatsApp ketika diminta.

---

# 🚀 MENJALANKAN DENGAN PM2

Install PM2:

```bash
npm install -g pm2
```

Jalankan bot:

```bash
pm2 start ecosystem.config.cjs
```

Cek status:

```bash
pm2 status
```

Lihat log:

```bash
pm2 logs ndz-bot
```

Simpan konfigurasi:

```bash
pm2 save
```

Aktifkan auto-start setelah VPS reboot:

```bash
pm2 startup
```

Ikuti command yang diberikan PM2, kemudian:

```bash
pm2 save
```

---

# 🔄 UPDATE BOT DARI GITHUB

Masuk folder:

```bash
cd bot
```

Ambil update:

```bash
git pull
```

Install dependency jika ada perubahan:

```bash
npm install
```

Restart bot:

```bash
pm2 restart ndz-bot
```

---

# 🛑 PERINTAH PM2

Cek status:

```bash
pm2 status
```

Lihat log:

```bash
pm2 logs ndz-bot
```

Restart:

```bash
pm2 restart ndz-bot
```

Stop:

```bash
pm2 stop ndz-bot
```

Start:

```bash
pm2 start ndz-bot
```

Hapus proses:

```bash
pm2 delete ndz-bot
```

---

# 📁 STRUKTUR PROJECT

```text
bot/
├── index.js
├── message.js
├── setting.js
├── package.json
├── ecosystem.config.cjs
├── .env.example
├── .gitignore
├── termux-install.sh
├── vps-install.sh
├── README.md
│
├── lib/
│   ├── fakequoted.js
│   ├── indown.js
│   ├── message.js
│   ├── myfunction.js
│   ├── plugins.js
│   ├── serialize.js
│   ├── skrep.js
│   └── ymlConverter.js
│
├── collection/
├── session/
└── logs/
```

---

# 🔒 KEAMANAN

Jangan upload file berikut ke GitHub:

```text
.env
session/
node_modules/
logs/
```

Jangan memasukkan:

```text
API KEY
TOKEN
PASSWORD
COOKIE
SESSION
```

langsung ke source code atau README.

Gunakan `.env` untuk data rahasia.

Contoh:

```bash
cp .env.example .env
```

---

# 🧹 JIKA BOT ERROR

Install ulang dependency:

```bash
rm -rf node_modules
```

```bash
npm install
```

Kemudian:

```bash
npm start
```

Jika masalah berasal dari session:

```bash
rm -rf session
```

Kemudian:

```bash
npm start
```

---

# 📌 REPOSITORY

https://github.com/RASYASPEEDNET/bot

---

## ⭐ Terima kasih

Jangan lupa ⭐ repository jika project ini bermanfaat.
