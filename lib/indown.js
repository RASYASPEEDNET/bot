const axios = require("axios")

const cheerio = require("cheerio")

async function indown(url) {

  try {

    const get = await axios.get("https://indown.io/en1")

    const cookie = get.headers["set-cookie"]

      .map(v => v.split(";")[0])

      .join("; ")

    const $ = cheerio.load(get.data)

    const token = $('input[name="_token"]').val()

    const res = await axios.post(

      "https://indown.io/download",

      new URLSearchParams({

        referer: "https://indown.io/en1",

        locale: "en",

        _token: token,

        link: url,

        p: "i"

      }).toString(),

      {

        headers: {

          "content-type": "application/x-www-form-urlencoded",

          origin: "https://indown.io",

          referer: "https://indown.io/en1",

          cookie,

          "user-agent": "Mozilla/5.0"

        }

      }

    )

    const $$ = cheerio.load(res.data)

    const media = $$("video source[src], a[href]")

      .map((_, e) => {

        let v = $$(e).attr("src") || $$(e).attr("href")

        if (!v) return null

        if (v.includes("indown.io/fetch")) {

          v = decodeURIComponent(new URL(v).searchParams.get("url"))

        }

        if (!/cdninstagram\.com|fbcdn\.net/.test(v)) return null

        return v.replace(/&dl=1$/, "")

      })

      .get()

      .filter((v, i, a) => v && a.indexOf(v) === i)[0]

    return media ? { status: true, url: media } : { status: false }

  } catch (e) {

    return { status: false, msg: e.message }

  }

}

module.exports = indown
