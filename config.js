const fs = require("fs");
require("dotenv").config();

module.exports = {
  //==========================================- MAIN - CONFIGS -==================================================================
  SESSION_ID: process.env.SESSION_ID || "iUFRQJxB#xyYBhs_jBrfJCItDJJw-whzwdYVw6FeN8RcuIijzyfc",
  // ADD Your Session Id 
  MONGODB: process.env.MONGODB || "",
    // ADD Your MongoDB Database URL
  PREFIX: process.env.PREFIX || ".",
  // Add Your Custom Prefix 
  mode: process.env.mode || "public",
  // Add Your Bot Mode 
  // private = Only Working For Owner Number
  // public = AnyOne Working
  // inbox = Only Working  Inbox
  // groups = only working in group
  OWNER_NUMBER: process.env.OWNER_NUMBER || "94702481115",
  //========================================- OTHER - CONFIGS -=====================================================================
  AUTO_VOICE: process.env.AUTO_VOICE || "false",
  ANTI_BAD_WORDS_ENABLED: process.env.ANTI_BAD_WORDS_ENABLED || "true",
  AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
  ANTI_BAD_WORDS: (process.env.ANTI_BAD_WORDS || "pakayo,huththo").split(','),
  ANTI_LINK: process.env.ANTILINK || "false",
  packname: process.env.packname || "🪄BHASHI",
  author: process.env.author || "BHASHI x VISHWA",
  //==========================================- API-CONFIGS -==========================================================
  OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY || "2d61a72574c11c4f36173b627f8cb177", //openweathermap.org
  ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY || "sk_6438bcc100d96458f8de0602aec662f4ba14b905fd090ad3", //elevenlabs.io
  SHODAN_API: process.env.SHODAN_API || "cbCkidr6qd7AFVaYs56MuCouGfM8gFki", //developer.shodan.io
  PEXELS_API_KEY: process.env.PEXELS_API_KEY || "39WCzaHAX939xiH22NCddGGvzp7cgbu1VVjeYUaZXyHUaWlL1LFcVFxH", // pexels.com
  OMDB_API_KEY: process.env.OMDB_API_KEY || "76cb7f39", // omdbapi.com
  PIXABAY_API_KEY: process.env.PIXABAY_API_KEY || "23378594-7bd620160396da6e8d2ed4d53", // pixabay.com
  ZIPCODEBASE_API_KEY: process.env.ZIPCODEBASE_API_KEY || "0f94a5f0-6ea4-11ef-81da-579be4fb031c", // zipcodebase.com
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "AIzaSyD93IeJsouK51zjKgyHAwBIAlqr-a8mnME", 
  GOOGLE_CX: process.env.GOOGLE_CX || "AIzaSyD93IeJsouK51zjKgyHAwBIAlqr-a8mnME", 
  PASTEBIN_API_KEY: process.env.PASTEBIN_API_KEY || "uh8QvO6vQJGtIug9WvjdTAPx_ZAFJAxn",























 //================ OWNERS ONLY DONT GO =================























  START_MSG: process.env.START_MSG || `
        ★ *ＢＨＡＳＨＩ-ＭＤ* ★
    ╴ *ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ᴡᴀ ʙᴏᴛ 🇱🇰* ╴

    \`A fast and responsive multi-device WhatsApp bot built using Baileys and various APIs. It offers seamless functionality without buttons, delivering quick and efficient performance for automated tasks and commands.\`

> 🚨 *ꜰᴏʟʟᴏᴡ ᴜꜱ* : https://whatsapp.com/channel/0029VaSaZd5CBtxGawmSph1k` ,

  ALIVE_IMG: process.env.ALIVE_IMG || "https://telegra.ph/file/d8279f4ca5da23bda7da4.jpg",
  MENU_IMG: process.env.MENU_IMG || "https://i.ibb.co/hRw1XK4/image.png",
  MENU_MSG: process.env.MENU_MSG || `*╭─ 「  𝐴𝐿𝐸𝑋-𝑀𝐷 」*
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
*╎➮ 11 𝑁𝑒𝑤𝑠 𝑀𝑒𝑛𝑢*
*╎➮ 12 𝐺𝑟𝑜𝑢𝑝 𝑀𝑒𝑛𝑢*
*╎➮ 13 𝐵𝑢𝑔 𝑀𝑒𝑛𝑢*
*╎➮ 14 𝑂𝑤𝑛𝑒𝑟 𝑀𝑒𝑛𝑢*
*╎➮ 15 𝐸𝒉𝑖 𝑀𝑒𝑛𝑢*
*╚──────────────┈┈*
*╭─ 「  𝑴𝒓 𝑨𝒍𝒆𝒙 𝑰𝒅  」*
*╰───────────────┈*
        ⏤͟͟͞͞★❬❬ 𝑼𝒑𝒅𝒂𝒕𝒆𝒔  ❭❭⏤͟͟͞͞★

> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★`,

};
