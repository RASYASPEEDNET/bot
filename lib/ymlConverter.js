const { Buffer } = require("buffer")

function b64decode(b64) {

  let s = b64.replace(/-/g, "+").replace(/_/g, "/")

  while (s.length % 4) s += "="

  return Buffer.from(s, "base64").toString()

}

module.exports = function convertYML(input) {

  input = input.trim()

  if (!input) return "❌ Masukkan link"

  if (

    !input.startsWith("vmess://") &&

    !input.startsWith("trojan://") &&

    !input.startsWith("vless://")

  ) {

    return "❌ Format tidak didukung\nGunakan vmess:// trojan:// vless://"

  }

  try {

    // ================= VMESS =================

    if (input.startsWith("vmess://")) {

      const j = JSON.parse(b64decode(input.replace("vmess://", "")))

      const port = j.port || 443

      return `

proxies:

  -

    type: vmess

    name: ${j.ps || "vmess"}

    server: ISI_BUG_DI_SINI

    port: ${port}

    uuid: ${j.id}

    alterId: ${j.aid || 0}

    cipher: auto

    tls: true

    servername: ${j.add}

    udp: true

    network: ws

    ws-opts:

      path: ${j.path || "/"}

      headers:

        Host: ${j.add}

`.trim()

    }

    // ================= TROJAN =================

    if (input.startsWith("trojan://")) {

      const u = new URL(input)

      const port = u.port || 443

      return `

proxies:

  -

    type: trojan

    name: ${u.hash.replace("#","") || "trojan"}

    server: ISI_BUG_DI_SINI

    port: ${port}

    password: ${u.username}

    sni: ${u.hostname}

    udp: true

    skip-cert-verify: true

`.trim()

    }

    // ================= VLESS =================

    if (input.startsWith("vless://")) {

      const u = new URL(input)

      const port = u.port || 443

      const sni = u.searchParams.get("sni") || u.hostname

      const path = u.searchParams.get("path") || "/"

      return `

proxies:

  -

    type: vless

    name: ${u.hash.replace("#","") || "vless"}

    server: ISI_BUG_DI_SINI

    port: ${port}

    uuid: ${u.username}

    tls: true

    servername: ${sni}

    udp: true

    network: ws

    ws-opts:

      path: ${path}

      headers:

        Host: ${sni}

`.trim()

    }

    return "❌ Format tidak dikenali"

  } catch (e) {

    return "❌ Link rusak / tidak valid"

  }

}
