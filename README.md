# NDZ BOT

WhatsApp Bot berbasis Node.js yang dapat dijalankan di:

- Termux Android
- VPS Ubuntu/Debian
- Server Linux lainnya

Bot menggunakan sistem **WhatsApp Pairing Code**.

Nomor WhatsApp dimasukkan langsung melalui terminal saat pertama kali menjalankan bot.

---

## Fitur

- WhatsApp Pairing Code
- Session tersimpan otomatis
- Tidak perlu memasukkan nomor ke `.env`
- Support Termux
- Support VPS
- Support PM2
- Auto reconnect
- Database lokal
- Environment variable
- Bisa dijalankan dari GitHub

---

# Struktur Project

```text
NDZ-BOT/
│
├── index.js
├── message.js
├── setting.js
├── package.json
├── ecosystem.config.cjs
│
├── .env.example
├── .gitignore
├── README.md
│
├── termux-install.sh
├── vps-install.sh
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
│   ├── database.json
│   └── thumbnail.json
│
├── session/
├── logs/
└── sampah/
