const moment = require("moment-timezone");
const util = require("util");
const fs = require("fs");
const chalk = require("chalk");
const BodyForm = require("form-data");
const axios = require("axios");
const cheerio = require("cheerio");
const Jimp = require("jimp");

/*
============================================================
RANDOM
============================================================
*/

global.getRandom = (ext = "") => {
    return `${Math.floor(Math.random() * 10000)}${ext}`;
};


/*
============================================================
CAPITAL
============================================================
*/

global.capital = (string = "") => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
};


/*
============================================================
UCAPAN
============================================================
*/

global.ucapan = () => {

    const hour =
        moment()
            .tz("Asia/Jakarta")
            .hour();

    const pagi = [
        "🌅 Selamat pagi, semoga harimu penuh semangat ✨",
        "🌅 Pagi kak! Semoga hari ini membawa banyak hal baik 🤍",
        "🌅 Selamat pagi, jangan lupa senyum ya 😄",
        "🌅 Pagi yang cerah, semoga rezekimu lancar hari ini 💫"
    ];

    const siang = [
        "☀️ Selamat siang, tetap semangat ya 💪",
        "☀️ Siang kak! Jangan lupa makan 😋",
        "☀️ Semoga aktivitasmu lancar sampai sore 🙌",
        "☀️ Selamat siang, semoga harimu produktif ✨"
    ];

    const sore = [
        "🌇 Selamat sore, capekmu hari ini pasti ada hasilnya 💙",
        "🌇 Sore kak, bentar lagi waktunya istirahat 😌",
        "🌇 Semoga soremu penuh ketenangan 🌿",
        "🌇 Selamat sore, terima kasih sudah berjuang hari ini 👏"
    ];

    const malam = [
        "🌙 Selamat malam, waktunya istirahat ya 🌌",
        "🌙 Malam kak, semoga tidurmu nyenyak 😴",
        "🌙 Selamat malam, semoga hari esok lebih baik ✨",
        "🌙 Saatnya santai, kamu hebat hari ini 💫"
    ];

    let list;

    if (hour >= 5 && hour < 11) {
        list = pagi;
    } else if (hour >= 11 && hour < 15) {
        list = siang;
    } else if (hour >= 15 && hour < 18) {
        list = sore;
    } else {
        list = malam;
    }

    return list[
        Math.floor(Math.random() * list.length)
    ];
};


/*
============================================================
SLEEP
============================================================
*/

global.sleep = async (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};


/*
============================================================
GENERATE PROFILE PICTURE
============================================================
*/

global.generateProfilePicture = async (buffer) => {

    const jimp =
        await Jimp.read(buffer);

    const min =
        jimp.getWidth();

    const max =
        jimp.getHeight();

    const cropped =
        jimp.crop(
            0,
            0,
            min,
            max
        );

    return {
        img:
            await cropped
                .scaleToFit(720, 720)
                .getBufferAsync(
                    Jimp.MIME_JPEG
                ),

        preview:
            await cropped
                .scaleToFit(720, 720)
                .getBufferAsync(
                    Jimp.MIME_JPEG
                )
    };
};


/*
============================================================
GET TIME
============================================================
*/

global.getTime = (
    format,
    date
) => {

    if (date) {

        return moment(date)
            .locale("id")
            .format(format);

    }

    return moment
        .tz("Asia/Jakarta")
        .locale("id")
        .format(format);
};


/*
============================================================
GET BUFFER
============================================================
*/

global.getBuffer = async (
    url,
    options = {}
) => {

    try {

        const res =
            await axios({
                method: "GET",
                url,

                headers: {
                    "DNT": "1",
                    "Upgrade-Insecure-Request": "1"
                },

                ...options,

                responseType:
                    "arraybuffer"
            });

        return res.data;

    } catch (err) {

        console.error(
            "getBuffer:",
            err.message
        );

        return null;
    }
};


/*
============================================================
FETCH JSON
============================================================
*/

global.fetchJson = async (
    url,
    options = {}
) => {

    try {

        const res =
            await axios({
                method: "GET",
                url,

                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/95.0.4638.69 Safari/537.36"
                },

                ...options
            });

        return res.data;

    } catch (err) {

        console.error(
            "fetchJson:",
            err.message
        );

        return null;
    }
};


/*
============================================================
RUNTIME
============================================================
*/

global.runtime = function(seconds) {

    seconds =
        Number(seconds);

    const d =
        Math.floor(
            seconds /
            (3600 * 24)
        );

    const h =
        Math.floor(
            seconds %
            (3600 * 24) /
            3600
        );

    const m =
        Math.floor(
            seconds %
            3600 /
            60
        );

    const s =
        Math.floor(
            seconds % 60
        );

    const dDisplay =
        d > 0
            ? d + "d "
            : "";

    const hDisplay =
        h > 0
            ? h + "h "
            : "";

    const mDisplay =
        m > 0
            ? m + "m "
            : "";

    const sDisplay =
        s > 0
            ? s + "s "
            : "";

    return (
        dDisplay +
        hDisplay +
        mDisplay +
        sDisplay
    );
};


/*
============================================================
TANGGAL
============================================================
*/

global.tanggal = function(numer) {

    const myMonths = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const myDays = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jum’at",
        "Sabtu"
    ];

    const tgl =
        new Date(numer);

    const day =
        tgl.getDate();

    const bulan =
        tgl.getMonth();

    let thisDay =
        tgl.getDay();

    thisDay =
        myDays[thisDay];

    const yy =
        tgl.getYear();

    const year =
        yy < 1000
            ? yy + 1900
            : yy;

    return `${thisDay}, ${day}/${myMonths[bulan]}/${year}`;
};


/*
============================================================
RUPIAH
============================================================
*/

global.toRupiah = function(x) {

    x =
        String(x);

    const pattern =
        /(-?\d+)(\d{3})/;

    while (
        pattern.test(x)
    ) {
        x =
            x.replace(
                pattern,
                "$1.$2"
            );
    }

    return x;
};


/*
============================================================
DATABASE
============================================================
*/

global.loadDatabase = async () => {

    /*
    Database loader.

    Tidak melakukan auto-join group,
    newsletter follow, atau aksi eksternal
    saat startup.
    */

    return true;
};


/*
============================================================
RESIZE
============================================================
*/

global.resize = async (
    image,
    ukur1 = 100,
    ukur2 = 100
) => {

    return new Promise(
        async (resolve, reject) => {

            try {

                const read =
                    await Jimp.read(
                        image
                    );

                const result =
                    await read
                        .resize(
                            ukur1,
                            ukur2
                        )
                        .getBufferAsync(
                            Jimp.MIME_JPEG
                        );

                resolve(result);

            } catch (e) {

                reject(e);
            }
        }
    );
};


/*
============================================================
HOT RELOAD
============================================================
*/

const file =
    require.resolve(__filename);

fs.watchFile(
    file,
    () => {

        fs.unwatchFile(file);

        console.log(
            chalk.white("• Update"),
            chalk.white(
                `${__filename}\n`
            )
        );

        delete require.cache[file];

        require(file);
    }
);
