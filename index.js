require("./setting.js");
require("./lib/myfunction.js");
require("./lib/message.js");

const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    downloadContentFromMessage,
    jidDecode,
    makeInMemoryStore,
    Browsers
} = require("baileys");

const readline = require("readline");
const pino = require("pino");
const fs = require("fs");
const chalk = require("chalk");
const serialize = require("./lib/serialize.js");
const FileType = require("file-type");

global.groupMetadataCache = new Map();
global.botNumber = "";

/* =========================================================
   ASK INPUT
========================================================= */

async function ask(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

/* =========================================================
   PAIRING NUMBER
========================================================= */

async function getPairingNumber() {
    while (true) {
        let number = await ask(
            "\n📱 Masukkan nomor WhatsApp untuk pairing\n" +
            "Contoh: 6281234567890\n" +
            "Nomor WhatsApp: "
        );

        // Hapus semua karakter selain angka
        number = number.replace(/\D/g, "");

        if (number.length >= 10) {
            return number;
        }

        console.log(
            chalk.red(
                "❌ Nomor tidak valid.\n" +
                "Gunakan format internasional tanpa +, spasi atau -.\n" +
                "Contoh: 6281234567890"
            )
        );
    }
}

/* =========================================================
   START BOT
========================================================= */

async function startBot() {
    try {
        const store = makeInMemoryStore({
            logger: pino({
                level: "silent"
            }).child({
                level: "silent",
                stream: "store"
            })
        });

        /* =====================================================
           DIRECTORY
        ===================================================== */

        const sessionDir =
            process.env.SESSION_DIR || "./session";

        fs.mkdirSync(sessionDir, {
            recursive: true
        });

        fs.mkdirSync("./sampah", {
            recursive: true
        });

        fs.mkdirSync("./logs", {
            recursive: true
        });

        /* =====================================================
           AUTH STATE
        ===================================================== */

        const {
            state,
            saveCreds
        } = await useMultiFileAuthState(sessionDir);

        /* =====================================================
           WHATSAPP SOCKET
        ===================================================== */

        const sock = makeWASocket({
            auth: state,

            printQRInTerminal: false,

            logger: pino({
                level: "silent"
            }),

            browser: Browsers.ubuntu("20.0.04"),

            generateHighQualityLinkPreview: true,

            markOnlineOnConnect: false,

            getMessage: async (key) => {
                try {
                    if (!store) {
                        return undefined;
                    }

                    const msg = await store.loadMessage(
                        key.remoteJid,
                        key.id
                    );

                    return msg?.message || undefined;
                } catch {
                    return undefined;
                }
            },

            cachedGroupMetadata: async (jid) => {
                try {
                    if (!global.groupMetadataCache.has(jid)) {
                        const metadata =
                            await sock.groupMetadata(jid).catch(() => null);

                        if (metadata) {
                            global.groupMetadataCache.set(
                                jid,
                                metadata
                            );
                        }

                        return metadata;
                    }

                    return global.groupMetadataCache.get(jid);
                } catch {
                    return undefined;
                }
            }
        });

        /* =====================================================
           PAIRING
        ===================================================== */

        if (!state.creds.registered) {
            console.clear();

            console.log(
                chalk.cyan(
                    "╔══════════════════════════════════════╗"
                )
            );

            console.log(
                chalk.cyan(
                    "║          DINSTORE WHATSAPP BOT      ║"
                )
            );

            console.log(
                chalk.cyan(
                    "╚══════════════════════════════════════╝"
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
                    "Gunakan format negara, tanpa +, spasi atau -.\n"
                )
            );

            const pairingNumber =
                await getPairingNumber();

            console.log(
                chalk.yellow(
                    "\n⏳ Meminta kode pairing..."
                )
            );

            try {
                /*
                 * DINSTORE
                 *
                 * Tidak menggunakan version manual.
                 * Tidak menggunakan fetchLatestBaileysVersion.
                 */

                const code =
                    await sock.requestPairingCode(
                        pairingNumber
                    );

                console.log(
                    "\n" +
                    chalk.green(
                        "╔══════════════════════════════════════╗"
                    )
                );

                console.log(
                    chalk.green(
                        `║     KODE PAIRING: ${code}       ║`
                    )
                );

                console.log(
                    chalk.green(
                        "╚══════════════════════════════════════╝"
                    )
                );

                console.log(
                    chalk.yellow(
                        "\n📱 Buka WhatsApp"
                    )
                );

                console.log(
                    chalk.white(
                        "→ Perangkat tertaut"
                    )
                );

                console.log(
                    chalk.white(
                        "→ Tautkan perangkat"
                    )
                );

                console.log(
                    chalk.white(
                        "→ Tautkan dengan nomor telepon"
                    )
                );

                console.log(
                    chalk.white(
                        "→ Masukkan kode pairing di atas\n"
                    )
                );

            } catch (err) {
                console.error(
                    chalk.red(
                        "\n❌ Gagal meminta kode pairing:"
                    ),
                    err?.message || err
                );

                console.log(
                    chalk.yellow(
                        "\nPastikan:"
                    )
                );

                console.log(
                    chalk.gray(
                        "1. Nomor menggunakan format 628xxxx"
                    )
                );

                console.log(
                    chalk.gray(
                        "2. WhatsApp di HP menggunakan versi terbaru"
                    )
                );

                console.log(
                    chalk.gray(
                        "3. Nomor belum terlalu banyak perangkat tertaut"
                    )
                );

                process.exit(1);
            }
        }

        /* =====================================================
           SAVE CREDENTIALS
        ===================================================== */

        sock.ev.on(
            "creds.update",
            saveCreds
        );

        /* =====================================================
           STORE
        ===================================================== */

        if (store) {
            store.bind(sock.ev);
        }

        /* =====================================================
           CONNECTION UPDATE
        ===================================================== */

        sock.ev.on(
            "connection.update",
            async ({
                connection,
                lastDisconnect
            }) => {

                if (connection === "connecting") {
                    console.log(
                        chalk.yellow(
                            "⏳ Menghubungkan ke WhatsApp..."
                        )
                    );
                }

                if (connection === "open") {

                    try {
                        const jid =
                            sock.user?.id || "";

                        global.botNumber =
                            jid.split(":")[0] +
                            "@s.whatsapp.net";

                    } catch {
                        global.botNumber = "";
                    }

                    console.log(
                        chalk.green(
                            "\n╔══════════════════════════════════════╗"
                        )
                    );

                    console.log(
                        chalk.green(
                            "║       DINSTORE BERHASIL ONLINE       ║"
                        )
                    );

                    console.log(
                        chalk.green(
                            "╚══════════════════════════════════════╝"
                        )
                    );

                    console.log(
                        chalk.white(
                            `\n• Nama     : ${
                                sock.user?.name ||
                                "Tidak terdeteksi"
                            }`
                        )
                    );

                    console.log(
                        chalk.white(
                            `• WhatsApp : ${
                                global.botNumber
                                    ? global.botNumber.split("@")[0]
                                    : "Tidak terdeteksi"
                            }`
                        )
                    );

                    console.log(
                        chalk.green(
                            "\n✓ DINSTORE siap digunakan.\n"
                        )
                    );
                }

                if (connection === "close") {

                    let reason;

                    try {
                        reason =
                            lastDisconnect
                                ?.error
                                ?.output
                                ?.statusCode;
                    } catch {
                        reason = undefined;
                    }

                    console.log(
                        chalk.red(
                            "\n⚠️ Koneksi WhatsApp terputus."
                        )
                    );

                    if (
                        reason ===
                        DisconnectReason.loggedOut
                    ) {

                        console.log(
                            chalk.red(
                                "❌ Session logout."
                            )
                        );

                        console.log(
                            chalk.yellow(
                                "Hapus folder session lalu jalankan kembali."
                            )
                        );

                        return;
                    }

                    if (
                        reason ===
                        DisconnectReason.connectionReplaced
                    ) {

                        console.log(
                            chalk.red(
                                "❌ Session digantikan oleh perangkat lain."
                            )
                        );

                        return;
                    }

                    console.log(
                        chalk.yellow(
                            "🔄 Menghubungkan kembali..."
                        )
                    );

                    setTimeout(() => {
                        startBot();
                    }, 5000);
                }
            }
        );

        /* =====================================================
           MESSAGES
        ===================================================== */

        sock.ev.on(
            "messages.upsert",
            async ({
                messages
            }) => {

                try {

                    const msg =
                        messages?.[0];

                    if (!msg) {
                        return;
                    }

                    if (!msg.message) {
                        return;
                    }

                    const m =
                        await serialize(
                            sock,
                            msg
                        );

                    /*
                     * File handler utama bot.
                     */

                    require("./message.js")(
                        sock,
                        m
                    );

                } catch (err) {

                    console.error(
                        chalk.red(
                            "Message Error:"
                        ),
                        err
                    );
                }
            }
        );

        /* =====================================================
           GROUP PARTICIPANTS
        ===================================================== */

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
                            .groupMetadata(id)
                            .catch(() => null);

                    if (!groupMetadata) {
                        return;
                    }

                    global.groupMetadataCache.set(
                        id,
                        groupMetadata
                    );

                    /* =========================================
                       DATABASE
                    ========================================= */

                    let botSettings = {};

                    try {

                        const databasePath =
                            "./collection/database.json";

                        if (
                            fs.existsSync(
                                databasePath
                            )
                        ) {

                            botSettings =
                                JSON.parse(
                                    fs.readFileSync(
                                        databasePath,
                                        "utf8"
                                    )
                                );
                        }

                    } catch (err) {

                        console.log(
                            chalk.red(
                                "Database error:"
                            ),
                            err
                        );

                        return;
                    }

                    if (!botSettings.welcome) {
                        return;
                    }

                    const groupSubject =
                        groupMetadata.subject ||
                        "grup";

                    const commonMessageSuffix =
                        global.linkgroup
                            ? `\n\n📢 Jangan lupa join grup :\n${global.linkgroup}`
                            : "";

                    for (
                        const participant
                        of participants
                    ) {

                        const authorName =
                            author
                                ? author.split("@")[0]
                                : "";

                        const participantName =
                            typeof participant ===
                            "string"
                                ? participant.split("@")[0]
                                : participant?.id
                                    ?.split("@")[0] ||
                                  "";

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

                        try {

                            const mentions = [];

                            if (author) {
                                mentions.push(author);
                            }

                            if (
                                typeof participant ===
                                "string"
                            ) {
                                mentions.push(
                                    participant
                                );
                            } else if (
                                participant?.id
                            ) {
                                mentions.push(
                                    participant.id
                                );
                            }

                            await sock.sendMessage(
                                id,
                                {
                                    text: messageText,
                                    mentions
                                }
                            );

                        } catch (error) {

                            console.log(
                                chalk.red(
                                    "Welcome message error:"
                                ),
                                error
                            );
                        }
                    }

                } catch (err) {

                    console.log(
                        chalk.red(
                            "Group participant error:"
                        ),
                        err
                    );
                }
            }
        );

        /* =====================================================
           LID
        ===================================================== */

        sock.toLid = async (pn) => {
            return pn;
        };

        /* =====================================================
           DECODE JID
        ===================================================== */

        sock.decodeJid = (jid) => {

            if (!jid) {
                return jid;
            }

            if (/:\\d+@/gi.test(jid)) {

                const decode =
                    jidDecode(jid) || {};

                if (
                    decode.user &&
                    decode.server
                ) {

                    return (
                        `${decode.user}@${decode.server}`
                    );
                }
            }

            return jid;
        };

        /* =====================================================
           DOWNLOAD MEDIA
        ===================================================== */

        sock.downloadMediaMessage = async (
            m,
            type,
            filename = ""
        ) => {

            try {

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

                    buffer =
                        Buffer.concat([
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

            } catch (err) {

                console.error(
                    "Download media error:",
                    err
                );

                return Buffer.alloc(0);
            }
        };

        /* =====================================================
           DOWNLOAD AND SAVE MEDIA
        ===================================================== */

        sock.downloadAndSaveMediaMessage =
            async (
                message,
                filename,
                attachExtension = true
            ) => {

                try {

                    const quoted =
                        message.msg
                            ? message.msg
                            : message;

                    const mime =
                        (
                            message.msg ||
                            message
                        ).mimetype || "";

                    const messageType =
                        message.mtype
                            ? message.mtype.replace(
                                /Message/gi,
                                ""
                            )
                            : mime.split("/")[0];

                    const fil =
                        Date.now();

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

                        buffer =
                            Buffer.concat([
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

                    fs.writeFileSync(
                        trueFileName,
                        buffer
                    );

                    return trueFileName;

                } catch (err) {

                    console.error(
                        "Save media error:",
                        err
                    );

                    return null;
                }
            };

        return sock;

    } catch (err) {

        console.error(
            chalk.red(
                "\n❌ Fatal Bot Error:"
            ),
            err
        );

        setTimeout(() => {
            startBot();
        }, 5000);
    }
}

/* =========================================================
   START DINSTORE
========================================================= */

startBot();
