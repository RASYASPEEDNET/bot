require("dotenv").config();

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const P = require("pino");
const readline = require("readline");
const qrcode = require("qrcode-terminal");

const {
  print,
  sleep
} = require("./lib/myfunction");

const SESSION_DIR = process.env.SESSION_DIR || "./session";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

function normalizeNumber(number) {
  return number
    .replace(/\D/g, "")
    .replace(/^0+/, "");
}

async function getPairingNumber() {
  let number = await ask(
    "\n📱 Masukkan nomor WhatsApp untuk pairing\n" +
    "   Contoh: 6281234567890\n\n" +
    "Nomor WhatsApp: "
  );

  number = normalizeNumber(number);

  if (!number || number.length < 10) {
    console.log("\n❌ Nomor tidak valid.");
    return getPairingNumber();
  }

  return number;
}

async function startBot() {
  try {
    const { state, saveCreds } =
      await useMultiFileAuthState(SESSION_DIR);

    let version;

    try {
      const latest = await fetchLatestBaileysVersion();
      version = latest.version;
    } catch {
      version = [2, 3000, 1015901307];
    }

    const sock = makeWASocket({
      version,
      auth: state,

      logger: P({
        level: process.env.LOG_LEVEL || "silent"
      }),

      printQRInTerminal: false,

      browser: [
        "NDZ BOT",
        "Chrome",
        "1.0.0"
      ],

      generateHighQualityLinkPreview: true,

      markOnlineOnConnect: false,

      syncFullHistory: false
    });

    sock.ev.on("creds.update", saveCreds);

    /*
    ========================================================
    PAIRING
    ========================================================
    */

    if (!sock.authState.creds.registered) {
      const phoneNumber = await getPairingNumber();

      console.log("\n⏳ Meminta kode pairing...");
      console.log("📱 Nomor:", phoneNumber);

      await sleep(3000);

      try {
        const code = await sock.requestPairingCode(phoneNumber);

        const formattedCode =
          code
            ?.match(/.{1,4}/g)
            ?.join("-") || code;

        console.log("\n");
        console.log("╔════════════════════════════════════╗");
        console.log("║          NDZ BOT PAIRING           ║");
        console.log("╠════════════════════════════════════╣");
        console.log(`║  KODE: ${formattedCode.padEnd(26)}║`);
        console.log("╚════════════════════════════════════╝");
        console.log("\n👉 Buka WhatsApp");
        console.log("👉 Perangkat tertaut");
        console.log("👉 Tautkan perangkat");
        console.log("👉 Tautkan dengan nomor telepon");
        console.log(`👉 Masukkan kode: ${formattedCode}`);
        console.log("\n⏳ Menunggu WhatsApp terhubung...\n");

      } catch (error) {
        console.error(
          "\n❌ Gagal mendapatkan kode pairing:"
        );

        console.error(error?.message || error);
      }
    }

    /*
    ========================================================
    CONNECTION
    ========================================================
    */

    sock.ev.on(
      "connection.update",
      async (update) => {
        const {
          connection,
          lastDisconnect,
          qr
        } = update;

        if (qr) {
          console.log("\n📷 QR Code tersedia:\n");
          qrcode.generate(qr, {
            small: true
          });
        }

        if (connection === "connecting") {
          console.log("🔄 Menghubungkan ke WhatsApp...");
        }

        if (connection === "open") {
          console.log("\n");
          console.log("╔════════════════════════════════════╗");
          console.log("║          NDZ BOT ONLINE            ║");
          console.log("╠════════════════════════════════════╣");
          console.log("║  Status : Connected                ║");
          console.log("║  Session: Tersimpan                ║");
          console.log("╚════════════════════════════════════╝");
          console.log("\n✅ Bot siap digunakan.\n");

          rl.close();
        }

        if (connection === "close") {
          const statusCode =
            lastDisconnect?.error?.output?.statusCode;

          const shouldReconnect =
            statusCode !== DisconnectReason.loggedOut;

          console.log("\n❌ Koneksi WhatsApp terputus.");

          if (statusCode) {
            console.log(
              "Status:",
              statusCode
            );
          }

          if (shouldReconnect) {
            console.log(
              "🔄 Mencoba menghubungkan kembali...\n"
            );

            await sleep(5000);

            startBot();
          } else {
            console.log(
              "\n⚠️ Session logout."
            );

            console.log(
              "Hapus folder session kemudian jalankan ulang."
            );

            process.exit(1);
          }
        }
      }
    );

    /*
    ========================================================
    MESSAGE HANDLER
    ========================================================
    */

    try {
      const messageHandler =
        require("./message");

      if (
        typeof messageHandler === "function"
      ) {
        sock.ev.on(
          "messages.upsert",
          async (chatUpdate) => {
            try {
              await messageHandler(
                sock,
                chatUpdate
              );
            } catch (error) {
              console.error(
                "Message handler error:",
                error
              );
            }
          }
        );
      }
    } catch (error) {
      console.log(
        "⚠️ message.js belum aktif:",
        error.message
      );
    }

    return sock;

  } catch (error) {
    console.error(
      "\n❌ Fatal error:",
      error
    );

    process.exit(1);
  }
}

/*
============================================================
START
============================================================
*/

process.on(
  "uncaughtException",
  (error) => {
    console.error(
      "Uncaught Exception:",
      error
    );
  }
);

process.on(
  "unhandledRejection",
  (error) => {
    console.error(
      "Unhandled Rejection:",
      error
    );
  }
);

startBot();
