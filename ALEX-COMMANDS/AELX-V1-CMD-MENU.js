const config = require('../config');
const { cmd, commands } = require('../command');
const checkAccess = require('../DATABASE/accessControl'); 
const pdfUrl = "https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg";
const axios = require('axios');
const fs = require('fs').promises; // Use fs.promises for async file operations

// Main Menu
const MENU_MSG = `*╭─ 「  𝐴𝐿𝐸𝑋-𝑀𝐷 」*
*╰────────────┈*
╭══════════════◈
┃「  𝐴𝐿𝐸𝑋-𝑀𝐷 𝑀𝐸𝑁𝑈 」
╰══════════════◈
*╭────────────┈◦•◦❥•*
*╎➮ 01 𝑀𝑎𝑖𝑛 𝑀𝑒𝑛𝑢*
*╎➮ 02 𝐷𝑜𝑤𝑛𝑙𝑜𝑎𝑑𝑒 𝑀𝑒𝑛𝑢*
*╎➮ 03 𝐶𝑜𝑛𝑣𝑒𝑟𝑡 𝑀𝑒𝑛𝑢*
*╎➮ 04  𝐴𝑖 𝑀𝑒𝑛𝑢*
*╎➮ 05 𝑆𝑒𝑎𝑟𝑐𝒉 𝑀𝑒𝑛𝑢*
*╎➮ 06 𝐹𝑢𝑛 𝑀𝑒𝑛𝑢* 
*╎➮ 07 18+ 𝑀𝑒𝑛𝑢*
*╎➮ 08 𝑈𝑠𝑒𝐹𝑢𝑙 𝑀𝑒𝑛𝑢*
*╎➮ 09 𝐿𝑜𝑔𝑜 𝑀𝑒𝑛𝑢*
*╎➮ 10 𝑀𝑜𝑣𝑖𝑒 𝑀𝑒𝑛𝑢*
*╎➮ 11 𝐴𝑛𝑖𝑚𝑒 𝑀𝑒𝑛𝑢*
*╎➮ 12 𝑁𝑒𝑤𝑠 𝑀𝑒𝑛𝑢*
*╎➮ 13 𝐺𝑟𝑜𝑢𝑝 𝑀𝑒𝑛𝑢*
*╎➮ 14 𝑃𝑟𝑒𝑚𝑖𝑢𝑚 𝑀𝑒𝑛𝑢*
*╎➮ 15 𝑂𝑤𝑛𝑒𝑟 𝑀𝑒𝑛𝑢*
*╎➮ 16 𝐸𝒉𝑖 𝑀𝑒𝑛𝑢*
*╎➮ 17 𝐵𝑢𝑔 𝑀𝑒𝑛𝑢*
*╚──────────────┈┈*
*╭─ 「  𝑴𝒓 𝑨𝒍𝒆𝒙 𝑰𝒅  」*
*╰───────────────┈*
        ⏤͟͟͞͞★❬❬ 𝑼𝒑𝒅𝒂𝒕𝒆𝒔  ❭❭⏤͟͟͞͞★

> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★`;

// Download Menu
const MAIN_MSG = `*╭─ 「  𝐴𝐿𝐸𝑋-𝑀𝐷- 」*
*╰────────────┈*
╭══════════════◈
┃「  𝑀𝐴𝐼𝑁 𝑀𝐸𝑁𝑈 」
╰══════════════◈
*╭────────────┈◦•◦❥•*
*╎➮ .𝑀𝑒𝑛𝑢*
*╎➮ .𝐴𝑙𝑖𝑣𝑒*
*╎➮ .𝐿𝑖𝑠𝑡*
*╎➮ .𝑃𝑖𝑛𝑔*
*╎➮ .𝑆𝑦𝑠𝑡𝑒𝑚*
*╎➮ .𝐷𝑒𝑣𝑒𝑙𝑜𝑝𝑒𝑟*
*╎➮ .𝑀𝑜𝑣𝑖𝑒 𝑀𝑒𝑛𝑢*
*╎➮ .𝐸𝒉𝑖 𝑀𝑒𝑛𝑢*
*╎➮ .𝑃𝑟𝑒𝑚𝑖𝑢𝑚 𝑀𝑒𝑛𝑢*
*╎➮ .𝐵𝑢𝑔 𝑀𝑒𝑛𝑢*
*╚──────────────┈┈*
*╭─ 「  𝑴𝒓 𝑨𝒍𝒆𝒙 𝑰𝒅  」*
*╰───────────────┈*
        ⏤͟͟͞͞★❬❬ 𝑼𝒑𝒅𝒂𝒕𝒆𝒔  ❭❭⏤͟͟͞͞★

> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★`;

// Converter Menu
const CONVERTER_MSG = `*乂  C O N V E R T   M E N U*

╭────────────────┈
│  ◦  Qr
│  ◦  Shorturl
│  ◦  Trt
│  ◦  Morse
│  ◦  Convert
│  ◦  Ebinary
│  ◦  Dbinary
│  ◦  Gitclone
╰────────────────┈`;

// AI Menu
const AI_MSG = `*乂  A I   M E N U*

╭────────────────┈
│  ◦  Ai
╰────────────────┈`;

// Search Menu
const SEARCH_MSG = `*乂  S E A R C H   M E N U*

╭────────────────┈
│  ◦  Yts
│  ◦  Wiki
│  ◦  Tech
│  ◦  Zip
│  ◦  Srepo
│  ◦  Lyrics
│  ◦  Itune
│  ◦  Npm
│  ◦  Define
│  ◦  Cric
│  ◦  Colour
│  ◦  Githubstalk
╰────────────────┈`;

// Fun Menu
const FUN_MSG = `*乂  F U N   M E N U*

╭────────────────┈
│  ◦  Gif
│  ◦  Joke
│  ◦  Mysterybox
│  ◦  Predict
│  ◦  Genderize
│  ◦  Nationalize
│  ◦  Fact
│  ◦  Hack
│  ◦  Studyhelper
│  ◦  Dog
│  ◦  Rcolor
│  ◦  Rcoffee
│  ◦  Ranime
│  ◦  Rcosplay
│  ◦  Rwaifu
│  ◦  Rhusbu
│  ◦  Rimg
│  ◦  Rvideo
╰────────────────┈`;

// NSFW Menu
const NSFW_MSG = `*乂  1 8 +   M E N U*

╭────────────────┈
│  ◦  Xnxx
│  ◦  Xnxxdl
│  ◦  Hentaivid
│  ◦  Nsfwloli
│  ◦  Nsfwfoot
│  ◦  Nsfwass
│  ◦  Nsfwbdsm
│  ◦  Nsfwero
│  ◦  Nsfwfemdom
│  ◦  Nsfwglass
│  ◦  Hentai
│  ◦  Tetas
│  ◦  Booty
│  ◦  Ecchi
│  ◦  Furro
│  ◦  Trapito
│  ◦  Imagenlesbians
│  ◦  Panties
│  ◦  Pene
│  ◦  Prono
│  ◦  Rendomxxx
│  ◦  Pechos
│  ◦  Yaoi2
│  ◦  Yuri2
│  ◦  Hentai2
│  ◦  Trap
│  ◦  Hneko
│  ◦  Belowjob
│  ◦  Coustomnafw
╰────────────────┈`;

// Useful Menu
const USEFUL_MSG = `*乂  U S E F U L   M E N U*

╭────────────────┈
│  ◦  Binance
│  ◦  Wa
│  ◦  Slove
│  ◦  Jid
│  ◦  Dnslookup
│  ◦  Countdown
│  ◦  Checkpw
│  ◦  Userinfo
│  ◦  Ipgeo
│  ◦  Whois
│  ◦  Header
│  ◦  Weather
│  ◦  Gpass
│  ◦  Newpaste
│  ◦  Getpaste
╰────────────────┈`;

// Logo Menu
const LOGO_MSG = `*乂  L O G O   M E N U*

╭────────────────┈
│  ◦  Alert
│  ◦  Unforgivable
│  ◦  Pikachu
│  ◦  Caution
│  ◦  Drake
│  ◦  Pooh
│  ◦  Sadcat
│  ◦  Oogway
╰────────────────┈`;

// Movie Menu
const MOVIE_MSG = `*乂  M O V I E   M E N U*

╭────────────────┈
│  ◦  Movie
│  ◦  Upcomingmovie
│  ◦  Rendommovie
│  ◦  Topmovie
│  ◦  Anime
│  ◦  Topanime
│  ◦  Upcominganime
╰────────────────┈`;

// News Menu
const NEWS_MSG = `*乂  N E W S   M E N U*

╭────────────────┈
│  ◦  News
│  ◦  News2
│  ◦  Esana
│  ◦  Esanalist
│  ◦  Iosnews
│  ◦  Listiosnews
╰────────────────┈`;

// Placeholder Menus (currently empty)
const GROUP_MSG = ` *乂  G R O U P   M E N U*

╭────────────────┈
│  ◦  Promote
│  ◦  Demote
│  ◦  add
│  ◦  Tagall
│  ◦  Seticon
│  ◦  Setsubject
│  ◦  Removeall
│  ◦  Setdesc
│  ◦  Hidetag
│  ◦  Mute
│  ◦  Unmute
│  ◦  Kick
│  ◦  Groupinfo
│  ◦  Getpic
│  ◦  Setgoodbye
│  ◦  Setwelcome
╰────────────────┈ `;
const PREMIUM_MSG = ` *乂  V I P  B U G   M E N U*

╭────────────────┈
│  ◦  Virtext1
│  ◦  Virtext2
│  ◦  Virtext3
│  ◦  Virtext4
│  ◦  Bug
│  ◦  Bug1
│  ◦  Bug2
│  ◦  Binario
╰────────────────┈ `;
const OWNER_MSG = ` *乂  O W N E R   M E N U*

╭────────────────┈
│  ◦  Autobio
│  ◦  Restart
│  ◦  Update
│  ◦  Upgrade
│  ◦  Setowner
│  ◦  Removeowner
│  ◦  Antilink
│  ◦  Ban
│  ◦  Unban
│  ◦  Setbotname
│  ◦  Setbotbio
│  ◦  Block
│  ◦  Unblock
│  ◦  Setpp
│  ◦  Setautobio
│  ◦  Broadcast
│  ◦  Join
│  ◦  Left
╰────────────────┈ `;
//=============================================================================================================================
cmd({
    pattern: "menu",
    desc: "get menu list.",
    category: "main",
    react: "📑",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/vishwamihiranga/BHASHI-PUBLIC/raw/main/ui%20(1).mp3' },
            mimetype: 'audio/mpeg',
            ptt: true
        }, { quoted: mek });
        // Use a direct image URL instead of Base64
        const thumbnailUrl = 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg'; // Direct URL to your image

        return await conn.sendMessage(from, {
            document: { url: pdfUrl }, // Path to your PDF file
            fileName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃', // Filename for the document
            mimetype: "application/pdf",
            fileLength: 99999999999999,
            pageCount: 2024,
            caption: config.MENU_MSG,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
                    newsletterJid: "120363285813931317@newsletter",
                },
                externalAdReply: {
                    title: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
                    body: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃​',
                    thumbnailUrl: thumbnailUrl, // Use the URL directly here
                    sourceUrl: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});


//=============================================================================================================================



cmd({
    pattern: "1",
    alias: ["01"],
    desc: "get menu list.",
    category: "main",
    react: "🎗️",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
            const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
return await conn.sendMessage(from, {
      document: { url: pdfUrl }, // Path to your PDF file
      fileName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃', // Filename for the document
      mimetype: "application/pdf",
      fileLength: 99999999999999,
      pageCount: 2024,
      caption: MAIN_MSG,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          newsletterJid: "120363333519565664@newsletter",
        },
        externalAdReply: {
          title: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          body: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    })
}catch(e){
console.log(e)
reply(`${e}`)
}
})//=============================================================================================================================
cmd({
    pattern: "2",
    alias: ["02"],
    desc: "get menu list.",
    category: "main",
    react: "🎗️",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
            const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
return await conn.sendMessage(from, {
      document: { url: pdfUrl }, // Path to your PDF file
      fileName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃', // Filename for the document
      mimetype: "application/pdf",
      fileLength: 99999999999999,
      pageCount: 2024,
      caption: DL_MSG,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          newsletterJid: "120363285813931317@newsletter",
        },
        externalAdReply: {
          title: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          body: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃​',
          thumbnailUrl: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          sourceUrl: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    })
}catch(e){
console.log(e)
reply(`${e}`)
}
})
//=============================================================================================================================
cmd({
    pattern: "3",
    alias: ["03"],
    desc: "get menu list.",
    category: "main",
    react: "🎗️",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
            const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
return await conn.sendMessage(from, {
      document: { url: pdfUrl }, // Path to your PDF file
      fileName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃', // Filename for the document
      mimetype: "application/pdf",
      fileLength: 99999999999999,
      pageCount: 2024,
      caption: CONVERTER_MSG,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          newsletterJid: "120363285813931317@newsletter",
        },
        externalAdReply: {
          title: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          body: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    })
}catch(e){
console.log(e)
reply(`${e}`)
}
})
//=============================================================================================================================
cmd({
    pattern: "4",
    alias: ["04"],
    desc: "get menu list.",
    category: "main",
    react: "🎗️",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
            const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
return await conn.sendMessage(from, {
      document: { url: pdfUrl }, // Path to your PDF file
      fileName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃', // Filename for the document
      mimetype: "application/pdf",
      fileLength: 99999999999999,
      pageCount: 2024,
      caption: AI_MSG,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          newsletterJid: "120363285813931317@newsletter",
        },
        externalAdReply: {
          title: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          body: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    })
}catch(e){
console.log(e)
reply(`${e}`)
}
})
//=============================================================================================================================
cmd({
    pattern: "5",
    alias: ["05"],
    desc: "get menu list.",
    category: "main",
    react: "🎗️",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
            const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
return await conn.sendMessage(from, {
      document: { url: pdfUrl }, // Path to your PDF file
      fileName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃', // Filename for the document
      mimetype: "application/pdf",
      fileLength: 99999999999999,
      pageCount: 2024,
      caption: SEARCH_MSG,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          newsletterJid: "120363285813931317@newsletter",
        },
        externalAdReply: {
          title: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          body: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃​',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    })
}catch(e){
console.log(e)
reply(`${e}`)
}
})
//=============================================================================================================================
cmd({
    pattern: "6",
    alias: ["06"],
    desc: "get menu list.",
    category: "main",
    react: "🎗️",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
            const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
return await conn.sendMessage(from, {
      document: { url: pdfUrl }, // Path to your PDF file
      fileName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃', // Filename for the document
      mimetype: "application/pdf",
      fileLength: 99999999999999,
      pageCount: 2024,
      caption: FUN_MSG,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          newsletterJid: "120363285813931317@newsletter",
        },
        externalAdReply: {
          title: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          body: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃​',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    })
}catch(e){
console.log(e)
reply(`${e}`)
}
})
//=============================================================================================================================
cmd({
    pattern: "7",
    alias: ["07"],
    desc: "get menu list.",
    category: "main",
    react: "🎗️",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
            const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
return await conn.sendMessage(from, {
      document: { url: pdfUrl }, // Path to your PDF file
      fileName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃', // Filename for the document
      mimetype: "application/pdf",
      fileLength: 99999999999999,
      pageCount: 2024,
      caption: NSFW_MSG,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          newsletterJid: "120363285813931317@newsletter",
        },
        externalAdReply: {
          title: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          body: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃​',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    })
}catch(e){
console.log(e)
reply(`${e}`)
}
})
//=============================================================================================================================

cmd({
    pattern: "8",
    alias: ["08"],
    desc: "get menu list.",
    category: "main",
    react: "🎗️",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
            const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
return await conn.sendMessage(from, {
      document: { url: pdfUrl }, // Path to your PDF file
      fileName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃', // Filename for the document
      mimetype: "application/pdf",
      fileLength: 99999999999999,
      pageCount: 2024,
      caption: USEFUL_MSG,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          newsletterJid: "120363285813931317@newsletter",
        },
        externalAdReply: {
          title: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          body: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          thumbnailUrl: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          sourceUrl: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    })
}catch(e){
console.log(e)
reply(`${e}`)
}
})
//=============================================================================================================================

cmd({
    pattern: "9",
    alias: ["09"],
    desc: "get menu list.",
    category: "main",
    react: "🎗️",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
            const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
return await conn.sendMessage(from, {
      document: { url: pdfUrl }, // Path to your PDF file
      fileName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃', // Filename for the document
      mimetype: "application/pdf",
      fileLength: 99999999999999,
      pageCount: 2024,
      caption: LOGO_MSG,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          newsletterJid: "120363285813931317@newsletter",
        },
        externalAdReply: {
          title: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          body: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃​',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    })
}catch(e){
console.log(e)
reply(`${e}`)
}
})
//=============================================================================================================================
cmd({
    pattern: "10",
    desc: "get menu list.",
    category: "main",
    react: "🎗️",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
            const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
return await conn.sendMessage(from, {
      document: { url: pdfUrl }, // Path to your PDF file
      fileName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃', // Filename for the document
      mimetype: "application/pdf",
      fileLength: 99999999999999,
      pageCount: 2024,
      caption: MOVIE_MSG,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          newsletterJid: "120363285813931317@newsletter",
        },
        externalAdReply: {
          title: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          body: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    })
}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "11",
    desc: "get menu list.",
    category: "main",
    react: "🎗️",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
            const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
return await conn.sendMessage(from, {
      document: { url: pdfUrl }, // Path to your PDF file
      fileName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃', // Filename for the document
      mimetype: "application/pdf",
      fileLength: 99999999999999,
      pageCount: 2024,
      caption: ANIME_MSG,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          newsletterJid: "120363285813931317@newsletter",
        },
        externalAdReply: {
          title: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          body: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    })
}catch(e){
console.log(e)
reply(`${e}`)
}
})


cmd({
    pattern: "12",
    desc: "get menu list.",
    category: "main",
    react: "🎗️",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
            const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
return await conn.sendMessage(from, {
      document: { url: pdfUrl }, // Path to your PDF file
      fileName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃', // Filename for the document
      mimetype: "application/pdf",
      fileLength: 99999999999999,
      pageCount: 2024,
      caption: NEWS_MSG,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          newsletterJid: "120363285813931317@newsletter",
        },
        externalAdReply: {
          title: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          body: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    })
}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "13",
    desc: "get menu list.",
    category: "main",
    react: "🎗️",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
            const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
return await conn.sendMessage(from, {
      document: { url: pdfUrl }, // Path to your PDF file
      fileName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃', // Filename for the document
      mimetype: "application/pdf",
      fileLength: 99999999999999,
      pageCount: 2024,
      caption: GROUP_MSG,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          newsletterJid: "120363285813931317@newsletter",
        },
        externalAdReply: {
          title: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          body: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃​',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    })
}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "14",
    desc: "get menu list.",
    category: "main",
    react: "🎗️",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
            const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
return await conn.sendMessage(from, {
      document: { url: pdfUrl }, // Path to your PDF file
      fileName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃', // Filename for the document
      mimetype: "application/pdf",
      fileLength: 99999999999999,
      pageCount: 2024,
      caption: PREMIUM_MSG,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          newsletterJid: "120363285813931317@newsletter",
        },
        externalAdReply: {
          title: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          body: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃​',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    })
}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "15",
    desc: "get menu list.",
    category: "main",
    react: "🎗️",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
            const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
return await conn.sendMessage(from, {
      document: { url: pdfUrl }, // Path to your PDF file
      fileName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃', // Filename for the document
      mimetype: "application/pdf",
      fileLength: 99999999999999,
      pageCount: 2024,
      caption: OWNER_MSG,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          newsletterJid: "120363285813931317@newsletter",
        },
        externalAdReply: {
          title: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          body: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    })
}catch(e){
console.log(e)
reply(`${e}`)
}
})
