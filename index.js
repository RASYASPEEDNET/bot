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
global.botNumber = "";
global.pairingNumber = "";

/* =========================================================
   ASK INPUT
========================================================= */

function ask(question) {
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
   GET PAIRING NUMBER
========================================================= */

async function getPairingNumber() {

    while (true) {

        let number = await ask(
            "\n📱 Masukkan nomor WhatsApp untuk pairing\n" +
            "Contoh: 6281234567890\n" +
            "Nomor WhatsApp: "
        );

        number = number.replace(/\D/g, "");

        if (number.length >= 10) {

            global.pairingNumber = number;

            return number;
        }

        console.log(
            chalk.red(
                "\n❌ Nomor tidak valid."
            )
        );

        console.log(
            chalk.yellow(
                "Gunakan format internasional."
            )
        );

        console.log(
            chalk.gray(
                "Contoh: 6281234567890\n"
            )
        );
    }
}

/* =========================================================
   START BOT
========================================================= */

async function startBot() {

    try {

        /* =====================================================
           FOLDER
        ===================================================== */

        const sessionDir =
            process.env.SESSION_DIR ||
            "./session";

        fs.mkdirSync(
            sessionDir,
            {
                recursive: true
            }
        );

        fs.mkdirSync(
            "./sampah",
            {
                recursive: true
            }
        );

        fs.mkdirSync(
            "./logs",
            {
                recursive: true
            }
        );

        /* =====================================================
           STORE
        ===================================================== */

        const store =
            makeInMemoryStore({
                logger: pino({
                    level: "silent"
                }).child({
                    level: "silent",
                    stream: "store"
                })
            });

        /* =====================================================
           AUTH
        ===================================================== */

        const {
            state,
            saveCreds
        } = await useMultiFileAuthState(
            sessionDir
        );

        /* =====================================================
           BAILEYS VERSION
        ===================================================== */

        const {
            version
        } =
            await fetchLatestBaileysVersion();

        /* =====================================================
           HEADER
        ===================================================== */

        console.log(
            chalk.cyan(
                "\n╔══════════════════════════════════════╗"
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
            chalk.gray(
                `\n• Browser : Ubuntu / Chrome / 20.0.04`
            )
        );

        console.log(
            chalk.gray(
                `• Session : ${sessionDir}`
            )
        );

        /* =====================================================
           SOCKET
        ===================================================== */

        const sock =
            makeWASocket({

                version,

                auth: state,

                printQRInTerminal: false,

                logger: pino({
                    level: "silent"
                }),

                generateHighQualityLinkPreview:
                    true,

                browser: [
                    "Ubuntu",
                    "Chrome",
                    "20.0.04"
                ],

                getMessage: async (
                    key
                ) => {

                    try {

                        if (!store) {
                            return undefined;
                        }

                        const msg =
                            await store.loadMessage(
                                key.remoteJid,
                                key.id
                            );

                        return (
                            msg?.message ||
                            undefined
                        );

                    } catch {

                        return undefined;
                    }
                },

                cachedGroupMetadata:
                    async (
                        jid
                    ) => {

                        try {

                            if (
                                !global.groupMetadataCache.has(
                                    jid
                                )
                            ) {

                                const metadata =
                                    await sock
                                        .groupMetadata(
                                            jid
                                        )
                                        .catch(
                                            () => null
                                        );

                                if (metadata) {

                                    global.groupMetadataCache.set(
                                        jid,
                                        metadata
                                    );
                                }

                                return metadata;
                            }

                            return global.groupMetadataCache.get(
                                jid
                            );

                        } catch {

                            return undefined;
                        }
                    }
            });

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

        store?.bind(
            sock.ev
        );

        /* =====================================================
           PAIRING
        ===================================================== */

        if (
            !sock.authState.creds.registered
        ) {

            const number =
                await getPairingNumber();

            console.log(
                chalk.white(
                    "\n• Script By DINSTORE"
                )
            );

            console.log(
                chalk.white(
                    "• Pembuat t.me/DINN_STORE"
                )
            );

            console.log(
                chalk.white(
                    "• Meminta Code Pair..."
                )
            );

            try {

                /*
                 * Beri sedikit waktu agar
                 * socket siap sebelum pairing.
                 */

                await new Promise(
                    resolve =>
                        setTimeout(
                            resolve,
                            3000
                        )
                );

                const code =
                    await sock.requestPairingCode(
                        number,
                        "DINSTORE"
                    );

                console.log(
                    chalk.green(
                        `\n• Kode Pairing: ${code}`
                    )
                );

                console.log(
                    chalk.white(
                        "\n• WhatsApp → Perangkat tertaut"
                    )
                );

                console.log(
                    chalk.white(
                        "• Tautkan perangkat"
                    )
                );

                console.log(
                    chalk.white(
                        "• Tautkan dengan nomor telepon"
                    )
                );

                console.log(
                    chalk.white(
                        "• Masukkan kode pairing di atas\n"
                    )
                );

            } catch (err) {

                console.log(
                    chalk.red(
                        "\n❌ Gagal meminta Code Pairing"
                    )
                );

                console.log(
                    chalk.red(
                        err?.message ||
                        err
                    )
                );

                return;
            }
        }

        /* =====================================================
           CONNECTION UPDATE
        ===================================================== */

        sock.ev.on(
            "connection.update",
            ({
                connection,
                lastDisconnect
            }) => {

                /* CONNECTING */

                if (
                    connection ===
                    "connecting"
                ) {

                    console.log(
                        chalk.yellow(
                            "⏳ Menghubungkan ke WhatsApp..."
                        )
                    );
                }

                /* OPEN */

                if (
                    connection ===
                    "open"
                ) {

                    try {

                        global.botNumber =
                            sock.user?.id
                                ?.split(":")[0] +
                            "@s.whatsapp.net";

                    } catch {

                        global.botNumber =
                            "";
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
                                    ? global.botNumber.split(
                                        "@"
                                    )[0]
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

                /* CLOSE */

                if (
                    connection ===
                    "close"
                ) {

                    const reason =
                        lastDisconnect
                            ?.error
                            ?.output
                            ?.statusCode;

                    console.log(
                        chalk.red(
                            "\n❌ Koneksi WhatsApp terputus."
                        )
                    );

                    console.log(
                        chalk.yellow(
                            `• Disconnect Reason: ${
                                reason ||
                                "UNKNOWN"
                            }`
                        )
                    );

                    /* =========================================
                       LOGGED OUT
                    ========================================= */

                    if (
                        reason ===
                        DisconnectReason.loggedOut
                    ) {

                        console.log(
                            chalk.red(
                                "\n❌ Device Logged Out."
                            )
                        );

                        console.log(
                            chalk.yellow(
                                "Hapus folder session untuk pairing ulang."
                            )
                        );

                        return;
                    }

                    /* =========================================
                       CONNECTION REPLACED
                    ========================================= */

                    if (
                        reason ===
                        DisconnectReason.connectionReplaced
                    ) {

                        console.log(
                            chalk.red(
                                "\n❌ Session digunakan perangkat lain."
                            )
                        );

                        return;
                    }

                    /* =========================================
                       BAD SESSION
                    ========================================= */

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
                                "Hapus folder session lalu pairing ulang."
                            )
                        );

                        return;
                    }

                    /* =========================================
                       RECONNECT
                    ========================================= */

                    console.log(
                        chalk.yellow(
                            "\n🔄 Reconnecting dalam 5 detik..."
                        )
                    );

                    setTimeout(
                        () => {
                            startBot();
                        },
                        5000
                    );
                }
            }
        );

        /* =====================================================
           MESSAGE
        ===================================================== */

        sock.ev.on(
            "messages.upsert",
            async ({
                messages
            }) => {

                try {

                    const msg =
                        messages?.[0];

                    if (
                        !msg ||
                        !msg.message
                    ) {
                        return;
                    }

                    const m =
                        await serialize(
                            sock,
                            msg
                        );

                    require(
                        "./message.js"
                    )(
                        sock,
                        m
                    );

                } catch (err) {

                    console.log(
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
            async (
                update
            ) => {

                try {

                    const {
                        id,
                        author,
                        participants,
                        action
                    } = update;

                    const groupMetadata =
                        await sock
                            .groupMetadata(
                                id
                            )
                            .catch(
                                () => null
                            );

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

                        const dbPath =
                            "./collection/database.json";

                        if (
                            fs.existsSync(
                                dbPath
                            )
                        ) {

                            botSettings =
                                JSON.parse(
                                    fs.readFileSync(
                                        dbPath,
                                        "utf8"
                                    )
                                );
                        }

                    } catch (err) {

                        console.log(
                            chalk.red(
                                "Database Error:"
                            ),
                            err
                        );

                        return;
                    }

                    if (
                        !botSettings.welcome
                    ) {
                        return;
                    }

                    const groupSubject =
                        groupMetadata.subject ||
                        "grup";

                    const suffix =
                        global.linkgroup
                            ? `\n\n📢 Jangan lupa join grup :\n${global.linkgroup}`
                            : "";

                    for (
                        const participant
                        of participants
                    ) {

                        const authorName =
                            author
                                ? author.split(
                                    "@"
                                )[0]
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

                        let messageText =
                            "";

                        switch (
                            action
                        ) {

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
                            suffix;

                        const mentions =
                            [];

                        if (author) {
                            mentions.push(
                                author
                            );
                        }

                        if (
                            participantId
                        ) {

                            mentions.push(
                                participantId
                            );
                        }

                        try {

                            await sock.sendMessage(
                                id,
                                {
                                    text:
                                        messageText,
                                    mentions
                                }
                            );

                        } catch (
                            error
                        ) {

                            console.log(
                                chalk.red(
                                    "Welcome Error:"
                                ),
                                error
                            );
                        }
                    }

                } catch (
                    err
                ) {

                    console.log(
                        chalk.red(
                            "Group Update Error:"
                        ),
                        err
                    );
                }
            }
        );

        /* =====================================================
           TO LID
        ===================================================== */

        sock.toLid =
            async (
                pn
            ) => pn;

        /* =====================================================
           DECODE JID
        ===================================================== */

        sock.decodeJid =
            (
                jid
            ) => {

                if (!jid) {
                    return jid;
                }

                if (
                    /:\d+@/gi.test(
                        jid
                    )
                ) {

                    const decode =
                        jidDecode(
                            jid
                        ) || {};

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

        sock.downloadMediaMessage =
            async (
                m,
                type,
                filename = ""
            ) => {

                try {

                    if (
                        !m ||
                        !(
                            m.url ||
                            m.directPath
                        )
                    ) {

                        return Buffer.alloc(
                            0
                        );
                    }

                    const stream =
                        await downloadContentFromMessage(
                            m,
                            type
                        );

                    let buffer =
                        Buffer.alloc(
                            0
                        );

                    for await (
                        const chunk
                        of stream
                    ) {

                        buffer =
                            Buffer.concat([
                                buffer,
                                chunk
                            ]);
                    }

                    if (
                        filename
                    ) {

                        await fs.promises.writeFile(
                            filename,
                            buffer
                        );
                    }

                    return (
                        filename &&
                        fs.existsSync(
                            filename
                        )
                    )
                        ? filename
                        : buffer;

                } catch (
                    err
                ) {

                    console.log(
                        chalk.red(
                            "Download Error:"
                        ),
                        err
                    );

                    return Buffer.alloc(
                        0
                    );
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
                        ).mimetype ||
                        "";

                    const messageType =
                        message.mtype
                            ? message.mtype.replace(
                                /Message/gi,
                                ""
                            )
                            : mime.split(
                                "/"
                            )[0];

                    const fil =
                        Date.now();

                    const stream =
                        await downloadContentFromMessage(
                            quoted,
                            messageType
                        );

                    let buffer =
                        Buffer.alloc(
                            0
                        );

                    for await (
                        const chunk
                        of stream
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
                        type?.ext ||
                        "bin";

                    const trueFileName =
                        attachExtension
                            ? `./sampah/${fil}.${ext}`
                            : filename;

                    fs.writeFileSync(
                        trueFileName,
                        buffer
                    );

                    return trueFileName;

                } catch (
                    err
                ) {

                    console.log(
                        chalk.red(
                            "Save Media Error:"
                        ),
                        err
                    );

                    return null;
                }
            };

        return sock;

    } catch (err) {

        console.log(
            chalk.red(
                "\n❌ DINSTORE ERROR:"
            )
        );

        console.log(
            err?.stack ||
            err
        );
    }
}

/* =========================================================
   RUN
========================================================= */

startBot();
