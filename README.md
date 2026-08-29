# 🤖 DIN BOT

WhatsApp Bot untuk Termux Android dan VPS Linux.

## ⚡ INSTALL SEKALI JALAN — TERMUX

> Jalankan **satu perintah ini** di Termux:

```bash
pkg update -y && pkg upgrade -y && pkg install -y git nodejs python make clang unzip curl && git clone https://github.com/RASYASPEEDNET/bot.git && cd bot && bash termux-install.sh && npm start
```

Setelah selesai, bot langsung berjalan dan akan meminta nomor WhatsApp untuk pairing.

Format nomor:

```text
628xxxxxxxxxx
```

Contoh:

```text
6281234567890
```

Jangan gunakan `0812...` atau `+628...`.

### 📲 Pairing

Setelah nomor dimasukkan, kode pairing akan muncul di terminal.

Di WhatsApp:

```text
Perangkat tertaut
→ Tautkan perangkat
→ Tautkan dengan nomor telepon
```

Masukkan kode yang diberikan bot.

Jika pairing berhasil, bot otomatis tersambung dan siap menerima pesan.

---

## 🖥️ INSTALL SEKALI JALAN — VPS UBUNTU/DEBIAN

Jika file bot sudah ada di VPS:

```bash
sudo bash vps-install.sh
```

Setelah installer selesai, jalankan:

```bash
npm start
```

Bot akan meminta nomor WhatsApp dan menampilkan kode pairing.

### 🚀 Agar bot tetap hidup setelah SSH ditutup

Setelah pairing berhasil:

```bash
pm2 start ecosystem.config.cjs && pm2 save
```

Cek:

```bash
pm2 status
```

Lihat log:

```bash
pm2 logs ndz-bot
```

---

## 🔄 JALANKAN KEMBALI

Jika sudah pernah pairing dan folder `session` masih ada:

```bash
npm start
```

Session akan digunakan kembali sehingga tidak perlu pairing ulang.

---

## 🔐 GANTI NOMOR / PAIRING ULANG

Hapus session:

```bash
rm -rf session
```

Lalu:

```bash
npm start
```

Masukkan nomor WhatsApp baru.

---

## 🧹 JIKA ERROR

Install ulang dependency:

```bash
rm -rf node_modules && npm install && npm start
```

Jika ingin pairing ulang:

```bash
rm -rf session && npm start
```

---

## 📁 STRUKTUR

```text
bot/
├── index.js
├── message.js
├── setting.js
├── package.json
├── ecosystem.config.cjs
├── .env
├── termux-install.sh
├── vps-install.sh
├── README.md
├── lib/
├── collection/
├── session/
└── logs/
```

## 🔒 KEAMANAN

Jangan upload:

```text
.env
session/
node_modules/
logs/
```

Jangan membagikan:

```text
API KEY
TOKEN
PASSWORD
COOKIE
SESSION
```

## ⭐ Repository

https://github.com/RASYASPEEDNET/bot
