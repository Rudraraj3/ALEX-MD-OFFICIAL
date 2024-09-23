const {
default: makeWASocket,
useMultiFileAuthState,
DisconnectReason,
jidNormalizedUser,
getContentType,
fetchLatestBaileysVersion,
Browsers
} = require('@whiskeysockets/baileys')

const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('./DATABASE/functions')
const fs = require('fs')
const P = require('pino')
const config = require('./config')
const qrcode = require('qrcode-terminal')
const util = require('util')
const { sms,downloadMediaMessage } = require('./DATABASE/msg')
const axios = require('axios')
const { File } = require('megajs')
const prefix = '.'

const ownerNumber = ['94702481115']

//===================SESSION-AUTH============================
if (!fs.existsSync(__dirname + '/ALEX-SESSION/creds.json')) {
if(!config.SESSION_ID) return console.log('Please add your session to SESSION_ID env !!')
const sessdata = config.SESSION_ID
const filer = File.fromURL(`https://mega.nz/file/${sessdata}`)
filer.download((err, data) => {
if(err) throw err
fs.writeFile(__dirname + '/ALEX-SESSION/creds.json', data, () => {
console.log("ALEX-MD SESSION ID DOWNLOADED 🔰✅")
})})}

const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

//=============================================

async function connectToWA() {
console.log("🧬 CONNECTING WA...");
const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/ALEX-SESSION/')
var { version } = await fetchLatestBaileysVersion()

const conn = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: false,
        browser: Browsers.macOS("Safari"),
        syncFullHistory: true,
        auth: state,
        version
        })

conn.ev.on('connection.update', (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
connectToWA()
}
} else if (connection === 'open') {
console.log('⚜ BHASHI INSTALING.... ')
const path = require('path');
fs.readdirSync("./ALEX-COMMANDS/").forEach((plugin) => {
if (path.extname(plugin).toLowerCase() == ".js") {
require("./ALEX-COMMANDS/" + plugin);
}
});
console.log('COMMANDS DOWNLOADED 💌')
console.log('ALEX-MD CONNETED TO WA 💥💝')

let up = config.START_MSG;

conn.sendMessage(ownerNumber + "@s.whatsapp.net", { image: { url: `https://i.ibb.co/Gpqn5T4/image.png` }, caption: up })

}
})
conn.ev.on('creds.update', saveCreds)  

conn.ev.on('messages.upsert', async(mek) => {
mek = mek.messages[0]
if (!mek.message) return	
mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_READ_STATUS === "true"){
await conn.readMasseges([mek.key])
}      
const m = sms(conn, mek)
const type = getContentType(mek.message)
const content = JSON.stringify(mek.message)
const from = mek.key.remoteJid
const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''
const isCmd = body.startsWith(prefix)
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
const args = body.trim().split(/ +/).slice(1)
const q = args.join(' ')
const isGroup = from.endsWith('@g.us')
const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
const senderNumber = sender.split('@')[0]
const botNumber = conn.user.id.split(':')[0]
const pushname = mek.pushName || 'Sin Nombre'
const isMe = botNumber.includes(senderNumber)
const isOwner = ownerNumber.includes(senderNumber) || isMe
const botNumber2 = await jidNormalizedUser(conn.user.id);
const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => {}) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false
const isAdmins = isGroup ? groupAdmins.includes(sender) : false
const isReact = m.message.reactionMessage ? true : false
const reply = (teks) => {
conn.sendMessage(from, { text: teks }, { quoted: mek })
}

conn.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
              let mime = '';
              let res = await axios.head(url)
              mime = res.headers['content-type']
              if (mime.split("/")[1] === "gif") {
                return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options }, { quoted: quoted, ...options })
              }
              let type = mime.split("/")[0] + "Message"
              if (mime === "application/pdf") {
                return conn.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options }, { quoted: quoted, ...options })
              }
              if (mime.split("/")[0] === "image") {
                return conn.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options }, { quoted: quoted, ...options })
              }
              if (mime.split("/")[0] === "video") {
                return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options }, { quoted: quoted, ...options })
              }
              if (mime.split("/")[0] === "audio") {
                return conn.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options }, { quoted: quoted, ...options })
              }
            }  

//=========================WORK-TYPE=========================//
//update acessControl.js 
//=================AUTO-VOICE=======================  
if (config.AUTO_VOICE === "true") {
  let {
    data
  } = await axios.get("https://github.com/vishwamihi/AUTO_VOICE/raw/main/auto_voice");
  for (vr in data) {
    if (new RegExp("\\b" + vr + "\\b", 'gi').test(body)) {
      conn.sendMessage(from, {
        'audio': {
          'url': data[vr]
        },
        'mimetype': "audio/mpeg",
        'ptt': true
      }, {
        'quoted': mek
      });
    }
  }
}
//=========================ANTI BAD WORD=========================
if (isGroup && config.ANTI_BAD_WORDS_ENABLED) {
    if (config.ANTI_BAD_WORDS) {
        const badWords = config.ANTI_BAD_WORDS;
        const bodyLower = body.toLowerCase();

        // Check if the sender is an admin or the bot itself
        if (!isAdmins && !isOwner) {
            for (const word of badWords) {
                if (bodyLower.includes(word.toLowerCase())) {
                    // Notify the group and delete the message
                    await conn.sendMessage(from, { text: "🚩 Don't use any bad words!" }, { quoted: mek });
                    await conn.sendMessage(from, { delete: mek.key });
                    return; // Exit early if a bad word is found
                }
            }
        }
    }
}
//=========================ANTI-LINK=========================
if (isGroup && config.ANTI_LINK) {
    // Define patterns for chat.whatsapp.com links
    const chatLinkPattern = /chat\.whatsapp\.com\/(g|gb)\/[A-Z0-9]{5,}/i;

    // Check if the message contains a chat.whatsapp.com link
    if (chatLinkPattern.test(body)) {
        // Check if the sender is an admin or the bot itself
        if (!isBotAdmins && !isAdmins && !isOwner) {
            // Send a warning message and delete the message
            await conn.sendMessage(from, { text: '🚩 Links are not allowed in this group!' }, { quoted: mek });
            await conn.sendMessage(from, { delete: mek.key });
        } else if (!isBotAdmins) {
            // Notify that the bot is not an admin
            await conn.sendMessage(from, { text: '🚩 I am not an admin, so I cannot delete messages with links.' }, { quoted: mek });
        }
        return; // Exit early if a link is found
    }
}

//=============================================  
if(senderNumber.includes("94702481115")){
if(isReact) return
m.react("👨‍💻")
}    


//=============================================         

const events = require('./command')
const cmdName = isCmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;
if (isCmd) {
const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
if (cmd) {
if (cmd.react) conn.sendMessage(from, { react: { text: cmd.react, key: mek.key }})

try {
cmd.function(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply});
} catch (e) {
console.error("[PLUGIN ERROR] " + e);
}
}
}
events.commands.map(async(command) => {
if (body && command.on === "body") {
command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
} else if (mek.q && command.on === "text") {
command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
} else if (
(command.on === "image" || command.on === "photo") &&
mek.type === "imageMessage"
) {
command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
} else if (
command.on === "sticker" &&
mek.type === "stickerMessage"
) {
command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply})
}});
//=========================================================================== 

})
}
app.get("/", (req, res) => res.sendFile(require('path').join(__dirname, "./index.html")));
app.listen(port, () => console.log(`BHASHI-MD SERVER RUNING :http://localhost:${port}`));
setTimeout(() => {
connectToWA()
}, 4000);  
