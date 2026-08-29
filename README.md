# 🤖 RASYASPEEDNET BOT

WhatsApp Bot yang bisa dijalankan di **Termux Android** maupun **VPS Linux**.

Repository:
https://github.com/RASYASPEEDNET/bot

---

# 📱 INSTALL TERMUX — SEKALI JALAN

> **Catatan:** Command di bawah otomatis menangani folder `bot` yang sudah ada. Jika folder belum ada, repository akan di-clone. Setelah instalasi selesai, bot **langsung dijalankan** sampai muncul `📱 Masukkan nomor WhatsApp untuk pairing`.

### ⚡ 1 COMMAND LANGSUNG PAIRING

Jalankan command ini dari folder HOME Termux (`~`):

```bash
pkg update -y && pkg upgrade -y && pkg install -y git nodejs python make clang unzip curl && if [ -d "$HOME/bot/.git" ]; then cd "$HOME/bot" && git pull; elif [ -d "$HOME/bot" ]; then cd "$HOME/bot"; else git clone https://github.com/RASYASPEEDNET/bot.git "$HOME/bot" && cd "$HOME/bot"; fi && bash termux-install.sh && npm start
```

### Setelah command selesai

Terminal akan otomatis masuk ke bot dan menjalankan `npm start`.
Jika belum pernah pairing, akan muncul:

```text
📱 Masukkan nomor WhatsApp untuk pairing
Contoh: 6281234567890
Nomor WhatsApp:
```

**Tidak perlu mengetik `cd bot`, `npm install`, atau `npm start` lagi.**

Masukkan nomor dengan format:

```text
628xxxxxxxxxx
```

Contoh:

```text
6281234567890
```

Jangan gunakan:

```text
081234567890
+6281234567890
```

Setelah kode pairing muncul, buka WhatsApp:

```text
Perangkat tertaut
→ Tautkan perangkat
→ Tautkan dengan nomor telepon
```

Masukkan kode pairing yang diberikan bot. Setelah berhasil, bot akan melanjutkan koneksi secara otomatis.

---

# 🔄 MENJALANKAN BOT LAGI

Jika bot sudah pernah pairing dan folder `bot` masih ada:

```bash
cd ~/bot && npm start
```

Session akan digunakan kembali selama folder `session` tidak dihapus.

---

# 🔐 PAIRING ULANG / GANTI NOMOR

Hapus session terlebih dahulu:

```bash
cd ~/bot && rm -rf session && npm start
```

Kemudian masukkan nomor WhatsApp baru.

---

# 🖥️ INSTALL VPS — SEKALI JALAN

Disarankan menggunakan Ubuntu/Debian.

Jika repository belum ada, jalankan:

```bash
sudo apt update -y && sudo apt install -y git curl && if [ -d "$HOME/bot/.git" ]; then cd "$HOME/bot" && git pull; elif [ -d "$HOME/bot" ]; then cd "$HOME/bot"; else git clone https://github.com/RASYASPEEDNET/bot.git "$HOME/bot" && cd "$HOME/bot"; fi && bash vps-install.sh && npm start
```

Setelah itu bot akan otomatis berjalan dan meminta nomor WhatsApp jika belum memiliki session.

---

# 🚀 MENJALANKAN DENGAN PM2

Setelah pairing berhasil:

```bash
npm install -g pm2 && pm2 start ecosystem.config.cjs && pm2 save
```

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

---

# 🔄 UPDATE BOT DARI GITHUB

Termux/VPS:

```bash
cd ~/bot && git pull && npm install && npm start
```

Jika menggunakan PM2:

```bash
cd ~/bot && git pull && npm install && pm2 restart ndz-bot
```

---

# 🛑 PERINTAH PM2

```bash
pm2 status
pm2 logs ndz-bot
pm2 restart ndz-bot
pm2 stop ndz-bot
pm2 start ndz-bot
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

Jangan memasukkan data rahasia seperti:

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
cd ~/bot && rm -rf node_modules && npm install && npm start
```

Jika masalah berasal dari session:

```bash
cd ~/bot && rm -rf session && npm start
```

---

# 📌 REPOSITORY

https://github.com/RASYASPEEDNET/bot

---

## ⭐ Terima kasih

Jangan lupa ⭐ repository jika project ini bermanfaat.
