require("./setting.js");
require("./lib/myfunction.js");
require("./lib/message.js");

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  downloadContentFromMessage,
  jidDecode,
  makeInMemoryStore
} = require("baileys");

const readline = require("readline");
const pino = require("pino");
const fs = require("fs");
const chalk = require("chalk");

const serialize = require("./lib/serialize.js");
const FileType = require("file-type");

global.groupMetadataCache = new Map();

const SESSION_DIR =
  process.env.SESSION_DIR || "./session";

function ask(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function getPairingNumber() {
  while (true) {
    console.log(
      chalk.cyan(
        "\n╭────────────────────────────────────╮"
      )
    );

    console.log(
      chalk.cyan(
        "│        WHATSAPP PAIRING NDZ BOT    │"
      )
    );

    console.log(
      chalk.cyan(
        "╰────────────────────────────────────╯"
      )
    );

    console.log(
      chalk.yellow(
        "\nMasukkan nomor WhatsApp untuk pairing."
      )
    );

    console.log(
      chalk.gray(
        "Contoh: 6281234567890"
      )
    );

    console.log(
      chalk.gray(
        "Gunakan format negara, tanpa +, spasi, atau -.\n"
      )
    );

    let number = await ask(
      chalk.white("Nomor WhatsApp: ")
    );

    number = number.replace(/\D/g, "");

    if (!number || number.length < 10) {
      console.log(
        chalk.red(
          "\n❌ Nomor WhatsApp tidak valid."
        )
      );

      continue;
    }

    return number;
  }
}

async function startBot() {
  try {
    const store = makeInMemoryStore({
      logger: pino().child({
        level: "silent",
        stream: "store"
      })
    });

    const {
      state,
      saveCreds
    } = await useMultiFileAuthState(
      SESSION_DIR
    );

    const {
      version
    } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
      version,

      auth: state,

      printQRInTerminal: false,

      logger: pino({
        level: "silent"
      }),

      generateHighQualityLinkPreview: true,

      browser: [
        "NDZ BOT",
        "Chrome",
        "1.0.0"
      ],

      getMessage: async (key) => {
        if (!store) return undefined;

        const msg =
          await store.loadMessage(
            key.remoteJid,
            key.id
          );

        return msg?.message || undefined;
      },

      cachedGroupMetadata: async (jid) => {
        if (
          !global.groupMetadataCache.has(jid)
        ) {
          const metadata =
            await sock
              .groupMetadata(jid)
              .catch(() => null);

          if (metadata) {
            global.groupMetadataCache.set(
              jid,
              metadata
            );
          }

          return metadata;
        }

        return global.groupMetadataCache.get(jid);
      }
    });

    /*
    ========================================================
    PAIRING
    ========================================================
    */

    if (!sock.authState.creds.registered) {
      const pairingNumber =
        await getPairingNumber();

      console.log(
        chalk.white(
          "\n⏳ Meminta kode pairing..."
        )
      );

      await new Promise((resolve) =>
        setTimeout(resolve, 2000)
      );

      try {
        const code =
          await sock.requestPairingCode(
            pairingNumber
          );

        console.log(
          chalk.green(
            "\n╭────────────────────────────────────╮"
          )
        );

        console.log(
          chalk.green(
            `│  KODE PAIRING: ${code}          │`
          )
        );

        console.log(
          chalk.green(
            "╰────────────────────────────────────╯"
          )
        );

        console.log(
          chalk.yellow(
            "\nBuka WhatsApp → Perangkat tertaut"
          )
        );

        console.log(
          chalk.yellow(
            "→ Tautkan perangkat → Tautkan dengan nomor telepon"
          )
        );

        console.log(
          chalk.gray(
            "\nMasukkan kode pairing tersebut."
          )
        );

        console.log(
          chalk.gray(
            "⏳ Menunggu WhatsApp terhubung...\n"
          )
        );
      } catch (error) {
        console.log(
          chalk.red(
            "\n❌ Gagal meminta kode pairing:"
          )
        );

        console.log(
          error?.message || error
        );

        return;
      }
    }

    /*
    ========================================================
    SAVE SESSION
    ========================================================
    */

    sock.ev.on(
      "creds.update",
      saveCreds
    );

    store.bind(sock.ev);

    /*
    ========================================================
    CONNECTION
    ========================================================
    */

    sock.ev.on(
      "connection.update",
      async ({
        connection,
        lastDisconnect
      }) => {

        if (connection === "connecting") {
          console.log(
            chalk.yellow(
              "🔄 Menghubungkan ke WhatsApp..."
            )
          );
        }

        if (connection === "open") {
          const botNumber =
            sock?.user?.id
              ?.split(":")[0] +
            "@s.whatsapp.net";

          console.log("\n");

          console.log(
            chalk.green(
              "╭────────────────────────────────────╮"
            )
          );

          console.log(
            chalk.green(
              "│          NDZ BOT ONLINE             │"
            )
          );

          console.log(
            chalk.green(
              "╰────────────────────────────────────╯"
            )
          );

          console.log(
            chalk.white(
              `\n• Nama     : ${
                sock?.user?.name ||
                "Tidak terdeteksi"
              }`
            )
          );

          console.log(
            chalk.white(
              `• WhatsApp : ${
                botNumber.split("@")[0]
              }`
            )
          );

          console.log(
            chalk.green(
              "• Status   : Connected"
            )
          );

          console.log(
            chalk.green(
              "\n✅ Bot siap digunakan.\n"
            )
          );
        }

        if (connection === "close") {
          const reason =
            lastDisconnect
              ?.error
              ?.output
              ?.statusCode;

          if (
            reason ===
            DisconnectReason.loggedOut
          ) {
            console.log(
              chalk.red(
                "\n❌ WhatsApp logout."
              )
            );

            console.log(
              chalk.yellow(
                `Hapus ${SESSION_DIR} kemudian jalankan npm start lagi.`
              )
            );

            return;
          }

          console.log(
            chalk.yellow(
              "\n⚠️ Koneksi terputus."
            )
          );

          console.log(
            chalk.cyan(
              "🔄 Menghubungkan kembali dalam 5 detik..."
            )
          );

          await new Promise((resolve) =>
            setTimeout(resolve, 5000)
          );

          startBot();
        }
      }
    );

    /*
    ========================================================
    MESSAGE HANDLER
    ========================================================
    */

    sock.ev.on(
      "messages.upsert",
      async ({
        messages
      }) => {

        try {
          const msg = messages[0];

          if (!msg?.message) return;

          if (
            msg.key?.remoteJid ===
            "status@broadcast"
          ) {
            return;
          }

          const m =
            await serialize(
              sock,
              msg
            );

          require("./message.js")(
            sock,
            m
          );

        } catch (error) {
          console.log(
            chalk.red(
              "Message Error:"
            ),
            error?.message ||
              error
          );
        }
      }
    );

    /*
    ========================================================
    GROUP PARTICIPANTS
    ========================================================
    */

    sock.ev.on(
      "group-participants.update",
      async (update) => {

        try {
          const {
            id,
            author,
            participants,
            action
          } = update;

          const groupMetadata =
            await sock
              .groupMetadata(id);

          global.groupMetadataCache.set(
            id,
            groupMetadata
          );

          const database =
            JSON.parse(
              fs.readFileSync(
                "./collection/database.json",
                "utf8"
              )
            );

          if (!database.welcome) {
            return;
          }

          const groupSubject =
            groupMetadata.subject;

          const commonMessageSuffix =
            `\n\n📢 Jangan lupa join grup :\n${
              global.linkgroup || ""
            }`;

          for (
            const participant
            of participants
          ) {

            const participantId =
              typeof participant ===
              "string"
                ? participant
                : participant?.id;

            if (!participantId) continue;

            const participantName =
              participantId.split("@")[0];

            const authorName =
              author
                ? author.split("@")[0]
                : "";

            let messageText = "";

            switch (action) {

              case "add":

                messageText =
                  !author
                    ? `@${participantName} Selamat datang di grup ${groupSubject}`
                    : `@${authorName} Telah *menambahkan* @${participantName} ke dalam grup.`;

                break;

              case "remove":

                messageText =
                  !author
                    ? `@${participantName} Telah *keluar* dari grup.`
                    : `@${authorName} Telah *mengeluarkan* @${participantName} dari grup.`;

                break;

              case "promote":

                messageText =
                  `@${authorName} Telah *menjadikan* @${participantName} sebagai *admin* grup.`;

                break;

              case "demote":

                messageText =
                  `@${authorName} Telah *menghentikan* @${participantName} sebagai *admin* grup.`;

                break;

              default:
                continue;
            }

            messageText +=
              commonMessageSuffix;

            await sock.sendMessage(
              id,
              {
                text: messageText,

                mentions: [
                  ...(author
                    ? [author]
                    : []),
                  participantId
                ]
              }
            );
          }

        } catch (error) {
          console.log(
            chalk.red(
              "Group Event Error:"
            ),
            error?.message ||
              error
          );
        }
      }
    );

    /*
    ========================================================
    HELPERS
    ========================================================
    */

    sock.toLid = async (pn) => pn;

    sock.decodeJid = (jid) => {

      if (!jid) return jid;

      if (
        /:\d+@/gi.test(jid)
      ) {

        const decode =
          jidDecode(jid) || {};

        if (
          decode.user &&
          decode.server
        ) {
          return `${decode.user}@${decode.server}`;
        }

        return jid;
      }

      return jid;
    };

    sock.downloadMediaMessage =
      async (
        m,
        type,
        filename = ""
      ) => {

        if (
          !m ||
          !(m.url || m.directPath)
        ) {
          return Buffer.alloc(0);
        }

        const stream =
          await downloadContentFromMessage(
            m,
            type
          );

        let buffer =
          Buffer.alloc(0);

        for await (
          const chunk of stream
        ) {
          buffer = Buffer.concat([
            buffer,
            chunk
          ]);
        }

        if (filename) {
          await fs.promises.writeFile(
            filename,
            buffer
          );
        }

        return filename &&
          fs.existsSync(filename)
          ? filename
          : buffer;
      };

    sock.downloadAndSaveMediaMessage =
      async (
        message,
        filename,
        attachExtension = true
      ) => {

        const quoted =
          message.msg
            ? message.msg
            : message;

        const mime =
          (message.msg || message)
            .mimetype || "";

        const messageType =
          message.mtype
            ? message.mtype.replace(
                /Message/gi,
                ""
              )
            : mime.split("/")[0];

        const fil = Date.now();

        const stream =
          await downloadContentFromMessage(
            quoted,
            messageType
          );

        let buffer =
          Buffer.alloc(0);

        for await (
          const chunk of stream
        ) {
          buffer = Buffer.concat([
            buffer,
            chunk
          ]);
        }

        const type =
          await FileType.fromBuffer(
            buffer
          );

        const ext =
          type?.ext || "bin";

        const trueFileName =
          attachExtension
            ? `./sampah/${fil}.${ext}`
            : filename;

        if (
          !fs.existsSync("./sampah")
        ) {
          fs.mkdirSync(
            "./sampah",
            {
              recursive: true
            }
          );
        }

        fs.writeFileSync(
          trueFileName,
          buffer
        );

        return trueFileName;
      };

    return sock;

  } catch (error) {

    console.log(
      chalk.red(
        "\n❌ Gagal menjalankan bot:"
      )
    );

    console.log(
      error?.stack ||
      error
    );

    process.exit(1);
  }
}

process.on(
  "uncaughtException",
  (error) => {
    console.log(
      chalk.red(
        "Uncaught Exception:"
      ),
      error
    );
  }
);

process.on(
  "unhandledRejection",
  (error) => {
    console.log(
      chalk.red(
        "Unhandled Rejection:"
      ),
      error
    );
  }
);

startBot();
