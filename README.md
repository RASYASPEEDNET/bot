<div align="center">

# 🤖 RASYASPEEDNET BOT

### WhatsApp Bot • Termux • VPS • Pairing Code

[![GitHub](https://img.shields.io/badge/GitHub-RASYASPEEDNET-181717?style=for-the-badge&logo=github)](https://github.com/RASYASPEEDNET/bot)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Bot-25D366?style=for-the-badge&logo=whatsapp)](https://www.whatsapp.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

**WhatsApp Bot yang dapat dijalankan di Android Termux maupun VPS Linux.**

<br>

<img src="https://raw.githubusercontent.com/RASYASPEEDNET/bot/main/collection/logo.png" width="180">

<br>

### ⚡ INSTALL → PAIRING → ONLINE

</div>

---

## 📋 DAFTAR ISI

- [✨ Fitur](#-fitur)
- [📱 Install Termux](#-install-termux)
- [🔑 Pairing WhatsApp](#-pairing-whatsapp)
- [🖥️ Install VPS](#️-install-vps)
- [🚀 PM2](#-menjalankan-dengan-pm2)
- [🔔 Telegram Notification](#-telegram-notification)
- [🔄 Update Bot](#-update-bot)
- [📁 Struktur Project](#-struktur-project)
- [🔐 Keamanan](#-keamanan)
- [🛠️ Troubleshooting](#️-troubleshooting)
- [⭐ Support](#-support)

---

# ✨ FITUR

| Fitur | Status |
|---|:---:|
| 📱 WhatsApp Pairing Code | ✅ |
| 🤖 WhatsApp Bot | ✅ |
| 📲 Support Termux Android | ✅ |
| 🖥️ Support VPS Linux | ✅ |
| 🔄 Auto Reconnect | ✅ |
| 💾 Session WhatsApp | ✅ |
| 🔔 Telegram Notification | ✅ |
| ⚡ One Command Installer | ✅ |
| 🚀 PM2 Support | ✅ |
| 🧩 Plugin / Library | ✅ |

---

# 📱 INSTALL TERMUX

> **Recommended:** gunakan Termux versi terbaru.

### ⚡ ONE COMMAND INSTALL

Copy **satu command** berikut:

```bash
pkg update -y && pkg upgrade -y && pkg install -y git nodejs python make clang unzip curl && if [ -d "$HOME/bot/.git" ]; then cd "$HOME/bot" && git pull; elif [ -d "$HOME/bot" ]; then cd "$HOME/bot"; else git clone https://github.com/RASYASPEEDNET/bot.git "$HOME/bot" && cd "$HOME/bot"; fi && bash termux-install.sh && npm start
