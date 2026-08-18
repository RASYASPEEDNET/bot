require("dotenv").config();

/*
============================================================
NDZ BOT SETTINGS
============================================================
Semua data sensitif sebaiknya disimpan di file .env
dan JANGAN di-upload ke GitHub.
============================================================
*/

const setting = {

  /*
  ==========================================================
  BOT
  ==========================================================
  */

  botName:
    process.env.BOT_NAME || "NDZ BOT",

  ownerName:
    process.env.OWNER_NAME || "NDZ",

  ownerNumber:
    process.env.OWNER_NUMBER || "",

  prefix:
    process.env.PREFIX || ".",


  /*
  ==========================================================
  SESSION
  ==========================================================
  */

  sessionName:
    process.env.SESSION_NAME || "session",

  sessionDir:
    process.env.SESSION_DIR || "./session",


  /*
  ==========================================================
  API
  ==========================================================
  */

  apiUrl:
    process.env.API_URL || "",

  apiKey:
    process.env.API_KEY || "",


  /*
  ==========================================================
  CLOUDFLARE
  ==========================================================
  */

  cloudflareToken:
    process.env.CLOUDFLARE_TOKEN || "",


  /*
  ==========================================================
  GITHUB
  ==========================================================
  */

  githubToken:
    process.env.GITHUB_TOKEN || "",

  githubUsername:
    process.env.GITHUB_USERNAME || "",


  /*
  ==========================================================
  DATABASE
  ==========================================================
  */

  database:
    process.env.DATABASE_FILE ||
    "./collection/database.json",


  /*
  ==========================================================
  OTHER
  ==========================================================
  */

  timezone:
    process.env.TZ || "Asia/Jakarta",

  logLevel:
    process.env.LOG_LEVEL || "silent",

  development:
    process.env.NODE_ENV !== "production"

};

module.exports = setting;
