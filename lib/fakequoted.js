const chalk = require("chalk");
const fs = require("fs");

module.exports = {
ai: {
  key: {
    remoteJid: '13135550002@s.whatsapp.net',
    fromMe: false,
    participant: '13135550002@s.whatsapp.net'
  },
  message: {
      extendedTextMessage: {
      text: 'by DIN-STORE'
      }
  }
}
}

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.white("Update New"), chalk.white(`${__filename}\n`))
delete require.cache[file]
require(file)
})
