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

let reconnectTimer = null;
let isStarting = false;
let pairingNumber = null;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function ask(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question(question, answer => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

async function getPairingNumber() {
    while (true) {
        const input = await ask(
            "\n📱 Masukkan nomor WhatsApp untuk pairing\n" +
            "Contoh: 6281234567890\n" +
            "Nomor: "
        );

        // HANYA angka
        const number = input.replace(/\D/g, "");

        if (!number) {
            console.log(chalk.red("❌ Nomor tidak boleh kosong."));
            continue;
        }

        if (number.length < 10) {
            console.log(
                chalk.red(
                    "❌ Nomor terlalu pendek. Gunakan format internasional."
                )
            );
            continue;
        }

        if (number.startsWith("0")) {
            console.log(
                chalk.yellow(
                    "⚠️ Jangan gunakan 0 di depan.\n" +
                    "Contoh Indonesia: 6281234567890"
                )
            );
            continue;
        }

        return number;
    }
}

function getDisconnectReason(lastDisconnect) {
    try {
        return (
            lastDisconnect?.error?.output?.statusCode ||
            lastDisconnect?.error?.statusCode ||
            lastDisconnect?.error?.data?.statusCode ||
            null
        );
    } catch {
        return null;
    }
}

async function startBot() {
    if (isStarting) return;
    isStarting = true;

    try {
        const sessionDir = process.env.SESSION_DIR || "./session";

        fs.mkdirSync(sessionDir, { recursive: true });
        fs.mkdirSync("./sampah", { recursive: true });
        fs.mkdirSync("./logs", { recursive: true });

        const store = makeInMemoryStore({
            logger: pino({
                level: "silent"
            }).child({
                level: "silent",
                stream: "store"
            })
        });

        const { state, saveCreds } =
            await useMultiFileAuthState(sessionDir);

        let version;

        try {
            const latest = await fetchLatestBaileysVersion();
            version = latest.version;

            console.log(
                chalk.gray(
                    `• WhatsApp Web version: ${version.join(".")}`
                )
            );
        } catch (err) {
            console.log(
                chalk.yellow(
                    "⚠️ Gagal mengambil versi WhatsApp terbaru."
                )
            );

            // Fallback
            version = [2, 3000, 1030600016];
        }

        console.log(
            chalk.cyan("\n╔══════════════════════════════════════╗")
        );
        console.log(
            chalk.cyan("║       WHATSAPP PAIRING BY DIN      ║")
        );
        console.log(
            chalk.cyan("╚══════════════════════════════════════╝\n")
        );

        const sock = makeWASocket({
            version,

            auth: state,

            printQRInTerminal: false,

            logger: pino({
                level: "silent"
            }),

            generateHighQualityLinkPreview: true,

            // Browser identifier
            browser: [
                "Ubuntu",
                "Chrome",
                "20.0.04"
            ],

            markOnlineOnConnect: false,

            syncFullHistory: false,

            getMessage: async key => {
                try {
                    if (!store) return undefined;

                    const msg = await store.loadMessage(
                        key.remoteJid,
                        key.id
                    );

                    return msg?.message || undefined;
                } catch {
                    return undefined;
                }
            },

            cachedGroupMetadata: async jid => {
                try {
                    if (!global.groupMetadataCache.has(jid)) {
                        const metadata =
                            await sock.groupMetadata(jid);

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

        /*
        ========================================================
        CREDENTIALS
        ========================================================
        */

        sock.ev.on("creds.update", saveCreds);

        store.bind(sock.ev);

        /*
        ========================================================
        PAIRING
        ========================================================
        */

        if (!state.creds.registered) {
            if (!pairingNumber) {
                pairingNumber = await getPairingNumber();
            }

            console.log(
                chalk.white(
                    "\n⏳ Menyiapkan koneksi WhatsApp..."
                )
            );

            // Beri waktu socket melakukan initialization
            await sleep(3000);

            try {
                const code =
                    await sock.requestPairingCode(
                        pairingNumber
                    );

                const formattedCode =
                    String(code)
                        .toUpperCase()
                        .replace(/(.{4})/g, "$1-")
                        .replace(/-$/, "");

                console.log(
                    chalk.green(
                        "\n╔══════════════════════════════════════╗"
                    )
                );

                console.log(
                    chalk.green(
                        `║  KODE PAIRING: ${formattedCode.padEnd(16)}║`
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
                    chalk.yellow(
                        "→ Perangkat tertaut"
                    )
                );

                console.log(
                    chalk.yellow(
                        "→ Tautkan perangkat"
                    )
                );

                console.log(
                    chalk.yellow(
                        "→ Tautkan dengan nomor telepon"
                    )
                );

                console.log(
                    chalk.cyan(
                        `\n⚠️ Masukkan kode: ${formattedCode}`
                    )
                );

                console.log(
                    chalk.gray(
                        "⏳ Menunggu WhatsApp menyelesaikan pairing..."
                    )
                );

            } catch (err) {
                console.error(
                    chalk.red(
                        "\n❌ Gagal meminta kode pairing:"
                    ),
                    err?.message || err
                );

                isStarting = false;

                try {
                    sock.ws?.close();
                } catch {}

                return;
            }
        }

        /*
        ========================================================
        CONNECTION UPDATE
        ========================================================
        */

        sock.ev.on(
            "connection.update",
            async update => {
                const {
                    connection,
                    lastDisconnect
                } = update;

                if (connection === "connecting") {
                    console.log(
                        chalk.gray(
                            "🔄 Menghubungkan ke WhatsApp..."
                        )
                    );
                }

                if (connection === "open") {
                    isStarting = false;

                    const userId =
                        sock?.user?.id || "";

                    global.botNumber =
                        userId.split(":")[0] +
                        "@s.whatsapp.net";

                    console.log(
                        chalk.green(
                            "\n╔══════════════════════════════════════╗"
                        )
                    );

                    console.log(
                        chalk.green(
                            "║       WHATSAPP BERHASIL TERHUBUNG    ║"
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
                                sock?.user?.name ||
                                "Tidak terdeteksi"
                            }`
                        )
                    );

                    console.log(
                        chalk.white(
                            `• WhatsApp : ${
                                global.botNumber.split("@")[0]
                            }`
                        )
                    );

                    console.log(
                        chalk.green(
                            "\n✅ NDZ BOT ONLINE\n"
                        )
                    );

                    // Setelah berhasil login,
                    // nomor tidak perlu diminta lagi.
                    pairingNumber = null;
                }

                if (connection === "close") {
                    isStarting = false;

                    const reason =
                        getDisconnectReason(
                            lastDisconnect
                        );

                    console.log(
                        chalk.red(
                            "\n⚠️ Koneksi WhatsApp terputus."
                        )
                    );

                    console.log(
                        chalk.gray(
                            `• Disconnect reason: ${
                                reason || "unknown"
                            }`
                        )
                    );

                    if (
                        reason ===
                        DisconnectReason.loggedOut
                    ) {
                        console.log(
                            chalk.red(
                                "\n❌ Session logout."
                            )
                        );

                        console.log(
                            chalk.yellow(
                                "Hapus folder session kemudian jalankan bot kembali."
                            )
                        );

                        pairingNumber = null;

                        return;
                    }

                    if (
                        reason ===
                        DisconnectReason.forbidden
                    ) {
                        console.log(
                            chalk.red(
                                "\n❌ WhatsApp menolak koneksi."
                            )
                        );

                        console.log(
                            chalk.yellow(
                                "Coba pairing kembali setelah beberapa saat."
                            )
                        );
                    }

                    if (
                        reason ===
                        DisconnectReason.badSession
                    ) {
                        console.log(
                            chalk.red(
                                "\n❌ Session rusak."
                            )
                        );

                        console.log(
                            chalk.yellow(
                                "Hapus folder session untuk pairing ulang."
                            )
                        );

                        return;
                    }

                    if (!reconnectTimer) {
                        reconnectTimer =
                            setTimeout(() => {
                                reconnectTimer = null;

                                console.log(
                                    chalk.cyan(
                                        "\n🔄 Menghubungkan kembali..."
                                    )
                                );

                                startBot();
                            }, 5000);
                    }
                }
            }
        );

        /*
        ========================================================
        MESSAGES
        ========================================================
        */

        sock.ev.on(
            "messages.upsert",
            async ({ messages }) => {
                try {
                    const msg = messages?.[0];

                    if (!msg?.message) return;

                    const m =
                        await serialize(
                            sock,
                            msg
                        );

                    require("./message.js")(
                        sock,
                        m
                    );
                } catch (err) {
                    console.error(
                        chalk.red(
                            "❌ Message handler error:"
                        ),
                        err
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
            async update => {
                try {
                    const {
                        id,
                        author,
                        participants,
                        action
                    } = update;

                    const groupMetadata =
                        await sock.groupMetadata(
                            id
                        );

                    global.groupMetadataCache.set(
                        id,
                        groupMetadata
                    );

                    let botSettings = {};

                    try {
                        botSettings =
                            JSON.parse(
                                fs.readFileSync(
                                    "./collection/database.json",
                                    "utf8"
                                )
                            );
                    } catch {
                        botSettings = {};
                    }

                    if (!botSettings.welcome) {
                        return;
                    }

                    const groupSubject =
                        groupMetadata.subject;

                    const commonMessageSuffix =
                        `\n\n📢 Jangan lupa join grup :\n${
                            global.linkgroup || ""
                        }`;

                    for (
                        const participant of participants
                    ) {
                        let messageText = "";

                        const authorName =
                            author
                                ? author.split("@")[0]
                                : "";

                        const participantId =
                            typeof participant ===
                            "string"
                                ? participant
                                : participant?.id;

                        const participantName =
                            participantId
                                ? participantId.split(
                                      "@"
                                  )[0]
                                : "";

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

                        const mentions = [];

                        if (author) {
                            mentions.push(author);
                        }

                        if (participantId) {
                            mentions.push(
                                participantId
                            );
                        }

                        try {
                            await sock.sendMessage(
                                id,
                                {
                                    text: messageText,
                                    mentions
                                }
                            );
                        } catch (err) {
                            console.log(
                                "Welcome message error:",
                                err?.message || err
                            );
                        }
                    }
                } catch (err) {
                    console.log(
                        "Group participant error:",
                        err?.message || err
                    );
                }
            }
        );

        /*
        ========================================================
        HELPER
        ========================================================
        */

        sock.toLid = async pn => pn;

        sock.decodeJid = jid => {
            if (!jid) return jid;

            if (/:\\d+@/gi.test(jid)) {
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
                try {
                    if (
                        !m ||
                        !(m.url ||
                            m.directPath)
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
                } catch (err) {
                    console.log(
                        "Download media error:",
                        err?.message || err
                    );

                    return Buffer.alloc(0);
                }
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
                    (message.msg ||
                        message)
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

                fs.writeFileSync(
                    trueFileName,
                    buffer
                );

                return trueFileName;
            };

        return sock;
    } catch (err) {
        isStarting = false;

        console.error(
            chalk.red(
                "\n❌ Gagal menjalankan bot:"
            )
        );

        console.error(
            err?.stack || err
        );

        if (!reconnectTimer) {
            reconnectTimer =
                setTimeout(() => {
                    reconnectTimer = null;
                    startBot();
                }, 5000);
        }
    }
}

process.on(
    "uncaughtException",
    err => {
        console.error(
            chalk.red(
                "❌ Uncaught Exception:"
            ),
            err
        );
    }
);

process.on(
    "unhandledRejection",
    err => {
        console.error(
            chalk.red(
                "❌ Unhandled Rejection:"
            ),
            err
        );
    }
);

startBot();
