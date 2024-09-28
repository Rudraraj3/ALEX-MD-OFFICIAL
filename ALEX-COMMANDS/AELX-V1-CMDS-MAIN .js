
const axios = require('axios');
const fs = require('fs').promises; // Use fs.promises for async file operations
const whois = require('whois')
const { tiktokdl } = require('tiktokdl')
const path = require('path');
const { cmd, commands } = require('../command');
const config = require('../config');
const yts = require('yt-search');
const zxcvbn = require('zxcvbn')
const crypto = require('crypto');
const dyluxApi = require("api-dylux");
const cheerio = require('cheerio');
const https = require('https')
const { pipeline } = require('stream');
const { promisify } = require('util');
const streamPipeline = promisify(pipeline);
const NineGag = require('9gag');
const Scraper = NineGag.Scraper;
const { Buffer } = require('buffer');
const os = require('os');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, fetchJson , runtime ,sleep } = require('../DATABASE/functions')
const mysteryItems = [
    'A shiny new toy!',
    'A magical potion!',
    'A golden coin!',
    'A rare gem!',
    'An ancient scroll!',
    'A secret message!',
    'A beautiful flower!',
    'A cute plushie!',
    'A special key!',
    'A futuristic gadget!'
];
const morseCodeMap = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.',
    'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.',
    'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-',
    'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..', '1': '.----',
    '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', '0': '-----', ' ': '/'
};
const math = require('mathjs');
const PASTEBIN_API_KEY = config.PASTEBIN_API_KEY 
const dns = require('dns');
const {Sticker, createSticker, StickerTypes} = require("wa-sticker-formatter");
const fg = require('api-dylux');
const gsmarena = require('gsmarena-api');
const checkAccess = require('../DATABASE/accessControl'); 
const mono = "```"
const sai = "6467ad0b29"
const fetch = require('node-fetch');
const API_URL = 'https://api.polygon.io/v2/reference/news';
const API_KEY = 'Y4iTYoJANwppB8I3Bm4QVWdV5oXlvc45';
const API2_URL = 'https://api.polygon.io/v1/marketstatus/now';
const CRIC_URL = 'https://api.cricapi.com/v1/currentMatches';
const CRIC_KEY = 'f68d1cb5-a9c9-47c5-8fcd-fbfe52bace78';
const API_BASE_URL = 'https://api.memegen.link';
const Esana = require("@sl-code-lords/esana-news");
const api = new Esana();
const { IOSNEWS } = require('ios-news');
const apisg = "https://prabath-md-api.up.railway.app/api/" 
const pdfUrl = "https://i.ibb.co/5rm6dLz/image.png";





//======================================================================================================================
cmd({
    pattern: "ttp",
    desc: "Generate a text-to-image with Delirius API.",
    react: "🖼️",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, args, reply, q }) => {
    try {
                const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        if (!q) return reply("🪄 Please provide text to generate the image!");

        const text = encodeURIComponent(q);
        const apiUrl = `https://deliriusapi-official.vercel.app/canvas/ttp?text=${text}&color=white`;

        const response = await fetch(apiUrl);
        if (!response.ok) return reply("❌ Error generating image.");

        const imageUrl = await response.url;

        // Send the generated image
        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: "> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★"
        });

    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});
//======================================================================================================================
cmd({
    pattern: "threads",
    desc: "Download Threads media.",
    react: "📸",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, args, reply, q }) => {
    try {
                const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        if (!q) return reply("🪄 Please provide a Threads post URL!");

        const apiUrl = `https://deliriusapi-official.vercel.app/download/threads?url=${encodeURIComponent(q)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data || !data.data) return reply("❌ Error fetching data. Please check the URL.");

        const { username, avatar_image, description, media } = data.data;

        // Prepare the message
        const message = `> 📸 *Username*: ${username}
> 📝 *Description*: ${description || "No Description"}
`;

        // Send the message with profile information
        await conn.sendMessage(from, {
            image: { url: avatar_image }, // Use 'url' to specify the image
            caption: message // 'caption' for the text
        });

        // Send each media file
        for (const item of media) {
            if (item.type === "image") {
                await conn.sendMessage(from, {
                    image: { url: item.url },
                    caption: `${username}'s Media\n\n> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★`
                });
            }
        }

    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});

//======================================================================================================================
cmd({
  pattern: "tiktok2",
  desc: "Download TikTok videos.",
  react: "🎵",
  category: "download",
  filename: __filename
}, async (conn, mek, m, { from, args, reply, q }) => {
  try {
              const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
      if (!q) return reply("🪄 Please provide a TikTok video URL!");

      const apiUrl = `https://deliriusapi-official.vercel.app/download/tiktok?url=${encodeURIComponent(q)}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data || !data.data) return reply("❌ Error fetching data. Please check the URL.");

      const { title, duration, author, music, meta } = data.data;

      if (!meta || !meta.media || meta.media.length === 0) {
          return reply("❌ No media found for this TikTok.");
      }

      const video = meta.media[0];
      const videoUrl = video.org; // Original video URL

      let desc = `> 🎵 *Title*: ${title || "No Title"}
> ⏳ *Duration*: ${duration} seconds
> 👤 *Author*: ${author.nickname} (@${author.username})
> 🎶 *Music*: ${music.title} by ${music.author}
> 🔗 *Download URL*: ${videoUrl}`;

      // Sending video details and the download link
      await conn.sendMessage(from, {
          document: { url: videoUrl }, // You can choose to send a thumbnail or the video file directly
          fileName: 'TikTok Video',
          mimetype: "video/mp4",
          caption: desc,
          contextInfo: {
              externalAdReply: {
                  title: title || "TikTok Video",
                  thumbnailUrl: video.wm || "default_thumbnail_url",
                  sourceUrl: videoUrl,
                  mediaType: 2,
                  renderLargerThumbnail: true
              }
          }
      });

  } catch (e) {
      console.error(e);
      reply(`An error occurred: ${e.message}`);
  }
});
//======================================================================================================================
cmd({
    pattern: "channel",
    desc: "Get information about the official channels.",
    category: "info",
    react: "📢",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    const senderNumber = m.sender;
    const isGroup = m.isGroup || false;

    if (!checkAccess(senderNumber, isGroup)) {
        return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode!*");
    }

    const channelInfo = `
📢 *Official Channels* 📢
Stay updated with our latest news and announcements:

- *📣 WhatsApp Channel*: https://whatsapp.com/channel/0029Vajj591JUM2RT8xtig2U
    `;
    reply(channelInfo);
});
//======================================================================================================================
// Command for session management
cmd({
    pattern: "session",
    desc: "Get information about session management.",
    category: "info",
    react: "🔑",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    const senderNumber = m.sender;
    const isGroup = m.isGroup || false;

    if (!checkAccess(senderNumber, isGroup)) {
        return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode!*");
    }

    const sessionInfo = `
🔑 *Session Management* 🔑
You can manage your sessions using the following resources:

- *📑 Session ID*: https://impossible-lorita-vishwa22-2c19088a.koyeb.app/
    `;
    reply(sessionInfo);
});
//======================================================================================================================
// Command for official website
cmd({
    pattern: "web",
    desc: "Get the official website link.",
    category: "info",
    react: "🌐",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    const senderNumber = m.sender;
    const isGroup = m.isGroup || false;

    if (!checkAccess(senderNumber, isGroup)) {
        return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode!*");
    }

    const webInfo = `
🌐 *Official Website* 🌐
Visit our official website for more information and resources:

- *🔗 Website*: https://alex-id-programmer.vercel.app/
    `;
    reply(webInfo);
});
//======================================================================================================================
cmd({
    pattern: "repo",
    desc: "Get the link to the official GitHub repository along with stats.",
    category: "info",
    react: "📂",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    const repoUrl = 'https://api.github.com/ALEX-ID-LK/ALEX-MD-V1'; // Replace with your repository owner and name

    try {
                const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        const response = await axios.get(repoUrl);
        const { stargazers_count, forks_count, open_issues_count, contributors_url } = response.data;

        // Fetch contributors count
        const contributorsResponse = await axios.get(contributors_url);
        const contributors_count = contributorsResponse.data.length;

        const repoInfo = `
📂 *GitHub Repository* 📂
You can find the source code and contribute to the project here:

- *🧾 GitHub Repository*: https://github.com/vishwamihiranga/BHASHI-MD-PAIR-CODE
- ⭐ *Stars*: ${stargazers_count}
- 🍴 *Forks*: ${forks_count}
- 🛠 *Open Issues*: ${open_issues_count}
- 🚀 *Contributors*: ${contributors_count}

Feel free to star the project and contribute!
        `;
        reply(repoInfo);
    } catch (error) {
        reply("❌ Failed to fetch repository data. Please try again later.");
    }
});

//======================================================================================================================
cmd({
    pattern: "wattpadsearch",
    alias: ["wpsearch", "wattpad"],
    desc: "📚 Search for Wattpad stories",
    category: "tools",
    react: "📖",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        if (!q) {
            return reply("❗ *Please provide a search query for Wattpad stories.*\n\nExample: .wattpadsearch <query>");
        }

        // User's search query
        const searchQuery = encodeURIComponent(q.trim());

        // API endpoint for Wattpad search
        const wattpadSearchUrl = `https://api.giftedtechnexus.co.ke/api/search/wattpad?query=${searchQuery}&apikey=ibrahimtech_ai`;

        // Call the API
        reply("⏳ *Searching Wattpad stories... Please wait.*");
        const response = await axios.get(wattpadSearchUrl);

        // Check if the response contains results
        if (response.status === 200 && response.data && response.data.results && response.data.results.length > 0) {
            let resultText = "📚 *Wattpad Search Results* 📚\n\n";

            // Limit results to 10
            const results = response.data.results.slice(0, 10);

            // Iterate through each story in the results
            results.forEach((story, index) => {
                resultText += `📖 *Title*: ${story.tittle}\n`;
                resultText += `👀 *Reads*: ${story.reads}\n`;
                resultText += `❤️ *Likes*: ${story.likes}\n`;
                resultText += `🔗 *Link*: ${story.link}\n`;
                resultText += `🖼️ *Thumbnail*: ${story.thumbnail}\n\n`;
            });

            // Send the search results to the user
            reply(resultText);
        } else {
            reply("❗ *No stories found for the given query.*");
        }
    } catch (error) {
        console.error(error);
        reply("❗ *An error occurred while searching for Wattpad stories.*");
    }
});
//======================================================================================================================
cmd({
    pattern: "removebg",
    alias: ["rmbg", "bgremove"],
    desc: "🖼️ Remove background from an image",
    category: "tools",
    react: "🖼️",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
                const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        if (!q) {
            return reply("❗ *Please provide an image URL to remove the background.*\n\nExample: .removebg <image-url>");
        }

        // Image URL from user input
        const imageUrl = q.trim();

        // API endpoint
        const removeBgUrl = `https://api.giftedtechnexus.co.ke/api/tools/removebg?url=${imageUrl}&apikey=ibrahimtech_ai`;

        // Call the API
        reply("⏳ *Removing background... Please wait.*");
        const response = await axios.get(removeBgUrl, { responseType: 'arraybuffer' });

        if (response.status === 200) {
            // Send the image with the background removed
            const buffer = Buffer.from(response.data, 'binary');
            await conn.sendMessage(from, { image: buffer, caption: "🖼️ *Here is your image with the background removed!*" }, { quoted: mek });
        } else {
            reply("❗ *Failed to remove the background. Please try again later.*");
        }
    } catch (error) {
        console.error(error);
        reply("❗ *An error occurred while processing the image.*");
    }
});

//======================================================================================================================
cmd({
    pattern: "fancytext",
    alias: ["fancy", "textstyle"],
    desc: "🎨 Convert text to fancy style using an API",
    category: "tools",
    react: "🎨",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        // Assuming checkAccess is a function to verify user access
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }

        if (!q) {
            return reply("❗ *Please provide text to style.*\n\nExample: .fancytext <your-text>");
        }

        // Text provided by the user
        const text = encodeURIComponent(q.trim());
        const fancyUrl = `https://api.giftedtechnexus.co.ke/api/tools/fancy?text=${text}&apikey=ibrahimtech_ai`;

        // Call the API
        reply("⏳ *Generating fancy text... Please wait.*");
        const response = await axios.get(fancyUrl);

        if (response.status === 200 && response.data && response.data.results) {
            // Loop through the results and build the fancy text response
            let fancyTextResult = "🎨 *Fancy Text Styles:*\n\n";
            response.data.results.forEach((item, index) => {
                fancyTextResult += `${index + 1}. ${item.result}\n\n`;
            });

            // Send the fancy text styles back to the user
            await conn.sendMessage(from, { text: fancyTextResult }, { quoted: mek });
        } else {
            reply("❗ *Failed to generate fancy text. Please try again later.*");
        }
    } catch (error) {
        console.error(error);
        reply("❗ *An error occurred while generating the fancy text.*");
    }
});
//======================================================================================================================
cmd({
    pattern: "encryptcode",
    alias: ["enc", "encrypt"],
    desc: "🔐 Encrypt code using an API",
    category: "tools",
    react: "🔐",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
                const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        if (!q) {
            return reply("❗ *Please provide code to encrypt.*\n\nExample: .encryptcode <your-code>");
        }

        // Code provided by the user
        const code = encodeURIComponent(q.trim());

        // API endpoint for encryption
        const encryptUrl = `https://api.giftedtechnexus.co.ke/api/tools/encrypt?code=${code}&apikey=ibrahimtech_ai`;

        // Call the API
        reply("⏳ *Encrypting your code... Please wait.*");
        const response = await axios.get(encryptUrl);

        if (response.status === 200 && response.data) {
            // Send the encrypted code back to the user
            const encryptedCode = response.data.encrypted_code;
            await conn.sendMessage(from, { text: `🔐 *Encrypted Code:*\n\n\`\`\`${encryptedCode}\`\`\`\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}` }, { quoted: mek });
        } else {
            reply("❗ *Failed to encrypt the code. Please try again later.*");
        }
    } catch (error) {
        console.error(error);
        reply("❗ *An error occurred while encrypting the code.*");
    }
});
//======================================================================================================================


//======================================================================================================================
cmd({
    pattern: "sportynews",
    alias: ["sports", "sportnews"],
    desc: "Get the latest sports news",
    category: "news",
    react: "⚽",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
                const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        await reply("🏆 Fetching the latest sports news...");

        const newsData = await fetchJson(`${apisg}sportynews?apikey=${sai}`);

        if (!newsData.status || !newsData.data) {
            return reply("❌ Failed to fetch sports news. Please try again later.");
        }

        const { image, title, description, author, date } = newsData.data;

        const caption = `${mono}[ 📰 ALEX-MD LATEST SPORTY NEWS LIST 📰 ]${mono}

*${title}*

> 📝 *DESCRIPTION* :  ${description}
> 📝 *AUTHOR* :  ${author}
> 📝 *DATE* :  ${date}

${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;

        // Send the news image with caption
        await conn.sendMessage(from, { 
            image: { url: image }, 
            caption: caption
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply("❌ An error occurred while fetching sports news. Please try again later.");
    }
});
//======================================================================================================================
cmd({
    pattern: "derananews",
    alias: ["derana", "lknews"],
    desc: "Get the latest news from Derana",
    category: "news",
    react: "📰",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
                const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        await reply("📡 Fetching the latest news from Derana...");

        const newsData = await fetchJson(`${apisg}derananews?apikey=${sai}`);

        if (!newsData.status || !newsData.data) {
            return reply("❌ Failed to fetch news. Please try again later.");
        }

        const { image, title, desc } = newsData.data;

        const caption = `${mono}[ 📰 ALEX LATEST DERANA NEWS LIST 📰 ]${mono}

*${title}*

> 📝 *DESCRIPTION* :  ${desc}

${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;

        // Send the news image with caption
        await conn.sendMessage(from, { 
            image: { url: image }, 
            caption: caption
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply("❌ An error occurred while fetching the news. Please try again later.");
    }
});
//======================================================================================================================
cmd({
    pattern: "tempmail",
    desc: "Generate a temporary email address.",
    category: "utility",
    react: "✉️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, isCmd, command, isGroup, sender, senderNumber, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        // Check access permissions
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }

        // API URL to generate a random temporary email
        const url = `https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1`;

        // Fetch the temporary email from 1secmail API
        const response = await axios.get(url);
        const data = response.data;

        // Check if an email was successfully generated
        if (!data || data.length === 0) {
            return reply("Error: Unable to generate a temporary email. Please try again later.");
        }

        const tempEmail = data[0]; // Extract the first generated email

        // Send the generated temporary email to the user
        await conn.sendMessage(from, { 
            text: `✉️ *Temporary Email Generated*\n\n📧 Email: ${tempEmail}`,
            footer: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★'
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});
//======================================================================================================================
cmd({
    pattern: "checkmail",
    desc: "Check inbox of a temporary email address.",
    category: "utility",
    react: "📬",
    filename: __filename
},
async (conn, mek, m, { from, quoted, isCmd, command, args, q, isGroup, sender, senderNumber, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        // Check access permissions
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }

        // Validate email input
        const tempEmail = q || ''; // The email should be provided as an argument (e.g., .checkmail user@example.com)
        if (!tempEmail) {
            return reply("Please provide a temporary email address to check. Example: `.checkmail user@example.com`");
        }

        // Split the email into login and domain parts
        const [login, domain] = tempEmail.split('@');
        if (!login || !domain) {
            return reply("Invalid email format. Please provide a valid temporary email address.");
        }

        // API URL to check messages for the temporary email
        const url = `https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`;

        // Fetch the messages from 1secmail API
        const response = await axios.get(url);
        const messages = response.data;

        // Check if there are any messages
        if (!messages || messages.length === 0) {
            return reply(`📬 No messages found for the email: ${tempEmail}`);
        }

        // Construct the message list to send
        let inboxInfo = `📬 *Inbox for ${tempEmail}:*\n\n`;
        for (let i = 0; i < messages.length; i++) {
            const { id, from, subject, date } = messages[i];
            inboxInfo += `📩 *Message ${i + 1}*\n`;
            inboxInfo += `📧 *From*: ${from}\n`;
            inboxInfo += `📜 *Subject*: ${subject}\n`;
            inboxInfo += `🕒 *Date*: ${date}\n`;
            inboxInfo += `💬 Use \`.readmail ${id}\` to read the full message.\n\n`;
        }

        // Send the inbox information
        await conn.sendMessage(from, { 
            text: inboxInfo,
            footer: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★'
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});



//======================================================================================================================
cmd({
    pattern: "iosnews",
    desc: "Fetches and displays the latest iOS news with an image.",
    react: "📱",
    category: "news",
    filename: __filename
},
async (conn, mek, m, { from, q, reply, isOwner }) => {
    try {
                      const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command. 🎁 Change Bot Mode !*");
        }
        await reply("📲 Fetching the latest iOS news... Please wait.");

        const data = await IOSNEWS();
        const response = await data.latest();

        if (!response.status || !response.result) {
            throw new Error('Invalid data received from the API');
        }

        const result = response.result;

        let imessage = `${mono}[ 📰 ALEX LATEST IOS NEWS 📰 ]${mono}\n\n`;
        imessage += `*${result.title}*\n\n`;
        imessage += `> 🔗 *URL* : ${result.link}\n`;
        imessage += `> 📝 *DESCRIPTION* : ${result.desc.split('\n')[0]}\n\n`;
        imessage += `${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;


        if (result.images && result.images.length > 0) {
            await conn.sendMessage(from, { 
                image: { url: result.images[0] }, 
                caption: imessage
            }, { quoted: mek });
        }
    } catch (error) {
        console.error(error);
        await reply(`❌ An error occurred while fetching iOS news: ${error.message}`);
    }
});
//======================================================================================================================
cmd({
    pattern: "listiosnews",
    desc: "Fetches and displays a list of 100 recent iOS news items.",
    react: "📰",
    category: "news",
    filename: __filename
},
async (conn, mek, m, { from, q, reply, isOwner }) => {
    try {
                      const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command. 🎁 Change Bot Mode !*");
        }
        await reply("📲 Fetching the latest iOS news list... Please wait.");

        const data = await IOSNEWS();
        const response = await data.all();

        if (!response.status || !response.result || !Array.isArray(response.result)) {
            throw new Error('Invalid data received from the API');
        }

        const results = response.result;

        let message = `${mono}[ 📰 ALEX LATEST IOS NEWS LIST 📰 ]${mono}\n\n`;

        results.slice(0, 100).forEach((news, index) => {
            message += `*${index + 1}. ${news.title}*\n`;
            message += `　 🔗 ${news.link}\n\n`;
        });

        message += `${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;

        await conn.sendMessage(from, { text: message  }, { quoted: mek });
    } catch (error) {
        console.error(error);
        await reply(`❌ An error occurred while fetching iOS news list: ${error.message}`);
    }
});


//======================================================================================================================
cmd({
  pattern: "esanalist",
  alias: ['newslist', 'listnews'],
  desc: "Get a list of recent news from Esana.",
  category: "darkqueen",
  react: '📋',
  filename: __filename
}, async (conn, m, { text }) => {
  try {
                    const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command. 🎁 Change Bot Mode !*");
        }
    const newsList = await api.list(); // Fetch the news list from the API
    let listMessage = "*👩🏻‍🎨 BHASHI-MD ESANA NEWS LIST 🗞️*\n\n";

    newsList.results.forEach((news, index) => {
      listMessage += `*${index + 1}. ${news.title}*\n`;  // Use `title`
      listMessage += `> *ID*: ${news.id}\n\n`;             // Use `id`
      // Date is missing in the API response, you can add if available
    });

    // Fix for monospacing
    listMessage += `\`\`\`> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★\`\`\``;

    // Send the list message
    const sentMessage = await conn.sendMessage(m.chat, { text: listMessage }, { quoted: m });

    // React to the sent message with 📰 emoji
    await conn.sendMessage(m.chat, {
      react: {
        text: '📰',
        key: sentMessage.key
      }
    });
  } catch (error) {
    console.log(error);
    m.reply("❗ An error occurred while fetching the news list: " + error);
  }
});
//======================================================================================================================
cmd({
  pattern: "esana",
  alias: ['esananews'],
  desc: "Get the latest news from Esana.",
  category: "VISHWA-MIHIRANGA",
  react: '📃',
  use: "<news_id>"
}, async (conn, m, { text }) => {
  try {
              const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command. 🎁 Change Bot Mode !*");
        }
    const latestNews = await api.latest_id();
    const latestNewsId = latestNews.results.news_id;
    let newsId = text || latestNewsId;

    const newsData = await api.news(newsId);
    const newsResults = newsData.results;

    const caption = `*${newsResults.TITLE}*\n
> 📃 *DATE* : ${newsResults.PUBLISHED}
> 📃 *URL* : ${newsResults.URL}
> 📃 *Description* : ${newsResults.DESCRIPTION}

${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;

    const sentMessage = await conn.sendMessage(m.chat, {
      image: { url: newsResults.COVER },
      caption: caption
    }, { quoted: m });

    await conn.sendMessage(m.chat, {
      react: {
        text: '📰',
        key: sentMessage.key
      }
    });
  } catch (error) {
    console.log(error);
    m.reply("❗ An error occurred: " + error);
  }
});
//======================================================================================================================
cmd({
    pattern: 'rcolor',
    desc: 'Get a random color with its name and image.',
    category: 'fun',
    react: '🎨',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command. 🎁 Change Bot Mode !*");
        }
        // Fetch random color from the API
        const response = await axios.get('https://api.popcat.xyz/randomcolor');
        const color = response.data;

        // Construct the message
        const messageText = ` 💌 *This Is Your Random Color* 💫
> ✨ *Color Name:* ${color.name}
> 🎉 *Color Code:* ${color.hex}

${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}
`;

        // Send the color code, name, and image to the user
        await conn.sendMessage(from, {
            image: { url: color.image },
            caption: messageText
        }, { quoted: mek });
    } catch (e) {
        console.error('Error fetching random color:', e);
        reply('⚠️ An error occurred while fetching the random color.');
    }
});

//======================================================================================================================
cmd({
  'pattern': 'rcoffee',
  'desc': "Animal image.",
  'react': '☕',
  'category': "other",
  'filename': __filename
}, async (_0x16dc7a, _0x349398, _0xeb34d3, {
  from: _0x6c63df,
  quoted: _0x1362bf,
  body: _0x28d3c4,
  isCmd: _0x459e13,
  command: _0x27c636,
  args: _0x162793,
  q: _0x471261,
  isGroup: _0x1ce598,
  sender: _0x578f82,
  senderNumber: _0x11d7e2,
  botNumber2: _0x8e6dd4,
  botNumber: _0x4afc7f,
  pushname: _0x466517,
  isMe: _0x3ac1ec,
  isOwner: _0x6212aa,
  groupMetadata: _0x80092d,
  groupName: _0x781f84,
  participants: _0x481892,
  groupAdmins: _0x179ae6,
  isBotAdmins: _0x1330c9,
  isAdmins: _0x1a3c02,
  reply: _0x1364ba
}) => {
  try {
    await _0x16dc7a.sendMessage(_0x6c63df, {
      'image': {
        'url': "https://coffee.alexflipnote.dev/random"
      },
      'caption': `*☕ Here Is Your Random Coffee*\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`
    }, {
      'quoted': _0x349398
    });
  } catch (_0x4022d6) {
    console.log(_0x4022d6);
    _0x1364ba('' + _0x4022d6);
  }
});
//======================================================================================================================
cmd({
  'pattern': "rimgs",
  'desc': "Animal image.",
  'react': '🪄',
  'category': "other",
  'filename': __filename
}, async (_0x513026, _0x278f41, _0x11d5f4, {
  from: _0x2a4f10,
  quoted: _0x5948d5,
  body: _0x3b3e94,
  isCmd: _0x54c846,
  command: _0x11f81a,
  args: _0x3f3bc9,
  q: _0x47e2b2,
  isGroup: _0x5d52aa,
  sender: _0x209ef7,
  senderNumber: _0x37b755,
  botNumber2: _0x49f638,
  botNumber: _0x2c0b7b,
  pushname: _0x41e304,
  isMe: _0x54268d,
  isOwner: _0x246542,
  groupMetadata: _0x53deec,
  groupName: _0x451fa3,
  participants: _0x1f5a69,
  groupAdmins: _0x43e794,
  isBotAdmins: _0x4db2ce,
  isAdmins: _0x502ad0,
  reply: _0x1df26b
}) => {
  try {
    await _0x513026.sendMessage(_0x2a4f10, {
      'image': {
        'url': "https://random-image-pepebigotes.vercel.app/api/random-image"
      },
      'caption': `*🪄 Here is Your Random imgs*\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`
    }, {
      'quoted': _0x278f41
    });
  } catch (_0x40caa5) {
    console.log(_0x40caa5);
    _0x1df26b('' + _0x40caa5);
  }
});
//======================================================================================================================
cmd({
  'pattern': "ranime",
  'desc': "Animal image.",
  'react': "✨",
  'category': 'other',
  'filename': __filename
}, async (_0x5a61b8, _0x209c7e, _0x3b6d33, {
  from: _0x31d059,
  quoted: _0x1d89a3,
  body: _0x340ef8,
  isCmd: _0x4f1b05,
  command: _0x4954c1,
  args: _0xd05b39,
  q: _0x5c59e1,
  isGroup: _0x1aaf1e,
  sender: _0x150644,
  senderNumber: _0xf3da69,
  botNumber2: _0x1fcd39,
  botNumber: _0x18c288,
  pushname: _0x6b821,
  isMe: _0x5e9a43,
  isOwner: _0x502504,
  groupMetadata: _0x50b039,
  groupName: _0x38d7b6,
  participants: _0x373ed0,
  groupAdmins: _0x307e4c,
  isBotAdmins: _0x389ee1,
  isAdmins: _0xdcf753,
  reply: _0x947de8
}) => {
  try {
    await _0x5a61b8.sendMessage(_0x31d059, {
      'image': {
        'url': "https://zenkey.vercel.app/api/random/icon"
      },
      'caption': `*✨ Here is Your Random Animeimg*\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`
    }, {
      'quoted': _0x209c7e
    });
  } catch (_0x56a305) {
    console.log(_0x56a305);
    _0x947de8('' + _0x56a305);
  }
});
//======================================================================================================================
cmd({
  'pattern': "rhusbu",
  'desc': "Animal image.",
  'react': "🧚‍♀️",
  'category': 'other',
  'filename': __filename
}, async (_0x21ea9d, _0x214e92, _0x2c82ab, {
  from: _0x55848d,
  quoted: _0x35dc1b,
  body: _0x20f4ca,
  isCmd: _0x27926f,
  command: _0x26b31b,
  args: _0x545964,
  q: _0x59bd6b,
  isGroup: _0x2ccd6e,
  sender: _0x51806b,
  senderNumber: _0x34e21c,
  botNumber2: _0x2385f7,
  botNumber: _0x1bd3ac,
  pushname: _0x334886,
  isMe: _0x2446f3,
  isOwner: _0x5cd64c,
  groupMetadata: _0x201860,
  groupName: _0x5228ea,
  participants: _0x34e89f,
  groupAdmins: _0x248e4c,
  isBotAdmins: _0x3bb410,
  isAdmins: _0x3dc2cb,
  reply: _0x521aed
}) => {
  try {
    await _0x21ea9d.sendMessage(_0x55848d, {
      'image': {
        'url': 'https://zenkey.vercel.app/api/random/husbu'
      },
      'caption':`*🧚‍♀️ Here is Your Random Husbu*\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`
    }, {
      'quoted': _0x214e92
    });
  } catch (_0x40f312) {
    console.log(_0x40f312);
    _0x521aed('' + _0x40f312);
  }
});
//======================================================================================================================
cmd({
  'pattern': "rwaifu",
  'desc': "Animal image.",
  'react': "🎟",
  'category': "other",
  'filename': __filename
}, async (_0xe7df45, _0x23c01b, _0x5460a6, {
  from: _0x17f5fd,
  quoted: _0x59b558,
  body: _0x239d26,
  isCmd: _0x1d3617,
  command: _0x268435,
  args: _0x1c6315,
  q: _0x327e58,
  isGroup: _0x38b5ee,
  sender: _0x39fabd,
  senderNumber: _0x75f7b4,
  botNumber2: _0x4ba652,
  botNumber: _0x4df4eb,
  pushname: _0x554007,
  isMe: _0x51843e,
  isOwner: _0x5512c8,
  groupMetadata: _0x2f59da,
  groupName: _0x14382d,
  participants: _0x50858f,
  groupAdmins: _0x529c9c,
  isBotAdmins: _0x3275e1,
  isAdmins: _0x3610bf,
  reply: _0x7ff7b5
}) => {
  try {
    await _0xe7df45.sendMessage(_0x17f5fd, {
      'image': {
        'url': 'https://zenkey.vercel.app/api/random/waifu'
      },
      'caption': `*🎟 Here is Your Random waifu*\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`
    }, {
      'quoted': _0x23c01b
    });
  } catch (_0x25d803) {
    console.log(_0x25d803);
    _0x7ff7b5('' + _0x25d803);
  }
});
//======================================================================================================================
cmd({
  'pattern': "rcosplay",
  'desc': "Animal image.",
  'react': "🎃",
  'category': "other",
  'filename': __filename
}, async (_0x2b81bd, _0x2b63c1, _0x3e2c57, {
  from: _0x341987,
  quoted: _0x355d89,
  body: _0x4f944b,
  isCmd: _0x2c482c,
  command: _0x1c3f33,
  args: _0x5accf6,
  q: _0x2e9e6f,
  isGroup: _0x1837b8,
  sender: _0x324dc1,
  senderNumber: _0x336eaf,
  botNumber2: _0x46226f,
  botNumber: _0x58670d,
  pushname: _0x146575,
  isMe: _0x713e52,
  isOwner: _0x3f7f23,
  groupMetadata: _0x5202be,
  groupName: _0x457cf5,
  participants: _0x2d1088,
  groupAdmins: _0x47a328,
  isBotAdmins: _0x33a9d5,
  isAdmins: _0x49b3ea,
  reply: _0x1d91d8
}) => {
  try {
    await _0x2b81bd.sendMessage(_0x341987, {
      'image': {
        'url': "https://zenkey.vercel.app/api/random/cosplay"
      },
      'caption': `*🎃 Here is Your Random waifu*\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`
    }, {
      'quoted': _0x2b63c1
    });
  } catch (_0x2ecdc8) {
    console.log(_0x2ecdc8);
    _0x1d91d8('' + _0x2ecdc8);
  }
});
//======================================================================================================================
cmd({
    pattern: "lyrics",
    desc: "Fetches song information, a brief lyrics preview, and the album cover image.",
    react: "🎵",
    category: "music",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    // Check if song name is provided
    if (!args.join(" ")) return reply("Please provide a song name. Example: !lyrics Never Gonna Give You Up");
    const songName = args.join(" ");

    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command. 🎁 Change Bot Mode !*");
        }
        // Fetch the song information from the API
        const apiUrl = `https://api.popcat.xyz/lyrics?song=${encodeURIComponent(songName)}`;
        let response = await fetch(apiUrl);
        let data = await response.json();

        if (data.error) {
            return reply(`❌ Error: ${data.error}`);
        }

        // Prepare the message with song information, emojis, and formatting
        let message = `🎵 *Lyrics Information:* ☘️\n\n`;
        message += `> 🎤 *Title:* ${data.title}\n`;
        message += `> 👨‍🎤 *Artist:* ${data.artist}\n`;
        message += `> 💿 *Album:* ${data.album || 'N/A'}\n\n`;
        message += `📜 *Lyrics Preview:*\n`;
        message += `> "${data.lyrics}"\n\n`;
        message += `🎧 Please support the artist by purchasing their music!\n\n`;
        message += `${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;

        // Fetch the album cover image
        let imageBuffer;
        try {
            const imageResponse = await fetch(data.image);
            imageBuffer = await imageResponse.buffer();
        } catch (imageError) {
            console.log("Error fetching image:", imageError);
            imageBuffer = null;
        }

        // Send the formatted song information message with the album cover image
        if (imageBuffer) {
            await conn.sendMessage(from, { image: imageBuffer, caption: message }, { quoted: mek });
        } else {
            // If image fetch fails, send text only
            await conn.sendMessage(from, { text: message }, { quoted: mek });
        }
    } catch (e) {
        console.log(e);
        reply(`❌ An error occurred: ${e.message}`);
    }
});
//======================================================================================================================
const qrcode = require('qrcode'); // Import qrcode package


cmd({
  pattern: "qr",
  desc: "Generate a QR code from text or URL.",
  category: "utility",
  filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
  try {
    if (!q) return reply("⚠️ Please provide text or URL to generate a QR code.");
    const text = q.trim();
    const qrOutputPath = path.join(__dirname, 'qrcode_output.png'); // Set path for QR output

    // Generate QR code and save it to the file
    await qrcode.toFile(qrOutputPath, text, {
      color: {
        dark: '#000000', // QR code color
        light: '#ffffff' // Background color
      }
    });

    // Read the QR code image from the file using fs.promises
    const image = await fs.readFile(qrOutputPath);

    // Send the QR code image
    await conn.sendMessage(from, { 
      image: image,
      caption: `📱 Here's your QR code for: ${text}\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`,
    }, { quoted: mek });

    // Delete the temporary QR code file
    await fs.unlink(qrOutputPath);
  } catch (e) {
    console.error('Error generating QR code:', e.message);
    reply(`❌ An error occurred while generating the QR code: ${e.message}`);
  }
});
//======================================================================================================================
cmd({
    pattern: "support",
    desc: "Get information about support channels.",
    category: "info",
    react: "🆘",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    const supportInfo = `
    🆘 *Need Help?* 🆘
    If you need support or have any questions, you can reach us through the following channels:

    - *Support Group*:https://whatsapp.com/channel/0029VaSaZd5CBtxGawmSph1k\n 
    - *Email*: Alexiprogrammerofficial@gmail.com  
    `;
    reply(supportInfo);
});
//======================================================================================================================
cmd({
  pattern: "live",
  desc: "Show Live Time Of Sri Lanka",
  category: "fun",
  filename: __filename,
  use: '<group link.>',
}, async (conn, mek, m, { from, q, reply }) => {

                    const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }

  // Get the current date and time in Colombo, Sri Lanka timezone
  const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Colombo' });
  const time = now.split(' ')[1]; // Extract time part
  const date = new Date().toLocaleDateString('en-GB', { timeZone: 'Asia/Colombo' }); // Format date properly
  const hrs = new Date().getHours(); // Get hours for greeting logic

  // Greeting based on time of the day
  let wish = '';
  if (hrs < 12) wish = '🌅 𝔾𝕠𝕠𝕕 𝕄𝕠𝕣𝕟𝕚𝕟𝕘';
  else if (hrs >= 12 && hrs <= 16) wish = '🌞 𝔾𝕠𝕠𝕕 𝔸𝕗𝕥𝕖𝕣𝕟𝕠𝕠𝕟';
  else if (hrs >= 16 && hrs <= 20) wish = '🌥 𝔾𝕠𝕠𝕕 𝔼𝕧𝕖𝕟𝕚𝕟𝕘';
  else if (hrs >= 20 && hrs <= 24) wish = '🌙 𝔾𝕠𝕠𝕕 ℕ𝕚𝕘𝕙𝕥';

  // AM/PM logic
  let am_pm = hrs < 12 ? '𝐀𝐌' : '𝐏𝐌';

  // Random order message
  const suhail = [777, 0, 100, 500, 1000, 999, 2021];
  const qMessage = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      orderMessage: {
        itemCount: suhail[Math.floor(Math.random() * suhail.length)],
        status: 1,
        surface: 1,
        message: `> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★`,
        orderTitle: "> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★\n*aLex-whatsapp bot",
        sellerJid: '94756857260@s.whatsapp.net'
      }
    }
  };

  // Build the response message with stylish text
  const timenow = `
${wish} @~Alex ID Programer ⛅

> ⌚ 𝕋𝕚𝕞𝕖 ${time} ${am_pm}
> 📅 𝔻𝕒𝕥𝕖 ${date}

${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}
`;

  // Send the formatted message
  return await conn.sendMessage(from, { text: timenow }, { quoted: qMessage });
});

//======================================================================================================================
const baseUrl = "https://prabath-md-api.up.railway.app";

async function socialMediaDownload(url) {
    let endpoint;
    if (url.includes('facebook.com') || url.includes('fb.watch')) {
        endpoint = `${baseUrl}/api/fdown?url=${encodeURIComponent(url)}`;
    } else if (url.includes('mediafire.com')) {
        endpoint = `${baseUrl}/api/mediafiredl?url=${encodeURIComponent(url)}`;
    } else if (url.includes('twitter.com')) {
        endpoint = `${baseUrl}/api/twitter/dl?url=${encodeURIComponent(url)}`;
    } else {
        throw new Error('Unsupported URL');
    }
    const response = await axios.get(endpoint);
    return response.data;
}

cmd({
    pattern: "fb",
    alias: ["facebook"],
    react: '📘',
    desc: "Download Facebook videos",
    category: "download",
    use: '.fb <facebook link>',
    filename: __filename
}, async (conn, mek, m, { from, quoted, args, q, isGroup, sender, pushname, reply }) => {
    try {
        if (!q) return await reply('*🚫 Please provide a Facebook URL! 🚫*');

        const introMessage = `*╭─ 「  𝐴𝐿𝐸𝑋-𝑀𝐷 」*
*╰────────────┈*
╭══════════════◈
┃「  𝐷𝑂𝑊𝑁𝐿𝑂𝐴𝐷 𝐹𝐵」
╰══════════════◈
*╭────────────┈◦•◦❥•*
*╎➮ . 🥷 𝑅𝑒𝑞𝑢𝑒𝑠𝑡𝑒𝑟 : ${pushname}*
*╎*
*╎➮ . 𝐵𝑂𝑇 - 𝐴𝐿𝐸𝑋-𝑀𝐷*
*╚──────────────┈┈*
*╭─ 「  𝑴𝒓 𝑨𝒍𝒆𝒙 𝑰𝒅  」*
*╰───────────────┈*
       *⏤͟͟͞͞★❬❬ 𝑈𝑃𝐷𝐴𝑇𝐸𝑆 ❭❭⏤͟͟͞͞★*

> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★`;

 
        const response = await socialMediaDownload(q);

        if (response.status === "success ✅" && response.data) {
            const { hd, sd, audio } = response.data;
            if (hd || sd) {
                console.log('Sending video message');
                await conn.sendMessage(from, { video: { url: hd || sd }, caption: introMessage }, { quoted: mek });
            } else {
                reply('No video URL found in the response.');
            }

            if (audio) {
                console.log('Sending audio message');
                await conn.sendMessage(from, { audio: { url: audio }, mimetype: "audio/mpeg" }, { quoted: mek });
            }
        } else {
            reply('Failed to fetch video data.');
        }

        return await conn.sendMessage(from, { react: { text: '🎉', key: mek.key }});
    } catch (e) {
        console.error('Detailed error:', e);
        reply(`❌ Error occurred while processing your request! ❌\nError details: ${e.message}`);
    }
});
//======================================================================================================================
cmd({
    pattern: "mf",
    alias: ["mediafire"],
    react: '📁',
    desc: "Download MediaFire files",
    category: "download",
    use: '.mf <mediafire link>',
    filename: __filename
}, async (conn, mek, m, { from, quoted, args, q, isGroup, sender, pushname, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        if (!q) return await reply('*🚫 Please provide a MediaFire URL! 🚫*');

        // Log the URL for debugging
        console.log(`Processing MediaFire URL: ${q}`);

        // Watermark message


        // Ensure the function is defined and returns expected values
        const response = await socialMediaDownload(q);

        // Log response for debugging
        console.log(`Download response: ${JSON.stringify(response)}`);

        if (response.status === "success ✅") {
            const downloadUrl = response.data.link_1; // Use the direct download link
            const filename = response.data.name;
            const mimetype = `application/${response.data.file_type.toLowerCase()}`; // Use file type from response
            const size = response.data.size;
const wm = `*╭─ 「  𝐴𝐿𝐸𝑋-𝑀𝐷 」*
*╰────────────┈*
╭══════════════◈
┃「  𝐷𝑂𝑊𝑁𝐿𝑂𝐴𝐷 𝑀𝐸𝐷𝐼𝐴 」
╰══════════════◈
*╭────────────┈◦•◦❥•*
*╎➮ . 🥷 𝑅𝑒𝑞𝑢𝑒𝑠𝑡𝑒𝑟 : ${pushname}*
*╎➮ . 𝐵𝑂𝑇 - 𝐴𝐿𝐸𝑋-𝑀𝐷*
*╎➮ . 𝑆𝑖𝑧𝑒 : ${size}*
*╎➮ . 𝑇𝑦𝑝𝑒 : ${response.data.file_type}*
*╎➮ . 𝐹𝑖𝑙𝑒 𝑁𝑎𝑚𝑒 : ${filename}*
*╚──────────────┈┈*
*╭─ 「  𝑴𝒓 𝑨𝒍𝒆𝒙 𝑰𝒅  」*
*╰───────────────┈*
       *⏤͟͟͞͞★❬❬ 𝑈𝑃𝐷𝐴𝑇𝐸𝑆 ❭❭⏤͟͟͞͞★*

> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★`;
            const caption = wm; // Use the formatted watermark message

            await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: mimetype, fileName: filename, caption: caption }, { quoted: mek });
            await conn.sendMessage(from, { react: { text: '🎉', key: mek.key }});
        } else {
            await reply('🚫 Failed to retrieve the file. Please check the URL and try again. 🚫');
        }
    } catch (e) {
        reply('❌ Error occurred while processing your request! ❌');
        console.error(e); // Log error for debugging
    }
});

//======================================================================================================================

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Google Drive Downloader with size limit (e.g., 100MB limit)
const MAX_DOWNLOAD_SIZE = 500 * 1024 * 1024; // 100 MB

cmd({
    pattern: "gdrive",
    alias: ["googledrive"],
    desc: "Download Google Drive files",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q, pushname }) => {
    if (!q || !q.startsWith("https://")) {
        return conn.sendMessage(from, { text: "❌ Please provide a valid Google Drive URL." }, { quoted: mek });
    }

    const downloadingMsg = await conn.sendMessage(from, { text: "⏳ *ᴅʟ ʙʏ 𝗔𝗟𝗘𝗫-𝗠𝗗...*" }, { quoted: mek });
    await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return conn.sendMessage(from, "*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*", { quoted: mek });
        }

        const data = await fetchJson(`${baseUrl}/api/gdrivedl?url=${encodeURIComponent(q)}`);
        const fileInfo = data.data || data;

        // Check if file size is available and handle accordingly
        const fileSize = fileInfo.fileSize || 0; // Default to 0 if fileSize is not present
        const MAX_DOWNLOAD_SIZE = 500 * 1024 * 1024; // 500 MB

        if (fileSize > MAX_DOWNLOAD_SIZE) {
            await conn.sendMessage(from, { text: `⚠️ The file size is too large. Maximum allowed size is 500 MB. The provided file is ${formatFileSize(fileSize)}.` }, { quoted: mek });
            return await conn.sendMessage(from, { react: { text: "⚠️", key: mek.key } });
        }

        const captionHeader = `
╭─『 *𝗔𝗟𝗘𝗫-𝗠𝗗* 』───⊷
│
│ ✨ *ʀᴇQᴜᴇꜱᴛᴇʀ*: ${pushname}
│ 🤖 *ʙᴏᴛ*: 𝗔𝗟𝗘𝗫-𝗠𝗗
│ 📄 *ꜰɪʟᴇ ɴᴀᴍᴇ:* ${fileInfo.fileName || fileInfo.title || 'Not available'}
│ 📦 *ꜱɪᴢᴇ:* ${formatFileSize(fileSize)}
│ 📎 *ᴛʏᴘᴇ:* ${fileInfo.mimeType || fileInfo.file_type || 'Not available'}
│
│ 🤷‍♀️ _Your Google Drive content is on its way!_
╰────────────────────⊷`.trim();

        const caption = `${captionHeader}\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`.trim();

        await conn.sendMessage(from, { 
            document: { url: fileInfo.download || fileInfo.link || fileInfo.url }, 
            fileName: fileInfo.fileName || fileInfo.title, 
            mimetype: fileInfo.mimeType || fileInfo.file_type,
            caption: caption
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
    } catch (error) {
        console.error('❌ Error in Google Drive downloader:', error);
        const errorMessage = error.response && error.response.status === 404 
            ? '❌ Error: The requested file could not be found. Please check the URL and try again.'
            : `❌ An error occurred: ${error.message}`;

        await conn.sendMessage(from, { text: errorMessage }, { quoted: mek });
        await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
    } finally {
        await conn.sendMessage(from, { delete: downloadingMsg.key });
    }
});

//=================================================================================================================================
cmd({
    pattern: "tt",
    alias: ["tiktok"],
    react: '🎵',
    desc: "Download TikTok videos",
    category: "download",
    use: '.tt <tiktok link>',
    filename: __filename
}, async (conn, mek, m, { from, args, reply, pushname }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }

        // Get the TikTok URL from args
        const q = args.join(" ");
        if (!q) return await reply('*🚫 Please provide a TikTok URL! 🚫*');

        // Watermark message
        let wm = `
╭─『 *𝗔𝗟𝗘𝗫-𝗠𝗗* 』───⊷
│
│ ✨ *ʀᴇQᴜᴇꜱᴛᴇʀ*: ${pushname || "User"}
│ 🤖 *ʙᴏᴛ*: 𝗔𝗟𝗘𝗫-𝗠𝗗
│  
│ 🤷‍♀️ _We Will Send Your TikTok Video And Audio, Without Watermark and best quality_
╰────────────────────⊷

> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★`;

        // Perform TikTok download using a hypothetical tiktokdl function
        let response = await tiktokdl(q);
        let { video, music } = response;

        // Send video and audio
        await conn.sendMessage(from, { video: { url: video }, caption: wm }, { quoted: mek });
        await conn.sendMessage(from, { audio: { url: music }, mimetype: "audio/mpeg" }, { quoted: mek });

        // Send a reaction
        return await conn.sendMessage(from, { react: { text: '🎉', key: mek.key } });
    } catch (e) {
        // Reply with an error message to the user via WhatsApp
        await conn.sendMessage(from, { text: `❌ Error occurred while processing your request: ${e.message} ❌`, quoted: mek });
        console.log(e);
    }
});
//======================================================================================================================
cmd({
    pattern: "npm",
    desc: "Search for a package on npm.",
    react: "📦",
    category: "tools",
    filename: __filename
},
async (conn, mek, m, { from, args, reply }) => {
    if (!args.length) return reply("Please provide the name of the npm package you want to search for. Example: !npm express");
    const packageName = args.join(" ");
    const url = `https://registry.npmjs.org/${encodeURIComponent(packageName)}`;
    try {
                const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        // Fetch package details from npm registry
        let response = await fetch(url);
        if (!response.ok) throw new Error("Package not found or an error occurred.");
        let packageData = await response.json();
        // Prepare response details
        const latestVersion = packageData["dist-tags"].latest;
        const description = packageData.description || "No description available.";
        const homepage = packageData.homepage || "No homepage available.";
        const npmUrl = `https://www.npmjs.com/package/${packageName}`;
        const author = packageData.author ? packageData.author.name || "Unknown" : "Unknown";
        const license = packageData.license || "Unknown";
        const repository = packageData.repository ? packageData.repository.url || "Not available" : "Not available";
        const keywords = packageData.keywords ? packageData.keywords.join(", ") : "No keywords provided";
        // Send the package details as a reply (without image)
        let replyText = `📦 _*𝗔𝗟𝗘𝗫-𝗠𝗗 𝗪𝗔 𝗕𝗢𝗧*_ 📄\n
📦 *ɴᴘᴍ ᴘᴀᴄᴋᴀɢᴇ*: ${packageName}
📄 *ᴅᴇꜱᴄʀɪᴘᴛɪᴏɴ*: ${description}
📅 *ʟᴀᴛᴇꜱᴛ ᴠᴇʀꜱɪᴏɴ*: ${latestVersion}
👤 *ᴀᴜᴛʜᴏʀ*: ${author}
📄 *ʟɪᴄᴇɴꜱᴇ*: ${license}
🌐 *ʀᴇᴘᴏꜱɪᴛᴏʀʏ*: ${repository}
🏷️ *ᴋᴇʏᴡᴏʀᴅꜱ*: ${keywords}
🔗 *ʜᴏᴍᴇᴘᴀɢᴇ*: ${homepage}
🌐 *ɴᴘᴍ ᴜʀʟ*: ${npmUrl}

${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}
        `;
        await conn.sendMessage(from, { text: replyText }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});
//======================================================================================================================
cmd({
    pattern: 'genderize',
    desc: 'Get the most likely gender of a name.',
    category: 'fun',
    react: '🧑‍🤝‍🧑',
    filename: __filename
}, async (conn, mek, m, { from, quoted, q, pushname, reply }) => {
    try {
                const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        if (!q) {
            return reply("Please provide a name to analyze. 🤔");
        }
        const response = await axios.get(`https://api.genderize.io/?name=${q}`);
        const data = response.data;
        if (data.gender) {
            reply(`✨ The most likely gender for the name "${q}" is: 
            \n*${data.gender}* (${data.probability * 100}%)\n\n${mono}ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛${mono}`);
        } else {
            reply(`😔 No gender data found for the name "${q}".`);
        }
    } catch (error) {
        console.error('Error fetching gender data:', error);
        reply('⚠️ An error occurred while fetching gender data. Please try again later.');
    }
});
//======================================================================================================================
cmd({
    pattern: 'nationalize',
    desc: 'Get the most likely nationality of a name.',
    category: 'fun',
    react: '🌎',
    filename: __filename
}, async (conn, mek, m, { from, quoted, q, pushname, reply }) => {
    try {
                const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        if (!q) {
            return reply("Please provide a name to analyze. 🤔");
        }
        const response = await axios.get(`https://api.nationalize.io/?name=${q}`);
        const data = response.data;
        if (data.country) {
            const nationality = data.country.map(country => `*${country.country_id}* (${country.probability * 100}%)`).join(", ");
            reply(`✨ The most likely nationalities for the name "${q}" are: \n${nationality}\n\n${mono}ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛${mono}`);
        } else {
            reply(`😔 No nationality data found for the name "${q}".`);
        }
    } catch (error) {
        console.error('Error fetching nationality data:', error);
        reply('⚠️ An error occurred while fetching nationality data. Please try again later.');
    }
});
//======================================================
cmd({
    pattern: "pikachu",
    desc: "Creates a surprised Pikachu meme with custom text.",
    react: "⚡",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, args, reply }) => {
    // Check if text input is provided
    if (args.length < 1) return reply("Please provide text for the Pikachu meme. Example: !pikachu Hello there");

    const text = args.join(" ");

    try {
                        const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        // Fetch the Pikachu meme image from the API
        const imageUrl = `https://api.popcat.xyz/pikachu?text=${encodeURIComponent(text)}`;
        let response = await fetch(imageUrl);
        let buffer = await response.buffer();

        // Prepare the message caption
        let caption = `*⚡ Here's your surprised Pikachu meme*\n\n${mono}ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛${mono}`;

        // Send the Pikachu meme image with caption
        await conn.sendMessage(from, { image: buffer, caption: caption }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message}`);
    }
});
//======================================================================================================================
cmd({
    pattern: "itunes",
    desc: "Fetches song information from iTunes",
    react: "🎵",
    category: "music",
    filename: __filename
},
async (conn, mek, m, { from, args, reply }) => {
    if (args.length < 1) return reply("Please provide a song name. Usage: !song <song name>");

    const query = encodeURIComponent(args.join(" "));
    const apiUrl = `https://api.popcat.xyz/itunes?q=${query}`;

    try {
                        const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.error) {
            return reply("Song not found. Please try a different query.");
        }

        const songInfo = `🎵 *${data.name}*\n
> 👤 Artist: ${data.artist}
> 💿 Album: ${data.album}
> 📅 Release Date: ${data.release_date}
> ⏱️ Length: ${data.length}
> 🏷️ Genre: ${data.genre}
> 💰 Price: ${data.price}
> 🔗 Listen on Apple Music: ${data.url}

${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}
        `;

        // Fetch the thumbnail image
        const imageResponse = await fetch(data.thumbnail);
        const imageBuffer = await imageResponse.buffer();

        // Send the message with the thumbnail and song info
        await conn.sendMessage(from, { 
            image: imageBuffer, 
            caption: songInfo 
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply("An error occurred while fetching the song information.");
    }
});
//======================================================================================================================
cmd({
    pattern: "caution",
    desc: "Creates a caution sign with custom text.",
    react: "⚠️",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, args, reply }) => {
    // Check if text input is provided
    if (args.length < 1) return reply("Please provide text for the caution sign. Example: !caution Watch your step");

    const text = args.join(" ");

    try {
                        const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        // Fetch the caution sign image from the API
        const imageUrl = `https://api.popcat.xyz/caution?text=${encodeURIComponent(text)}`;
        let response = await fetch(imageUrl);
        let buffer = await response.buffer();

        // Prepare the message caption
        let caption = `⚠️ Caution: \n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;

        // Send the caution sign image with caption
        await conn.sendMessage(from, { image: buffer, caption: caption }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message}`);
    }
});

//======================================================================================================================
cmd({
    pattern: "drake",
    desc: "Creates a Drake meme with custom text.",
    react: "🎵",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    // Check if both text inputs are provided
    if (args.length < 2) return reply("Please provide two texts separated by '|' for the Drake meme. Example: !drake Text 1 | Text 2");

    const fullText = args.join(" ");
    const [text1, text2] = fullText.split("|").map(text => text.trim());

    if (!text1 || !text2) return reply("Please provide both texts separated by '|' for the Drake meme.");

    try {
                        const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        // Fetch the Drake meme image from the API
        const imageUrl = `https://api.popcat.xyz/drake?text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}`;
        let response = await fetch(imageUrl);
        let buffer = await response.buffer();
        // Prepare the message caption
        let caption = `🎵 Here's your Drake meme:\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;
        // Send the Drake meme image with caption
        await conn.sendMessage(from, { image: buffer, caption: caption }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message}`);
    }
});

//======================================================================================================================
cmd({
    pattern: "pooh",
    desc: "Creates a Tuxedo Winnie the Pooh meme with custom text.",
    react: "🐻",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    // Check if both text inputs are provided
    if (args.length < 2) return reply("Please provide two texts separated by '|' for the Pooh meme. Example: !pooh Text 1 | Text 2");

    const fullText = args.join(" ");
    const [text1, text2] = fullText.split("|").map(text => text.trim());

    if (!text1 || !text2) return reply("Please provide both texts separated by '|' for the Pooh meme.");

    try {
                        const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }

        // Fetch the Pooh meme image from the API
        const imageUrl = `https://api.popcat.xyz/pooh?text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}`;
        let response = await fetch(imageUrl);
        let buffer = await response.buffer();
        // Prepare the message caption
        let caption = `🐻 Here's your Tuxedo Pooh meme:\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;
        // Send the Pooh meme image with caption
        await conn.sendMessage(from, { image: buffer, caption: caption }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message}`);
    }
});
//======================================================================================================================
cmd({
    pattern: "sadcat",
    desc: "Fetches a 'Sad Cat' image with custom text.",
    react: "😿",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    // Check if text is provided
    if (!args.join(" ")) return reply("Please provide the text for the Sad Cat image.");
    const text = args.join(" ");
    try {
                        const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        // Fetch the Sad Cat image from the API
        const imageUrl = `https://api.popcat.xyz/sadcat?text=${encodeURIComponent(text)}`;
        let response = await fetch(imageUrl);
        let buffer = await response.buffer();
        // Prepare the message caption
        let caption = `😿 Here is the Sad Cat image with your text:\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;
        // Send the Sad Cat image with caption
        await conn.sendMessage(from, { image: buffer, caption: caption }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message}`);
    }
});

//======================================================================================================================
cmd({
    pattern: "oogway",
    desc: "Fetches an 'Oogway' image with custom text.",
    react: "🐢",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    // Check if text is provided
    if (!args.join(" ")) return reply("Please provide the text for the Oogway image.");
    const text = args.join(" ");
    try {
                        const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }

        // Fetch the Oogway image from the API
        const imageUrl = `https://api.popcat.xyz/oogway?text=${encodeURIComponent(text)}`;
        let response = await fetch(imageUrl);
        let buffer = await response.buffer();
        // Prepare the message caption
        let caption = `🐢 Here is the Oogway image with your text:\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;
        // Send the Oogway image with caption
        await conn.sendMessage(from, { image: buffer, caption: caption }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message}`);
    }
});
//======================================================================================================================
// Define possible text formats
const textFormats = [
    `*Current Cricket Match:*`,
    `*Ongoing Cricket Match:*`,
    `*Latest Cricket Match:*`
];

// Function to get a random text format
const getRandomTextFormat = () => textFormats[Math.floor(Math.random() * textFormats.length)];

cmd({
    pattern: "cric",
    desc: "Get a random current cricket match.",
    react: "🏏",
    category: "information",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
                const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        // Fetch current cricket matches
        let response = await fetch(`${CRIC_URL}?apikey=${CRIC_KEY}`);
        let data = await response.json();

        if (!data || !data.data || data.data.length === 0) {
            return reply("🏏 No current cricket matches found.");
        }

        // Select a random match
        let match = data.data[Math.floor(Math.random() * data.data.length)];

        // Prepare the match message
        let matchesMessage = `🏏 ${getRandomTextFormat()}\n\n`;

        let teamInfo = match.teamInfo.reduce((info, team) => {
            info[team.shortname] = team.img;
            return info;
        }, {});

        matchesMessage += `> 🏆 *Match:* ${match.name} \n`;
        matchesMessage += `> 📍 *Venue:* ${match.venue} \n`;
        matchesMessage += `> 📅 *Date:* ${match.date} \n`;
        matchesMessage += `> 🆚 *Teams:* ${match.teams.map((team, index) => `![${team}](${teamInfo[team]}) ${team}`).join(' 🆚 ')}\n`;
        matchesMessage += `> ⏳ *Status:* ${match.status} \n`;

        // Add scores if available
        match.score.forEach(score => {
            matchesMessage += `*${score.inning}:* ${score.r} runs 🏏, ${score.w} wickets 🎯, ${score.o} overs ⏱️\n`;
        });

        matchesMessage += `\n`;
        matchesMessage += `${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;

        // Send the match message
        await conn.sendMessage(from, { text: matchesMessage }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message} ⚠️`);
    }
});
//======================================================================================================================
cmd({
    pattern: "color",
    desc: "Fetches a color and sends it as a message.",
    react: "🎨",
    category: "information",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    // Check if color code is provided
    if (!args[0]) return reply("Please provide a color code in hex format (e.g., #ffcc99).");

    const colorCode = args[0].replace('#', ''); // Remove the hash from the color code

    try {
                const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        // Fetch the color information from the API
        const response = await fetch(`https://api.popcat.xyz/color/${colorCode}`);
        const data = await response.json();

        // Check if the color data is valid
        if (!data || !data.color_image) {
            return reply("Unable to retrieve color information.");
        }

        // Fetch the color image
        const imageResponse = await fetch(data.color_image);
        const imageBuffer = await imageResponse.buffer();

        // Prepare the color message
        const colorMessage = `🎨 Here is the color information:\n\n` +
            `> 🎨*Color Code:* #${data.hex}\n` +
            `> 🎨*Color Name:* ${data.name}\n` +
            `> 🎨*RGB Value:* ${data.rgb}\n` +
            `> 🎨*Brightened Color:* ${data.brightened}\n\n` +
            `${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;

        // Send the color image and details
        await conn.sendMessage(from, { image: imageBuffer, caption: colorMessage }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message}`);
    }
});
//======================================================================================================================
cmd({
    pattern: "unforgivable",
    desc: "Fetches an 'unforgivable' image with custom text.",
    react: "😡",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    // Check if text is provided
    if (!args.join(" ")) return reply("Please provide the text for the unforgivable image.");

    const text = args.join(" ");

    try {
                const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        // Fetch the unforgivable image from the API
        const imageUrl = `https://api.popcat.xyz/unforgivable?text=${encodeURIComponent(text)}`;
        let response = await fetch(imageUrl);
        let buffer = await response.buffer();

        // Prepare the message caption
        let caption = `😡 Here is the unforgivable image with your text:\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;

        // Send the unforgivable image with caption
        await conn.sendMessage(from, { image: buffer, caption: caption }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message}`);
    }
});
//======================================================================================================================
cmd({
    pattern: "alert",
    desc: "Fetches an alert image with custom text.",
    react: "⚠️",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    // Check if text is provided
    if (!args.join(" ")) return reply("Please provide the text for the alert image.");

    const text = args.join(" ");

    try {
                const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        // Fetch the alert image from the API
        const imageUrl = `https://api.popcat.xyz/alert?text=${encodeURIComponent(text)}`;
        let response = await fetch(imageUrl);
        let buffer = await response.buffer();

        // Prepare the message caption
        let caption = `⚠️ Here is your alert image with the text:\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;

        // Send the alert image with caption
        await conn.sendMessage(from, { image: buffer, caption: caption }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message}`);
    }
});
//======================================================================================================================
cmd({
    pattern: "ebinary",
    desc: "Encode text to binary.",
    react: "🔠",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    // Check if text is provided
    if (!args.join(" ")) return reply("Please provide the text to be encoded.");

    const text = args.join(" ");

    try {
                const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        // Fetch the encoded binary from the API
        const binaryUrl = `https://api.popcat.xyz/encode?text=${encodeURIComponent(text)}`;
        let response = await fetch(binaryUrl);
        let data = await response.json();
        const binary = data.binary;

        // Prepare the message caption
        let caption = `🔠 *Here is your text encoded to binary:*\n\n${mono}${binary}${mono}\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;

        // Send the encoded binary message
        await conn.sendMessage(from, { text: caption }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message}`);
    }
});
//======================================================================================================================
cmd({
    pattern: "dbinary",
    desc: "Decode binary to text.",
    react: "🔡",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    // Check if binary is provided
    if (!args.join(" ")) return reply("Please provide the binary to be decoded.");

    const binary = args.join(" ");

    try {
                const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        // Fetch the decoded text from the API
        const textUrl = `https://api.popcat.xyz/decode?binary=${encodeURIComponent(binary)}`;
        let response = await fetch(textUrl);
        let data = await response.json();
        const text = data.text;

        // Prepare the message caption
        let caption = `🔡 *Here is your binary decoded to text:*\n\n${mono}${text}${mono}\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;

        // Send the decoded text message
        await conn.sendMessage(from, { text: caption }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message}`);
    }
});

//======================================================================================================================
cmd({
    pattern: "forex",
    alias: ["markets"],
    desc: "Get the current market status.",
    react: "📈",
    category: "information",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access (implement your checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }


        // Fetch the market status data
        let response = await fetch(`${API2_URL}?apiKey=${API_KEY}`);
        let data = await response.json();

        // Prepare the market status message
        let output = "*📈 Current Market Status*\n\n";
        output += "> *🔗Forex Market Status:*\n";
        output += `> After Hours: ${data.afterHours ? "Closed" : "Open"}\n`;
        output += `> Market: ${data.market ? "Open" : "Closed"}\n`;

        // Currencies status
        const currencies = data.currencies;
        output += "\n> *🔗Currencies:*\n";
        output += `> Crypto: ${currencies.crypto}\n`;
        output += `> FX: ${currencies.fx}\n`;

        // Exchanges status
        const exchanges = data.exchanges;
        output += "\n> *🔗Exchanges:*\n";
        output += `> NASDAQ: ${exchanges.nasdaq}\n`;
        output += `> NYSE: ${exchanges.nyse}\n`;
        output += `> OTC: ${exchanges.otc}\n`;

        // Indices Groups status
        const indicesGroups = data.indicesGroups;
        output += "\n> *🔗Indices Groups:*\n";
        output += `> S&P: ${indicesGroups.s_and_p}\n`;
        output += `> Societe Generale: ${indicesGroups.societe_generale}\n`;
        output += `> MSCI: ${indicesGroups.msci}\n`;
        output += `> FTSE Russell: ${indicesGroups.ftse_russell}\n`;
        output += `> MStar: ${indicesGroups.mstar}\n`;
        output += `> MStarC: ${indicesGroups.mstarc}\n`;
        output += `> CCCY: ${indicesGroups.cccy}\n`;
        output += `> CGI: ${indicesGroups.cgi}\n`;
        output += `> NASDAQ: ${indicesGroups.nasdaq}\n`;
        output += `> Dow Jones: ${indicesGroups.dow_jones}\n`;

        // Server time
        output += `\n> *🔗Server Time:* ${data.server_time}\n\n`;

        output += `${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;

        // Send the market status message
        await conn.sendMessage(from, { text: output }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message}`);
    }
});


//======================================================================================================================
cmd({
    pattern: "news2",
    desc: "Get a random news article with an image.",
    react: "📰",
    category: "information",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }

        let response = await fetch(`${API_URL}?apiKey=${API_KEY}`);
        let newsData = await response.json();

        if (!newsData.results || newsData.results.length === 0) {
            return reply("🪄 No news found at the moment.");
        }

        // Get a random article
        let randomIndex = Math.floor(Math.random() * newsData.results.length);
        let news = newsData.results[randomIndex];

        // Prepare the news message
        let newsMessage = `📰 *${news.title}*\n
> 📰 *Source*: ${news.publisher?.name || "N/A"}\n
> 🔗 *Publisher Homepage*: ${news.publisher?.homepage_url || "N/A"}\n
> ✍️ *Author*: ${news.author || "Unknown"}\n
> 📅 *Published On*: ${news.published_utc}\n
> 🔗 *Article URL*: ${news.article_url}\n
> 📝 *Description*: ${news.description || "No description available"}\n
> 🔑 *Keywords*: ${news.keywords ? news.keywords.join(', ') : "None"}\n\n
${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;

        // Send the news along with the image if available
        if (news.image_url) {
            await conn.sendMessage(from, {
                caption: newsMessage,
                image: { url: news.image_url }
            }, { quoted: mek });
        } else {
            await conn.sendMessage(from, { text: newsMessage }, { quoted: mek });
        }

    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message}`);
    }
});
//======================================================================================================================
cmd({
    pattern: "anime",
    desc: "Fetch information about an anime.",
    category: "anime",
    react: "📺",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        // Check if the sender has access
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }

        // Get the anime name from arguments
        const q = args.join(" ");
        if (!q) {
            return reply("Please provide the name of the anime. 📖");
        }

        // Fetch anime information from the API
        const apiUrl = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(q)}&limit=1`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data.data.length) {
            return reply("No anime found with that name. 😞");
        }

        // Extract anime details
        const anime = data.data[0];
        const animeDetails = `📜 _*ALEX MD ANIME INFORMATION*_ 📺

> 📚 *Title:* _${anime.title}_
> 📜 *Synopsis:* _${anime.synopsis}_
> 🎥 *Episodes:* _${anime.episodes || 'N/A'}_
> ⭐ *Score:* _${anime.score || 'N/A'}_
> 🧩 *Genres:* _${anime.genres.map(g => g.name).join(', ')}_
> 🔗 *URL:* _${anime.url}_
`;

        // Default image if not available
        const animeImage = anime.images?.jpg?.image_url || 'https://via.placeholder.com/300'; // Replace with ALIVE_IMG if defined

        // Send message with anime image and details
        await conn.sendMessage(from, { image: { url: animeImage }, caption: `${animeDetails}\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}` }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching anime information: ${e.message} 😔`);
    }
});

//======================================================================================================================

//======================================================================================================================

//======================================================================================================================
cmd({
    pattern: "topanime",
    desc: "Fetch a list of top-rated anime based on user ratings.",
    category: "anime",
    react: "⭐",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }

        // Fetch top-rated anime from the API
        const apiUrl = `https://api.jikan.moe/v4/top/anime`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data.data.length) {
            return reply("No top-rated anime found. 😞");
        }

        // Format the list of top-rated anime
        const topAnimeList = data.data.map(anime => `🎉 ${anime.title}`).join('\n');
        const topAnimeDetails = `⭐ *Top Rated Anime*\n\n${topAnimeList}\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;

        // Send the top-rated anime list
        await conn.sendMessage(from, { text: topAnimeDetails }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching top-rated anime: ${e.message} 😓`);
    }
});

//======================================================================================================================
cmd({
    pattern: "upcominganime",
    desc: "Fetch information about upcoming anime releases.",
    category: "anime",
    react: "📅",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false; // Determine if it's a group chat (default to false if not present)

        // Check if the sender has access
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }

        // Fetch upcoming anime releases from the API
        const apiUrl = `https://api.jikan.moe/v4/seasons/upcoming`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data.data.length) {
            return reply("No upcoming anime releases found. 😔");
        }

        // Format the list of upcoming anime
        const upcomingAnimeList = data.data.map(anime => `🎉 ${anime.title}`).join('\n');
        const upcomingAnimeDetails = `📅 *Upcoming Anime Releases*\n\n${upcomingAnimeList}\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;

        // Send the upcoming anime list
        await conn.sendMessage(from, { text: upcomingAnimeDetails }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching upcoming anime releases: ${e.message} 😓`);
    }
});

//======================================================================================================================

//======================================================================================================================
cmd({
    pattern: 'mobile',
    desc: 'Get mobile details with photo.',
    category: 'main',
    react: '📱',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        // Extract mobile model from the message
        const mobileModel = m.body.split(' ').slice(1).join(' '); // e.g., "Samsung A04e"

        if (!mobileModel) {
            return reply('🔍 Please provide a mobile model. Example: `.mobile Samsung A04e`');
        }

        // Search for mobile details
        const searchResults = await gsmarena.search.search(mobileModel);

        if (!searchResults || searchResults.length === 0) {
            return reply('🚫 No details found for the provided mobile model.');
        }

        // Get the first result
        const firstResult = searchResults[0];
        const device = await gsmarena.catalog.getDevice(firstResult.id); // Fetch device details using the ID

        if (!device) {
            return reply('🚫 No details available for this device.');
        }

        const { name, img, quickSpec, detailSpec } = device;

        // Construct the message
        let specsText = '*📊 Specifications:*\n';
        quickSpec.forEach(spec => {
            specsText += `> 🔗 *${spec.name}:* ${spec.value}\n`;
        });

        detailSpec.forEach(category => {
            specsText += `\n*🌐 ${category.category}:*\n`;
            category.specifications.forEach(spec => {
                specsText += `> 🔗 *${spec.name}:* ${spec.value}\n`;
            });
        });

        const messageText = `
*📱 Mobile Name:* ${name}

${specsText}
        
${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;

        await conn.sendMessage(from, { image: { url: img }, caption: messageText }, { quoted: m });


        console.log('Mobile details and images sent successfully');
    } catch (e) {
        console.error('Error fetching mobile details:', e);
        reply('⚠️ An error occurred while fetching mobile details.');
    }
});

//======================================================================================================================
function detectPlatform() {
    if (process.env.REPL_ID) return 'Replit';
    if (process.env.HEROKU_APP_NAME) return 'Heroku';
    if (process.env.KOYEB_PROJECT_ID) return 'Koyeb';
    if (process.env.AWS_LAMBDA_FUNCTION_NAME) return 'AWS Lambda';
    if (process.env.VERCEL) return 'Vercel';
    return 'Unknown Platform';
}

// Define the platform
const PLATFORM = detectPlatform();

cmd({
    pattern: "alive",
    desc: "Check if the bot is online and send an 'alive' message with system info.",
    category: "main",
    react: "👋🏻",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        // System information
        const systemInfo = `
> *ᴘʟᴀᴛꜰᴏʀᴍᴇ* : ${PLATFORM}
> *ᴜᴘᴛɪᴍᴇ* : ${formatUptime(os.uptime())}
> *ᴛᴏᴛᴀʟ ʀᴀᴍ* : ${formatFileSize(os.totalmem())}
> *ꜰʀᴇᴇ ʀᴀᴍ* : ${formatFileSize(os.freemem())}
        `.trim();

        // Send the audio message
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/vishwamihiranga/BHASHI-PUBLIC/raw/main/ui%20(1).mp3' },
            mimetype: 'audio/mpeg',
            ptt: true
        }, { quoted: mek });

        // Send the image message with system info and description

            await conn.sendMessage(from, {
      document: { url: pdfUrl }, // Path to your PDF file
      fileName: 'A L E X  M D', // Filename for the document
      mimetype: "application/pdf",
      fileLength: 99999999999999,
      image: { url: 'https://i.ibb.co/5rm6dLz/image.png' },
      pageCount: 2024,
      caption: `
*H E L L O  I' M  O N L I N E*

_A Alex Md Whatsapp Bot Based Third Party Application Provide Many Services With A Real Time Automated Conversational Experience. Enjoy._

${systemInfo}

${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`.trim(),
            footer: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: 'A L E X  M D​',
          newsletterJid: "120363333519565664@newsletter",
        },
        externalAdReply: {
          title: 'A L E X  M D',
          body: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: 'https://bhashi-md-ofc.netlify.app/',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    });

        
    } catch (e) {
        console.error('🚫 Error:', e);
        await reply(`🚫 Error: ${e.message}`);
    }
});

// Helper function to format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Helper function to format uptime
function formatUptime(seconds) {
    const days = Math.floor(seconds / (3600*24));
    const hours = Math.floor(seconds % (3600*24) / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    const secs = Math.floor(seconds % 60);
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
}
//======================================================================================================================
cmd({
    pattern: "ping",
    desc: "Check bot's response time.",
    category: "main",
    react: "🪄",
    filename: __filename
}, async (conn, mek, m, { from, quoted, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        const startTime = Date.now();
        const message = await conn.sendMessage(from, { text: '𝗣𝗶𝗻𝗴𝗶𝗻𝗴...' });
        const endTime = Date.now();
        const ping = endTime - startTime;

        // Send the ping response without buttons
            
            await conn.sendMessage(from, {
      document: { url: pdfUrl }, // Path to your PDF file
      fileName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃', // Filename for the document
      mimetype: "application/pdf",
      fileLength: 99999999999999,
      image: { url: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg' },
      pageCount: 2024,
      caption: `⏰ 𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲 𝗧𝗶𝗺𝗲 : ${ping} ms`,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃​',
          newsletterJid: "120363333519565664@newsletter",
        },
        externalAdReply: {
          title: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          body: ' ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: 'alex-id-programmer.vercel.app/',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    });
        
    } catch (e) {
        console.error(e);
        reply(`${e}`);
    }
});
//======================================================================================================================
cmd({
    pattern: "song",
    desc: "Download songs.",
    react: "🎶",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, args, reply, q }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        if (!q) return reply("🪄 Please provide a song URL or name ✨");
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;
        let desc = `*╭─「 𝐴𝐿𝐸𝑋-𝑀𝐷」*
*╰────────────┈>* 
*⏤͟͟͞★❬❬𝐴𝐿𝐸𝑋-𝑀𝐷 𝑆𝑂𝑁𝐺 𝐷𝐿 ❭❭⏤͟͟͞͞★*
*╭⃘─────────────┈◦•☻•◦*
*╎🍀 Title: ${data.title}*
*╎🕛 Time :${data.timestamp}*
*╎🎧 Ago : ${data.ago}*
*╎✨ Views : ${data.views}*
*╚──────────>*
*╭─「  𝑈𝑝𝑙𝑜𝑎𝑑𝑒 𝐵𝑦 」*
*╰────────────┈*
> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★`;

        // Sending video details with a thumbnail image
        await conn.sendMessage(from, { 
            image: { url: data.thumbnail }, 
            caption: desc,
            contextInfo: { 
                forwardingScore: 1, 
                isForwarded: true, 
                forwardedNewsletterMessageInfo: { 
                    newsletterJid: "120363285813931317@newsletter", 
                    newsletterName: "𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃" 
                } 
            }
        }, { quoted: mek });

        // Download audio
        let down = await fg.yta(url);
        let downloadUrl = down.dl_url;
        // Sending audio file + document message
        await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
        await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "audio/mpeg", caption:"ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛", fileName: `BHASHI-${data.title}.mp3` }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message}`);
    }
});

cmd({
    pattern: "video",
    desc: "Download videos.",
    react:"📱",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, args, reply, q }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        if (!q) return reply("Please provide a video URL or name ✨");
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;
        let desc = `*╭─「 𝐴𝐿𝐸𝑋-𝑀𝐷」*
*╰────────────┈>* 
*⏤͟͟͞★❬❬𝐴𝐿𝐸𝑋-𝑀𝐷 𝑉𝐼𝐷𝐸𝑂 𝐷𝐿 ❭❭⏤͟͟͞͞★*
*╭⃘─────────────┈◦•☻•◦*
*╎🍀 Title: ${data.title}*
*╎🕛 Time :${data.timestamp}*
*╎🎧 Ago : ${data.ago}*
*╎✨ Views : ${data.views}*
*╚──────────>*
*╭─「  𝑈𝑝𝑙𝑜𝑎𝑑𝑒 𝐵𝑦 」*
*╰────────────┈*
> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★`;

        // Sending video details with a thumbnail image
        await conn.sendMessage(from, { 
            image: { url: data.thumbnail }, 
            caption: desc,
            contextInfo: { 
                forwardingScore: 1, 
                isForwarded: true, 
                forwardedNewsletterMessageInfo: { 
                    newsletterJid: "120363285813931317@newsletter", 
                    newsletterName: "​𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃" 
                } 
            }
        }, { quoted: mek });

        // Download video
        let down = await fg.ytv(url);
        let downloadUrl = down.dl_url;
        // Sending video file + document message
        await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });
        await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "video/mp4", caption:"ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛", fileName: `BHASHI-${data.title}.mp4` }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message}`);
    }
});
//======================================================================================================================
cmd({
    pattern: "sticker",
    react: "🔮",
    alias: ["s","stic"],
    
    category: "convert",
    use: '.sticker <Reply to image>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const senderNumber = m.sender;
    const isGroup = m.isGroup || false;
            if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
    const isQuotedViewOnce = m.quoted ? (m.quoted.type === 'viewOnceMessage') : false
    const isQuotedImage = m.quoted ? ((m.quoted.type === 'imageMessage') || (isQuotedViewOnce ? (m.quoted.msg.type === 'imageMessage') : false)) : false
    const isQuotedVideo = m.quoted ? ((m.quoted.type === 'videoMessage') || (isQuotedViewOnce ? (m.quoted.msg.type === 'videoMessage') : false)) : false
    const isQuotedSticker = m.quoted ? (m.quoted.type === 'stickerMessage') : false
     if ((m.type === 'imageMessage') || isQuotedImage) {
      var nameJpg = getRandom('')
      isQuotedImage ? await m.quoted.download(nameJpg) : await m.download(nameJpg)
    let sticker = new Sticker(nameJpg + '.jpg', {
      pack: pushname, // The pack name
      author: '', // The author name
      type: q.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
      categories: ["🤩", "🎉"], // The sticker category
      id: "12345", // The sticker id
      quality: 75, // The quality of the output file
      background: "transparent", // The sticker background color (only for full stickers)
  });
  const buffer = await sticker.toBuffer();
  return conn.sendMessage(from, {sticker: buffer}, {quoted: mek })
}  else if ( isQuotedSticker ) { 

    var nameWebp = getRandom('')
    await m.quoted.download(nameWebp)
  let sticker = new Sticker(nameWebp + '.webp', {
    pack: pushname, // The pack name
    author: '', // The author name
    type: q.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
    categories: ["🤩", "🎉"], // The sticker category
    id: "12345", // The sticker id
    quality: 75, // The quality of the output file
    background: "transparent", // The sticker background color (only for full stickers)
});
const buffer = await sticker.toBuffer();
return conn.sendMessage(from, {sticker: buffer}, {quoted: mek })
}else return await  reply(imgmsg)
} catch (e) {
    reply('Error !!')
    console.log(e)
}
})
//======================================================================================================================

//======================================================================================================================
cmd({
    pattern: "dnslook",
  alias: ["dns","dnslookup"],
    desc: "Perform DNS lookup on a domain",
    category: "useful",
    react: "🌐",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        // Check access permissions
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }

        // Check if a domain was provided
        if (args.length === 0) {
            return reply("❌ Please provide a domain to lookup. Example: `.dnslook example.com`");
        }

        const domain = args[0];

        // Perform DNS lookup
        dns.lookup(domain, (err, address) => {
            if (err) {
                return reply(`❌ DNS Lookup failed: ${err.message}`);
            }
            reply(`🌐 DNS Lookup for ${domain}\n\n🔗 IP Address: ${address}\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`);
        });
    } catch (e) {
        console.log(e);
        reply(`🚫 An error occurred: ${e.message}`);
    }
});
//======================================================================================================================
cmd({
    pattern: "headers",
    desc: "Fetch HTTP headers from a website",
    category: "useful",
    react: "📑",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        if (args.length === 0) {
            return reply("❌ Please provide a URL. Example: .headers https://example.com")
        }

        const url = args[0]
        const response = await axios.head(url)
        const headers = response.headers

        const headerInfo = `
*📑 HTTP Headers for ${url} 📑*
${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}

${Object.entries(headers).map(([key, value]) => `• ${key}: ${value}`).join('\n')}
        `.trim()

        reply(headerInfo)
    } catch (e) {
        console.log(e)
        reply(`🚫 An error occurred: ${e.message}`)
    }
})
//======================================================================================================================
cmd({
    pattern: "ipgeo",
    desc: "Get geolocation information for an IP address",
    category: "useful",
    react: "🌐",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        if (args.length === 0) {
            return reply("❌ Please provide an IP address. Example: .iplookup 8.8.8.8");
        }

        const ipAddress = args[0];

        // Replace this URL with the actual API endpoint
        const apiUrl = `https://ipinfo.io/${encodeURIComponent(ipAddress)}/json`;

        // If using a service that requires an API key, add it here
        const response = await axios.get(apiUrl);

        const data = response.data;
        const { ip, city, region, country, loc, org } = data;

        reply(`*📍 IP Address Information*\n\n> 🔗 IP Address: ${ip}\n> 🌆 City: ${city}\n> 🗺️ Region: ${region}\n> 🌍 Country: ${country}\n> 📡 Location: ${loc}\n> 🏢 Organization: ${org}\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`);
    } catch (e) {
        console.log(e);
        reply(`🚫 An error occurred: ${e.message}`);
    }
});
//======================================================================================================================
cmd({
    pattern: 'newpaste',
    desc: 'Creates a new paste on Pastebin and returns the URL.',
    category: 'utility',
    react: '📄',
    filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        const pasteContent = args.join(' ');

        if (!pasteContent) {
            return reply('📝 Please provide some content for the paste. Example: `.newpaste This is my new paste content`');
        }
        const pastebinUrl = 'https://pastebin.com/api/api_post.php';
        const pastebinParams = new URLSearchParams();
        pastebinParams.append('api_dev_key', PASTEBIN_API_KEY);
        pastebinParams.append('api_option', 'paste');
        pastebinParams.append('api_paste_code', pasteContent);
        pastebinParams.append('api_paste_private', 1);  
        pastebinParams.append('api_paste_expire_date', '10M');  
        pastebinParams.append('api_paste_name', 'New Paste');
        const response = await axios.post(pastebinUrl, pastebinParams);
        const pasteUrl = response.data;

        if (pasteUrl.startsWith('https://')) {
            reply(`📄 *Your paste has been created:* ${pasteUrl}\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`);
        } else {
            reply(`⚠️ Failed to create paste. Error: ${pasteUrl}\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`);
        }
    } catch (error) {
        console.error('Error creating Pastebin paste:', error);
        reply('⚠️ An error occurred while creating the paste.');
    }
});

//======================================================================================================================

cmd({
    pattern: 'getpaste',
    desc: 'Fetches the raw content of a Pastebin paste using its URL or key.',
    category: 'utility',
    react: '📄',
    filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        const pasteUrl = args[0];
        if (!pasteUrl) {
            return reply('🔍 Please provide a Pastebin URL or key. Example: `.getpaste https://pastebin.com/abcdefg`');
        }

        const pasteKey = pasteUrl.split('/').pop();

        const rawPastebinUrl = `https://pastebin.com/raw/${pasteKey}`;

        const response = await axios.get(rawPastebinUrl);
        const pasteContent = response.data;

        reply(`📄 *Pastebin Content*:\n\n\`\`\`${pasteContent}\`\`\`\\\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`);
    } catch (error) {
        console.error('Error retrieving Pastebin content:', error);
        reply('⚠️ An error occurred while retrieving the paste content.');
    }
});
//======================================================================================================================
cmd({
    pattern: "system",
    alias: ["status", "botinfo"],
    desc: "Check uptime, RAM usage, CPU info, and more",
    category: "main",
    react: "🧬",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        // System and memory information
        const uptime = runtime(process.uptime());
        const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const totalMemory = Math.round(os.totalmem() / 1024 / 1024);
        const cpuArch = os.arch();
        const cpuCores = os.cpus().length;
        const systemPlatform = os.platform();
        const systemType = os.type();
        const freeMemory = (os.freemem() / 1024 / 1024).toFixed(2);

        // Status message to be sent
        let status = `*╭─「 𝐴𝐿𝐸𝑋-𝑀𝐷 」*
*╰───────────────┈*
*⏤͟͟͞͞★❬❬ 𝑨𝑳𝑬𝑿-𝑴𝑫 𝑺𝒚𝒔𝒕𝒆𝒎 𝑰𝒏𝒇𝒐❭❭⏤͟͟͞͞★*
*╭─────────────────┈◦•☻•◦*
*╎⏰𝑈𝑝 𝑇𝑖𝑚𝑒 : ${runtime(process.uptime())}*
*╎📟 𝑅𝑎𝑚 : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB*
*╎⚙️ 𝑃𝑙𝑎𝑡𝐹𝑜𝑟𝑚  : ${os.hostname()}*
*╎👨‍💻 𝑂𝑤𝑛𝑒𝑟 : 𝐀𝙻𝗘𝙓-𝙄𝘿*
*╚───────────────────♲*
*╭─「  𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝑩𝒚 」*
*╰────────────┈*
> *⏤͟͟͞͞★❬❬ 𝑴𝑹.𝑨𝑳𝑬𝑿-𝑰𝑫 ❭❭⏤͟͟͞͞★*
           *⦁│𝒑𝒓𝒐𝒈𝒓𝒂𝒎𝒎𝒆𝒓│⦁*`;

        await conn.sendMessage(from, { 
            image: { url: "https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg" },
            caption: status,
            contextInfo: { 
                forwardingScore: 1, 
                isForwarded: true, 
                forwardedNewsletterMessageInfo: { 
                    newsletterJid: "120363333519565664@newsletter", 
                    newsletterName: "𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃​" 
                }
            }
        });

    } catch (e) {
        console.error(e);
        reply(`*Error:* ${e.message}`);
    }
});
//======================================================================================================================
cmd({
    pattern: "movie",
    desc: "Fetch detailed information about a movie.",
    category: "utility",
    react: "🎬",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        const movieName = args.join(' ');
        if (!movieName) {
            return reply("📽️ Please provide the name of the movie.");
        }

        const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${config.OMDB_API_KEY}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.Response === "False") {
            return reply("🚫 Movie not found.");
        }

        const movieInfo = `╭─「 𝐴𝐿𝐸𝑋-𝑀𝐷 」
╰───────────────┈ ⏤͟͟͞͞★❬❬ 𝐴𝐿𝐸𝑋-𝑀𝐷 𝑀𝑉 𝐼𝑁𝐹𝑂 ❭❭⏤͟͟͞͞★
╭⃘──────────────┈◦•☻•◦
╎☘️ Tιтle : $ {data.title}
╎📆 Rᴇʟᴇᴀꜱᴇ ➠ ${data.released}
╎🌼 Rᴀᴛɪɴɢ ➠ ${data.rating}
╎🌙 Lᴀɴɢᴜᴀɢᴇꜱ ➠ ${data.languages}
╎🌈 Dɪʀᴇᴄᴛᴏʀ ➠ ${data.director}
╎〽️ Gᴇɴʀᴇs ➠ ${data.genres}
╎🌎 Cᴏᴜɴᴛʀʏ ➠ ${data.country}
╚────────────────>
📖 ${data.plot}

╭─「  𝑈𝑝𝑙𝑜𝑎𝑑𝑒 𝐵𝑦 」
╰────────────┈┈`;

        const imageUrl = data.Poster && data.Poster !== 'N/A' ? data.Poster : config.ALIVE_IMG;

        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: `${movieInfo}\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`❌ Error: ${e.message}`);
    }
});

//======================================================================================================================
cmd({
    pattern: "topmovies",
    desc: "Fetch a list of top-rated movies based on user ratings.",
    category: "movie",
    react: "⭐",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        const apiUrl = `http://www.omdbapi.com/?s=top_rated&apikey=${config.OMDB_API_KEY}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.Response === "False") {
            return reply("No top-rated movies found. 😞");
        }

        const topMoviesList = data.Search.map(movie => `⭐ *${movie.Title}*`).join('\n');
        const topMoviesDetails = `⭐ *Top Rated Movies*\n\n${topMoviesList}\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;

        await conn.sendMessage(from, { text: topMoviesDetails }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`Error fetching top-rated movies: ${e.message} 😓`);
    }
});

//======================================================================================================================

//======================================================================================================================

//======================================================================================================================


//======================================================================================================================
cmd({
    pattern: "randommovie",
    desc: "Get a random movie recommendation.",
    category: "movie",
    react: "🎲",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        const apiUrl = `http://www.omdbapi.com/?s=random&apikey=${config.OMDB_API_KEY}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.Response === "False") {
            return reply("🚫 No movies found for the random recommendation.");
        }

        const randomMovie = data.Search[Math.floor(Math.random() * data.Search.length)];
        const randomMovieInfo = `
🎥 *Random Movie Recommendation* 🎬

🎥 *ᴛɪᴛʟᴇ:* ${randomMovie.Title}
🌏 *ʏᴇᴀʀ:* ${randomMovie.Year}
`;

        const imageUrl = randomMovie.Poster && randomMovie.Poster !== 'N/A' ? randomMovie.Poster : config.ALIVE_IMG;

        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: `${randomMovieInfo}\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`Error fetching random movie recommendation: ${e.message} 😓`);
    }
});
//======================================================================================================================
cmd({
    pattern: "srepo",
    desc: "Fetch information about a GitHub repository.",
    category: "utility",
    react: "📁",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }

        // Extract repository name from arguments
        const repo = args.join(' ');
        if (!repo) {
            return reply("Please provide a GitHub repository name in the format `owner/repo`.");
        }

        // GitHub API URL
        const apiUrl = `https://api.github.com/repos/${repo}`;

        // Fetching repository information from GitHub
        const response = await axios.get(apiUrl);

        // Check for a valid response
        if (response.status !== 200 || !response.data) {
            return reply("Error: Unable to fetch repository information. Please try again later.");
        }

        // Extracting data from the response
        const data = response.data;

        // Constructing repository information message
        let repoInfo = `📁 _*GitHub Repository Info*_ 📁\n\n`;
        repoInfo += `> 📌 *Name*: ${data.name}\n`;
        repoInfo += `> 🔗 *URL*: ${data.html_url}\n`;
        repoInfo += `> 📝 *Description*: ${data.description || 'No description provided'}\n`;
        repoInfo += `> ⭐ *Stars*: ${data.stargazers_count}\n`;
        repoInfo += `> 🍴 *Forks*: ${data.forks_count}\n`;
        repoInfo += `> 🧑‍💻 *Owner*: ${data.owner.login}\n`;
        repoInfo += `> 🛠️ *Primary Language*: ${data.language || 'Not specified'}\n`;
        repoInfo += `> 📅 *Created on*: ${new Date(data.created_at).toLocaleDateString()}\n`;
        repoInfo += `> 📜 *License*: ${data.license ? data.license.name : 'No license specified'}\n`;
        repoInfo += `\n`;
        repoInfo += `\`\`\`> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★\`\`\`\n`;

        // Sending the repository owner's avatar as an image
        const avatarUrl = data.owner.avatar_url;
        const imageCaption = `Repository Owner: ${data.owner.login}`;

        await conn.sendMessage(from, {
            image: { url: avatarUrl },
            caption: repoInfo 
        }, { quoted: mek });

        // Sending the repository information back to the user
   

    } catch (e) {
        // Handling specific API errors
        if (e.response && e.response.status === 404) {
            return reply("Error: Repository not found. Please check the owner/repo format. Ex: vishwamihi/BhashiMD");
        } else if (e.response && e.response.status === 403) {
            return reply("Error: GitHub API rate limit exceeded. Please try again later.");
        } else {
            console.error(e); // Log the error for debugging
            reply(`Error fetching repository info: ${e.message}`);
        }
    }
});

//======================================================================================================================
cmd({
    pattern: "whois",
    desc: "Perform WHOIS lookup on a domain or IP",
    category: "useful",
    react: "📄",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
        if (args.length === 0) {
            return reply("❌ Please provide a domain or IP address. Example: .whois google.com")
        }

        const target = args[0]
        whois.lookup(target, (err, data) => {
            if (err) {
                return reply(`❌ WHOIS lookup failed: ${err.message}`)
            }
            reply(`*📄 WHOIS Lookup for ${target} 📄*\n\n${data}\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`)
        })
    } catch (e) {
        console.log(e)
        reply(`🚫 An error occurred: ${e.message}`)
    }
})
//======================================================================================================================
cmd({
    pattern: 'zip',
    desc: 'Search for location information using zip codes.',
    category: 'main',
    react: '📍',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        // Extract zip codes from the message
        const zipCodes = m.body.split(' ').slice(1).join(',').trim();

        if (!zipCodes) {
            return reply('🔍 Please provide zip codes to search. Example: `.zip 10005,10006`');
        }

        // Call the ZipCodeBase API
        const apiKey = config.ZIPCODEBASE_API_KEY; // Replace with your API key
        const response = await axios.get(`https://app.zipcodebase.com/api/v1/search`, {
            params: {
                codes: zipCodes // Use 'codes' param, not 'city'
            },
            headers: {
                apikey: apiKey
            }
        });

        const data = response.data;

        if (!data || !data.results || Object.keys(data.results).length === 0) {
            return reply('🚫 No data found for the provided zip codes.');
        }

        // Construct the message with zip code details
        let messageText = '*📍 Zip Code Information 📍*\n\n';
        for (const [zipCode, info] of Object.entries(data.results)) {
            messageText += `*📬 Zip Code:* ${zipCode}\n\n`;
            info.forEach(location => {
                messageText += `> 🌏*Country:* ${location.country}\n> 🏛*City:* ${location.city}\n> 🚥*State:* ${location.state}\n\n`;
            });
        }

        // Send the zip code details
        await conn.sendMessage(from, { text: messageText }, { quoted: m });

        console.log('Zip code information sent successfully');
    } catch (e) {
        console.error('Error fetching zip code information:', e);
        reply('⚠️ An error occurred while fetching zip code information.');
    }
});
//======================================================================================================================
cmd({
    pattern: "jid",
    desc: "Get the JID of the chat.",
    category: "main",
    react: "🔍",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        // Retrieve the JID of the chat
        const chatJid = from;

        // Send the JID response
        await conn.sendMessage(from, { 
            text: `📍 Chat JID: ${chatJid}`,
            footer: '${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}'
        });

    } catch (e) {
        console.error(e);
        reply(`${e}`);
    }
});

//======================================================================================================================

cmd({
    pattern: "wa",
    desc: "Generate a WhatsApp link with a custom message for the quoted user.",
    category: "main",
    react: "🔗",
    filename: __filename
}, async (conn, mek, m, { from, reply, quoted, text }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        // Check if the user has access to this command
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }

        // Check if a message was quoted
        if (!quoted) {
            return reply("Please reply to a message to generate a WhatsApp link for that user.");
        }

        // Default message if none provided
        const defaultMessage = 'Hello!';
        const message = (text && text.trim()) ? text.trim() : defaultMessage;

        // Extract the quoted user's phone number (assuming it's in E.164 format, i.e., with country code)
        const quotedJid = quoted.sender;
        const phoneNumber = quotedJid.split('@')[0]; // Extract the phone number part from the quoted JID

        // Construct the wa.me link with the message
        const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        // Send the response with the wa.me link
        await conn.sendMessage(from, { 
            text: `🔗 *WhatsApp Link for quoted user:* ${waLink}`,
            footer: '${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}'
        });

    } catch (e) {
        console.error(e);
        reply(`Please reply to a message to generate a WhatsApp link for that user. ${e}`);
    }
});


//======================================================================================================================
cmd({
  pattern: "userinfo",
  desc: "Get detailed information about the user.",
  category: "main",
  react: "🧑‍💻",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
      // Check if the command is responding to a quoted message
      const targetMessage = m.quoted || m;
      const senderNumber = targetMessage.sender;
      const isGroup = m.isGroup || false;

      if (!checkAccess(senderNumber, isGroup)) {
          return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
      }

      // Retrieve the sender's JID
      const senderJid = targetMessage.sender;
      const phoneNumber = senderJid.split('@')[0]; // Extract the phone number part from the JID

      // Retrieve user information
      const userName = targetMessage.pushName || 'Not Available'; // Display name or default to 'Not Available'

      // Check if the user is an admin (only applicable in group chats)
      let isAdmin = 'N/A';
      if (from.endsWith('@g.us')) { // If in a group
          const groupMetadata = await conn.groupMetadata(from).catch(() => null);
          if (groupMetadata) {
              const participant = groupMetadata.participants.find(participant => participant.jid === senderJid);
              isAdmin = participant && participant.isAdmin ? 'Yes' : 'No';
          }
      }

      // Construct the user information message
      let userInfo = `👤 User Information:\n`;
      userInfo += `📞 Phone Number: ${phoneNumber}\n`;
      userInfo += `👤 Display Name: ${userName}\n`;
      userInfo += `👑 Admin: ${isAdmin}\n`;

      // Send the user information response
      await conn.sendMessage(from, { 
          text: userInfo,
          footer: '${mono}ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛${mono}'
      });

  } catch (e) {
      console.error(e);
      reply(`Error: ${e.message}`);
  }
});
//======================================================================================================================
cmd({
    pattern: "solve",
    alias: ["mathsolve"],
    desc: "🔢 Solve mathematical expressions.",
    react: "🔢",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        // Check if the user has provided a mathematical expression
        if (!q) {
            return reply("❗ Please provide a mathematical expression to solve. Example: `.solve 2 + 2`");
        }

        // Evaluate the mathematical expression
        let result = math.evaluate(q);

        // Prepare response with the solved result
        const response = `
📊 *Math Expression:* ${q}
✅ *Result:* ${result}

${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}
        `;

        // Send the result to the user
        return conn.sendMessage(from, { text: response }, { quoted: mek });

    } catch (e) {
        console.error(e);

        // Handle specific MathJS errors
        if (e instanceof math.Error) {
            return reply("❌ Invalid mathematical expression. Please check your input and try again.");
        }

        // Generic error message
        return reply(`⚠️ An error occurred while solving the expression: ${e.message}`);
    }
});

//======================================================================================================================

//=================================================================================================================================
cmd({
    pattern: 'hentai2',
    desc: 'Fetches NSFW Waifu images',
    category: 'download',
    react: '🙄',
}, async (conn, mek, m, { from, quoted, reply }) => {
    const url = 'https://api.waifu.pics/nsfw/waifu'; // API endpoint for Waifu images

    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        for (let i = 0; i < 5; i++) {
            const response = await axios.get(url);
            const imageUrl = response.data.url;
            const caption = ''

            await conn.sendMessage(from, { image: { url: imageUrl } },  { quoted: mek });
        }
    } catch (error) {
        console.error(error);
        reply('🚫 An error occurred while retrieving the data: ' + error.message);
    }
});

//========================================================================================================================================
// Command to fetch NSFW Trap images
cmd({
    pattern: 'trap',
    desc: 'Fetches NSFW trap images',
    category: 'Hentai',
    react: '🙄',
}, async (conn, mek, m, { from, quoted, reply }) => {
    const url = 'https://api.waifu.pics/nsfw/trap';

    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        for (let i = 0; i < 5; i++) {
            const response = await axios.get(url);
            const imageUrl = response.data.url;
            const caption = `Trap Waifu Image #${i + 1} 🔥\n\n${mono}ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛${mono}`;
            await conn.sendMessage(from, { image: { url: imageUrl }, caption }, { quoted: mek });
        }
    } catch (error) {
        reply('🚫 An error occurred while retrieving the data: ' + error.message);
    }
});

//========================================================================================================================================
// Command to fetch NSFW Neko images
cmd({
    pattern: 'hneko',
    desc: 'Fetches NSFW neko images',
    category: 'Hentai',
    react: '🙄',
}, async (conn, mek, m, { from, quoted, reply }) => {
    const url = 'https://api.waifu.pics/nsfw/neko';

    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        for (let i = 0; i < 5; i++) {
            const response = await axios.get(url);
            const imageUrl = response.data.url;
            const caption = `Neko Waifu Image #${i + 1} 🐾\n\n${mono}ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛${mono}`;
            await conn.sendMessage(from, { image: { url: imageUrl }, caption }, { quoted: mek });
        }
    } catch (error) {
        reply('🚫 An error occurred while retrieving the data: ' + error.message);
    }
});

//========================================================================================================================================
// Command to fetch NSFW Blowjob images
cmd({
    pattern: 'blowjob',
    desc: 'Fetches NSFW blowjob images',
    category: 'Hentai',
    react: '🙄',
}, async (conn, mek, m, { from, quoted, reply }) => {
    const url = 'https://api.waifu.pics/nsfw/blowjob';

    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        for (let i = 0; i < 5; i++) {
            const response = await axios.get(url);
            const imageUrl = response.data.url;
            const caption = `Blowjob Waifu Image #${i + 1} 🍑\n\n${mono}ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛${mono}`;
            await conn.sendMessage(from, { image: { url: imageUrl }, caption }, { quoted: mek });
        }
    } catch (error) {
        reply('🚫 An error occurred while retrieving the data: ' + error.message);
    }
});

//========================================================================================================================================
// Command to fetch NSFW hentai videos
cmd({
    pattern: 'hentaivid',
    desc: 'Fetches NSFW hentai videos',
    category: 'Hentai',
    react: '🙄',
}, async (conn, mek, m, { from, quoted, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        let videos = await hentai();
        let length = videos.length > 10 ? 10 : videos.length;
        let i = Math.floor(Math.random() * length);

        await conn.sendMessage(from, {
            video: { url: videos[i].video_1 },
            caption: `*🎥Title:* ${videos[i].title}\n*> 🎥Category:* ${videos[i].category} 🎥\n\n${mono}ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛${mono}`
        }, { quoted: mek });
    } catch (error) {
        reply('🚫 An error occurred while retrieving the video: ' + error.message);
    }
});

async function hentai() {
    return new Promise((resolve, reject) => {
        const page = Math.floor(Math.random() * 1153);
        axios.get('https://sfmcompile.club/page/' + page)
            .then((data) => {
                const $ = cheerio.load(data.data);
                const results = [];
                $('#primary > div > div > ul > li > article').each(function () {
                    results.push({
                        title: $(this).find('header > h2').text(),
                        link: $(this).find('header > h2 > a').attr('href'),
                        category: $(this).find('header > div.entry-before-title > span > span').text().replace('in ', ''),
                        share_count: $(this).find('header > div.entry-after-title > p > span.entry-shares').text(),
                        views_count: $(this).find('header > div.entry-after-title > p > span.entry-views').text(),
                        type: $(this).find('source').attr('type') || 'video/mp4',
                        video_1: $(this).find('source').attr('src') || $(this).find('img').attr('data-src'),
                        video_2: $(this).find('video > a').attr('href') || ''
                    });
                });
                resolve(results);
            })
            .catch((error) => reject(error));
    });
}

//========================================================================================================================================
// Command to fetch random NSFW content
cmd({
    pattern: 'customnsfw',
    desc: 'Fetches random NSFW content',
    category: 'Hentai',
    react: '🙄',
}, async (conn, mek, m, { from, quoted, reply }) => {
    const url = 'https://api.waifu.pics/nsfw/custom'; // Replace with the actual URL if different

    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        for (let i = 0; i < 5; i++) {
            const response = await axios.get(url);
            const imageUrl = response.data.url;
            const caption = `Custom NSFW Image #${i + 1} 🔥\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;
            await conn.sendMessage(from, { image: { url: imageUrl }, caption }, { quoted: mek });
        }
    } catch (error) {
        reply('🚫 An error occurred while retrieving the data: ' + error.message);
    }
});

//========================================================================================================================================
const nsfwCommands = [
    { pattern: 'nsfwloli', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/nsfwloli.json' },
    { pattern: 'nsfwfoot', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/nsfwfoot.json' },
    { pattern: 'nsfwass', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/nsfwass.json' },
    { pattern: 'nsfwbdsm', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/nsfwbdsm.json' },
    { pattern: 'nsfwcum', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/nsfwcum.json' },
    { pattern: 'nsfwero', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/nsfwero.json' },
    { pattern: 'nsfwfemdom', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/nsfwfemdom.json' },
    { pattern: 'nsfwglass', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/nsfwglass.json' },
    { pattern: 'hentai', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/hentai.json' },
    { pattern: 'nsfworgy', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/nsfworgy.json' },
    { pattern: 'tetas', url: 'https://api-fgmods.ddns.net/api/nsfw/boobs?apikey=fg-dylux', fallback: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/tetas.json' },
    { pattern: 'booty', url: 'https://api-fgmods.ddns.net/api/nsfw/ass?apikey=fg-dylux', fallback: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/booty.json' },
    { pattern: 'ecchi', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/ecchi.json' },
    { pattern: 'furro', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/furro.json' },
    { pattern: 'trapito', url: 'https://api.waifu.pics/nsfw/trap' },
    { pattern: 'imagenlesbians', url: 'https://api-fgmods.ddns.net/api/nsfw/lesbian?apikey=fg-dylux', fallback: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/imagenlesbians.json' },
    { pattern: 'panties', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/panties.json' },
    { pattern: 'pene', url: 'https://api-fgmods.ddns.net/api/nsfw/penis?apikey=fg-dylux', fallback: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/pene.json' },
    { pattern: 'porno', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/porno.json' },
    { pattern: 'randomxxx', urls: [
        'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/tetas.json',
        'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/booty.json',
        'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/imagenlesbians.json',
        'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/panties.json',
        'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/porno.json'
    ] },
    { pattern: 'pechos', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/pechos.json' },
    { pattern: 'yaoi', url: 'https://nekobot.xyz/api/image?type=yaoi' },
    { pattern: 'yaoi2', url: 'https://purrbot.site/api/img/nsfw/yaoi/gif' },
    { pattern: 'yuri', url: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/yuri.json' },
    { pattern: 'yuri2', url: 'https://purrbot.site/api/img/nsfw/yuri/gif', fallback: 'https://raw.githubusercontent.com/shrkbadboy/LuffyBot-MD/master/src/JSON/yuri.json' }
];

const fetchImage = async (url) => {
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        console.error(`Error fetching from ${url}: ${error}`);
        return null;
    }
};

nsfwCommands.forEach(({ pattern, url, fallback, urls }) => {
    cmd({
        pattern,
        desc: `Fetches random ${pattern} image.`,
        category: "nsfw",
        react: "🔞",
        filename: __filename
    }, async (conn, mek, m, { from, reply }) => {
        try {
            const senderNumber = m.sender;
            const isGroup = m.isGroup || false;
            if (!checkAccess(senderNumber, isGroup)) {
                return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
            }

            let imageUrl;
            if (urls) {
                const randomUrl = urls[Math.floor(Math.random() * urls.length)];
                const res = await fetchImage(randomUrl);
                imageUrl = res ? res[Math.floor(Math.random() * res.length)] : null;
            } else {
                const data = await fetchImage(url);
                if (data) {
                    imageUrl = Array.isArray(data) ? data[Math.floor(Math.random() * data.length)] : data.url;
                } else if (fallback) {
                    const fallbackData = await fetchImage(fallback);
                    imageUrl = fallbackData ? fallbackData[Math.floor(Math.random() * fallbackData.length)] : null;
                }
            }

            if (imageUrl) {
                await conn.sendMessage(from, { image: { url: imageUrl }, caption: `🫦 Here is your _${pattern}_ image\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`.trim() }, { quoted: m });
            } else {
                reply('Sorry, I could not fetch the image.');
            }
        } catch (error) {
            console.error(`Error handling ${pattern} command: ${error}`);
            reply(`An error occurred while processing your request. ${error}`);
        }
    });
});

//========================================================================================================================================
cmd({
    pattern: "xnxx", // Command trigger
    desc: "Search for xnxx videos", // Description of the command
    category: "nsfw", // Category for the command
    react: "🔞", // Emoji to react with
    filename: __filename // Current file name
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        // Access check
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }

        // Validate search query
        if (!q) {
            return await reply("Please provide a search query. Usage: .xnxx <query>");
        }

        // Perform the search (assuming dyluxApi.xnxxSearch is defined)
        let searchResults = await dyluxApi.xnxxSearch(q);

        // Check if results are found
        if (searchResults.status) {
            let resultText = searchResults.result.map((item, index) => {
                // Fetching additional details
                const publishedDate = item.publishedDate || "Unknown"; // Replace with actual field
                const duration = item.duration || "Unknown"; // Replace with actual field

                return `${index + 1}. *🚨 ᴛɪᴛʟᴇ:* ${item.title}\n> *⚡ʟɪɴᴋ:* ${item.link}\n`;
            }).join("\n");

            // Append signature
            resultText += `\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;

            await conn.sendMessage(from, { text: resultText }, { quoted: mek });
        } else {
            await reply("No results found for your search.");
        }
    } catch (error) {
        console.error(error);
        await reply("An error occurred while processing your request.");
    }
});


// Define command metadata for xnxxdl
cmd({
    pattern: "xnxxdl", // Command trigger
    desc: "Download xnxx video", // Description of the command
    category: "nsfw", // Category for the command
    react: "👾", // Emoji to react with
    filename: __filename // Current file name
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        // Access check
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }

        // Validate video link
        if (!q || !q.includes("xnxx.com")) {
            return await reply("Please provide a valid xnxx link. Usage: .xnxxdl <link>");
        }

        // Perform the download (assuming dyluxApi.xnxxdl is defined)
        let downloadResult = await dyluxApi.xnxxdl(q);

        // Check if download is successful
        if (downloadResult.url_dl) {
            const videoInfo = `*🎬 ALEX XNXX DL 🎥*\n\n> ✍ *TITLE:* ${downloadResult.title}\n> ⌛ *DURATION:* ${downloadResult.duration}\n> 📽 *QUALITY:* ${downloadResult.quality}\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;

            // Send the video with caption
            await conn.sendMessage(from, { video: { url: downloadResult.url_dl }, caption: videoInfo }, { quoted: mek });
        } else {
            await reply("Failed to download the video.");
        }
    } catch (error) {
        console.error(error);
        await reply("An error occurred while processing your request.");
    }
});


//========================================================================================================================================
function encodeToMorse(text) {
    return text.toUpperCase().split('').map(char => morseCodeMap[char] || char).join(' ');
}

cmd({
    pattern: 'morse',
    desc: 'Convert text to Morse code',
    category: 'fun',
    react: '📡',
    filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        if (!args.length) {
            return reply('Please provide text to convert to Morse code. Example: `.morse Hello World`');
        }

        const inputText = args.join(' ');
        const morseCode = encodeToMorse(inputText);

        await reply(`*⚠️ Morse code for* "${inputText}":\n${morseCode}\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★{mono}`);
    } catch (e) {
        console.error('Error converting to Morse code:', e);
        reply('⚠️ An error occurred while converting to Morse code.');
    }
});

//====================================================================================================================================================================================================================================================================================================
cmd({
    pattern: 'mysterybox',
    desc: 'Open a mystery box and get a surprise item!',
    category: 'fun',
    react: '🎁',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        // Get a random item from the list
        const randomIndex = Math.floor(Math.random() * mysteryItems.length);
        const mysteryItem = mysteryItems[randomIndex];

        // Send the mystery item as a surprise
        await conn.sendMessage(from, { text: `🎉 *Congratulations!* You've received: ${mysteryItem}\n\n${mono}ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛${mono}` }, { quoted: m });

        console.log('Mystery box opened successfully');
    } catch (e) {
        console.error('Error opening mystery box:', e);
        reply('⚠️ An error occurred while opening the mystery box.');
    }
});
//====================================================================================================================================================================================================================================================================================================
cmd({
    pattern: 'predict',
    desc: 'Gives a random prediction about your future.',
    category: 'fun',
    react: '🔮',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        // Define random categories for predictions
        const careers = ['software developer', 'artist', 'CEO of a tech company', 'professional gamer', 'chef'];
        const loveLife = ['you will meet someone special', 'an old friend will reach out', 'you will take an exciting solo adventure', 'love will surprise you when least expected'];
        const randomEvents = ['you will win the lottery', 'you will discover a hidden talent', 'a big opportunity will come your way', 'a mystery will be revealed to you'];

        // Randomly select predictions from the arrays
        const careerPrediction = careers[Math.floor(Math.random() * careers.length)];
        const loveLifePrediction = loveLife[Math.floor(Math.random() * loveLife.length)];
        const randomEventPrediction = randomEvents[Math.floor(Math.random() * randomEvents.length)];

        // Create the prediction message
        const predictionMessage = `
🔮 *Here is your future prediction* 🔮

*Career*: You will become a ${careerPrediction}.

*Love Life*: ${loveLifePrediction}.

*Random Event*: ${randomEventPrediction}.

🌟 May your future be as bright as this prediction!
        
${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;

        // Send the prediction message
        await conn.sendMessage(from, { text: predictionMessage }, { quoted: m });
        console.log('Prediction sent successfully');
    } catch (e) {
        console.error('Error executing prediction command:', e);
        reply('⚠️ An error occurred while making your prediction.');
    }
});

//====================================================================================================================================================================================================================================================================================================
// Define the Pixabay API key and endpoint
const PIXABAY_API_KEY = config.PIXABAY_API_KEY;
const PIXABAY_API_URL = 'https://pixabay.com/api/videos/';

// GIF Search command
cmd({
    pattern: "gif",
    react: "🎥",
    desc: "Search for GIF-like animated images on Pixabay.",
    category: "search",
    use: '.gif <search term> [tiny|small|medium|large]',
    filename: __filename
},
async (conn, mek, m, { from, q, args, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        if (!q) return reply("❗ Please provide a search term.");

        // Extract search term and size preference
        const searchTerm = args.slice(0, -1).join(' ') || args[0];
        const sizePreference = args[args.length - 1].toLowerCase();

        // Validate size preference
        const validSizes = ['tiny', 'small', 'medium', 'large'];
        const gifSize = validSizes.includes(sizePreference) ? sizePreference : 'small';

        // Make request to Pixabay API for animated videos (GIF-like content)
        const response = await axios.get(PIXABAY_API_URL, {
            params: {
                key: PIXABAY_API_KEY,
                q: searchTerm,
                video_type: 'animation',
                per_page: 5
            }
        });

        const data = response.data;
        if (data.hits.length === 0) return reply("❗ No GIFs found for the provided search term.");

        // Send GIFs one by one
        for (let i = 0; i < data.hits.length; i++) {
            const hit = data.hits[i];
            const caption = `*${i + 1}.* ${hit.tags}\n👤 *User:* ${hit.user}\n👁️ *Views:* ${hit.views}\n❤️ *Likes:* ${hit.likes}\n🖼️ *Size:* ${gifSize}\n\n${mono}ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛${mono}`;

            await conn.sendMessage(from, { 
                video: { url: hit.videos[gifSize].url },
                caption: caption,
                gifPlayback: true
            }, { quoted: mek });

            // Add a small delay between messages to prevent flooding
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // Send a final message
        await conn.sendMessage(from, { 
            text: `🎉 These are the top 5 GIFs (${gifSize} size) from Pixabay for your search term.` 
        }, { quoted: mek });

    } catch (e) {
        reply("❗ Error occurred while fetching GIFs.");
        console.error(e);
    }
});
//=================================================================================================================================


//=================================================================================================================================

//=================================================================================================================================
cmd({
    pattern: "ai",
    desc: "AI chat.",
    react: "✔",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, args, reply, q }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        let data = await fetchJson(`https://chatgptforprabath-md.vercel.app/api/gptv1?q=${q}`)
        return reply(`${data.data}\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`)
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})

//=================================================================================================================================
cmd({
    pattern: "9gag",
    react: "😂",
    desc: "Get a random post from 9GAG.",
    category: "fun",
    use: '.9gag [section]',
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        const section = q.trim() || 'hot'; // Default to 'hot' section if not specified
        await reply(`🔍 Fetching a random post from the ${section} section...`);

        const scraper = new Scraper(10, section, 0); // Fetch 10 posts to have a variety to choose from
        const posts = await scraper.scrap();

        if (posts.length === 0) {
            return reply("❗ No posts found. Please try again.");
        }

        const randomPost = posts[Math.floor(Math.random() * posts.length)];
        const caption = `*${randomPost.title}*\n👍 Upvotes: ${randomPost.upVoteCount}\n💬 Comments: ${randomPost.commentsCount}\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;

        try {
            switch (randomPost.type) {
                case 'Photo':
                case 'Animated':
                    await conn.sendMessage(from, { 
                        image: { url: randomPost.content },
                        caption: caption
                    }, { quoted: mek });
                    break;
                case 'Video':
                    await conn.sendMessage(from, { 
                        video: { url: randomPost.content },
                        caption: caption
                    }, { quoted: mek });
                    break;
                default:
                    // For any other type of content, send as a text message
                    await conn.sendMessage(from, { 
                        text: `${caption}\n\nContent: ${randomPost.content}`
                    }, { quoted: mek });
            }
        } catch (postError) {
            console.error('Error sending post:', postError);
            await reply("❗ Error sending post. Please try again.");
        }

    } catch (e) {
        reply("❗ Error occurred while fetching post from 9GAG.");
        console.error('Error in 9gag command:', e);
    }
});

//=================================================================================================================================

cmd({
    pattern: "wiki", // Command trigger
    desc: "Search Wikipedia and get a summary.", // Description of the command
    category: 'info', // Category for the command
    react: '📚', // Emoji to react with
    filename: __filename // Current file name
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        // Access check
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }

        // Check if a search term is provided
        if (args.length < 1) {
            return reply("Please provide a search term.");
        }

        const searchTerm = args.join(" ");
        const wikiApiUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(searchTerm);

        // Fetch data from Wikipedia
        const response = await axios.get(wikiApiUrl);
        const { extract, title } = response.data;

        // Construct response text
        const responseText = `*${title}*\n\n${extract}\n\n${mono}ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛${mono}`;

        // Send the response
        await conn.sendMessage(from, { text: responseText }, { quoted: mek });
    } catch (error) {
        console.error(error);
        await reply("An error occurred while searching Wikipedia.");
    }
});
//=================================================================================================================================
cmd({
    pattern: "weather",
    alias: ["weatherinfo"],
    desc: "🌤 Get weather information for a location",
    react: "🌤",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        if (!q) return reply("❗ Please provide a city name. Usage: .weather [city name]");
        const apiKey = config.OPENWEATHER_API_KEY; // Assuming you've added this to your config file
        if (!apiKey) return reply("⚠️ OpenWeather API key is not configured. Please set it up in the config file.");

        const city = encodeURIComponent(q);
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await axios.get(url);
        const data = response.data;
        const weather = `
🌍 *Weather Information for ${data.name}, ${data.sys.country}* 🌍
[ *BHASHI-MD SEARCH ENGINE* ]

🌡️ *Temperature*: ${data.main.temp}°C
🤷‍♀️ *Feels Like*: ${data.main.feels_like}°C
🚨 *Min Temp*: ${data.main.temp_min}°C
🌝 *Max Temp*: ${data.main.temp_max}°C
💧 *Humidity*: ${data.main.humidity}%
☁️ *Weather*: ${data.weather[0].main}
🌫️ *Description*: ${data.weather[0].description}
💨 *Wind Speed*: ${data.wind.speed} m/s
🔽 *Pressure*: ${data.main.pressure} hPa

${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}
`;
        return reply(weather);
    } catch (e) {
        console.log(e);
        if (e.response && e.response.status === 404) {
            return reply("🚫 City not found. Please check the spelling and try again.");
        }
        return reply("⚠️ An error occurred while fetching the weather information. Please try again later.");
    }
});

//=================================================================================================================================

cmd({
    pattern: "rvideo",
    alias: ["randomvideo"],
    desc: "Fetch and send a random video from Pexels.",
    category: "fun",
    react: "🎥",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Check if the user has access (assuming you have a checkAccess function)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.*");
        }

        // Notify the user that the video is being downloaded
        await conn.sendMessage(from, { text: '⏳ *Please wait, your video is downloading...* ⏳' }, { quoted: mek });

        // Pexels API request to fetch a random video
        const apiUrl = `https://api.pexels.com/videos/search?query=random&per_page=1&page=${Math.floor(Math.random() * 100) + 1}`;
        const response = await axios.get(apiUrl, { headers: { Authorization: config.PEXELS_API_KEY } });

        // Check if video data exists
        const video = response.data.videos[0];
        if (!video || !video.video_files || video.video_files.length === 0) {
            return reply("❌ No video files found.");
        }

        // Get the video file link
        const videoUrl = video.video_files[0].link;
        const videoTitle = video.title || 'Random Video';

        // Download the video
        const videoPath = path.join(__dirname, 'tempVideo.mp4'); // Temporary path for the video
        const writer = fs.createWriteStream(videoPath);

        const responseVideo = await axios.get(videoUrl, { responseType: 'stream' });
        responseVideo.data.pipe(writer);

        // Await the completion of file download
        await new Promise((resolve, reject) => {
            writer.on('finish', resolve); // Resolve when writing finishes
            writer.on('error', reject); // Reject if an error occurs
        });

        // Notify the user and send the video after download
        await conn.sendMessage(from, { video: { url: videoPath }, caption: `🎥 *Random Pexels Video* 🎥\n\nTitle: ${videoTitle}\n\n> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★` }, { quoted: mek });

        // Clean up the downloaded video file
        fs.unlinkSync(videoPath);

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});
//=================================================================================================================================

cmd({
    pattern: "binance",
    desc: "Get current cryptocurrency prices from Binance",
    category: "useful",
    react: "📊",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        if (args.length === 0) {
            return reply("❌ Please specify a cryptocurrency symbol. Example: .binance BTC or .binance ETHUSDT")
        }

        const symbol = args[0].toUpperCase()
        let pair = symbol
        if (!symbol.endsWith('USDT')) {
            pair = symbol + 'USDT'
        }

        const response = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${pair}`)
        
        if (response.data) {
            const data = response.data
            const priceMessage = `
📊 *Binance Price Info for ${symbol}* 📊

💰 Current Price: $${parseFloat(data.lastPrice).toFixed(2)}
📈 24h Change: ${parseFloat(data.priceChange).toFixed(2)} (${parseFloat(data.priceChangePercent).toFixed(2)}%)
🔼 24h High: $${parseFloat(data.highPrice).toFixed(2)}
🔽 24h Low: $${parseFloat(data.lowPrice).toFixed(2)}
📊 24h Volume: ${parseFloat(data.volume).toFixed(2)} ${symbol}

💹 *Market Activity*
• Open Price: $${parseFloat(data.openPrice).toFixed(2)}
• Close Price: $${parseFloat(data.prevClosePrice).toFixed(2)}
• Weighted Avg: $${parseFloat(data.weightedAvgPrice).toFixed(2)}

🔄 Last updated: ${new Date().toLocaleString()}

Want to check another crypto? Just use .binance [SYMBOL]

${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}
            `.trim()
            
            await conn.sendMessage(from, { text: priceMessage }, { quoted: mek })
        } else {
            reply(`❌ Failed to fetch data for ${symbol}. Make sure you've entered a valid symbol.`)
        }
    } catch (e) {
        console.log(e)
        if (e.response && e.response.status === 400) {
            reply(`❌ Invalid symbol. Please check and try again.`)
        } else {
            reply(`🚫 An error occurred: ${e.message}`)
        }
    }
})

//=================================================================================================================================

cmd({
    pattern: "fact",
    desc: "🧠 Get a random fun fact",
    react: "🤓",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        const url = 'https://uselessfacts.jsph.pl/random.json?language=en';  // API for random facts
        const response = await axios.get(url);
        const fact = response.data.text;

        const funFact = `
🧠 *Random Fun Fact* 🧠

${fact}

Isn't that interesting? 😄

${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}
`;

        return reply(funFact);
    } catch (e) {
        console.log(e);
        return reply("⚠️ An error occurred while fetching a fun fact. Please try again later.");
    }
});

//=================================================================================================================================

                         cmd({
                             pattern: "define",
                             desc: "📚 Get the definition of a word",
                             react: "🔍",
                             category: "useful",
                             filename: __filename
                         },
                         async (conn, mek, m, { from, q, reply }) => {
                             try {
                                 const senderNumber = m.sender;
                                 const isGroup = m.isGroup || false;
                                                 if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
                                 if (!q) return reply("❗ Please provide a word to define. Usage: .define [word]");

                                 const word = q;
                                 const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

                                 const response = await axios.get(url);
                                 const definitionData = response.data[0];

                                 const definition = definitionData.meanings[0].definitions[0].definition;
                                 const example = definitionData.meanings[0].definitions[0].example || 'No example available';
                                 const synonyms = definitionData.meanings[0].definitions[0].synonyms.join(', ') || 'No synonyms available';

const wordInfo = `   📚 *BASHI-MD DICTIONARY* 🔍\n
📚 *Word*: ${definitionData.word}
🔍 *Definition*: ${definition}
📝 *Example*: ${example}
🔗 *Synonyms*: ${synonyms}

${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;

                                 return reply(wordInfo);
                             } catch (e) {
                                 console.log(e);
                                 if (e.response && e.response.status === 404) {
                                     return reply("🚫 Word not found. Please check the spelling and try again.");
                                 }
                                 return reply("⚠️ An error occurred while fetching the definition. Please try again later.");
                             }
                         });

//=================================================================================================================================

cmd({
    pattern: "yts",
    alias: ["youtubesearch", "ytsearch"],
    desc: "Search for YouTube videos",
    category: "search",
    filename: __filename,
    use: '<search query>'
},
async (conn, mek, m, { from, args, reply }) => {
    if (!args[0]) return reply('🚫 Please provide a search query');

    const query = args.join(' ');

    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        const results = await yts(query);
        
        if (!results.videos.length) {
            return reply('🔍 No videos found for the given query.');
        }

        let response = '🎥 *Alex MD YouTube Search Results:*\n\n';
        results.videos.slice(0, 10).forEach((video, index) => {
            response += `${index + 1}. *${video.title}*\n`;
            response += `   👤 Channel: ${video.author.name}\n`;
            response += `   ⏱️ Duration: ${video.duration.timestamp}\n`;
            response += `   👁️ Views: ${formatNumber(video.views)}\n`;
            response += `   🕒 Uploaded: ${video.ago}\n`;
            response += `   🔗 Link: ${video.url}\n\n`;
        });

        response += `${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;

        await conn.sendMessage(from, { text: response }, { quoted: mek });
    } catch (error) {
        console.error('Error in YouTube search:', error);
        reply('❌ An error occurred while searching YouTube. Please try again later.');
    }
});

// Helper function to format large numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

//=================================================================================================================================

cmd({
  pattern: "checkpw",
  alias: ["checkpassword"],
  desc: "Check password strength and provide improvement suggestions.",
  category: "security",
  react: "🔒",
  filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
      const senderNumber = m.sender;
      const isGroup = m.isGroup || false;
                      if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
    if (!q) return reply("Please provide a password to check. Usage: .checkpw YourPasswordHere")

    const result = zxcvbn(q)
    const score = result.score // 0 to 4
    const crackTime = result.crack_times_display.offline_slow_hashing_1e4_per_second

    let strength, color
    switch(score) {
      case 0:
      case 1:
        strength = "Very Weak"
        color = "🔴"
        break
      case 2:
        strength = "Weak"
        color = "🟠"
        break
      case 3:
        strength = "Moderate"
        color = "🟡"
        break
      case 4:
        strength = "Strong"
        color = "🟢"
        break
    }

    const suggestions = result.feedback.suggestions.slice(0, 3)

    const resultMessage = `
🔒 *Password Strength Check* 🔒

🚨 _Strength:_ ${color} *${strength}*
👾 _Estimated crack time:_ *${crackTime}*

🚀 _Improvement Suggestions:_
${suggestions.map((s, i) => `${i+1}. ${s}`).join('\n')}

🔑 *General Tips:*
• _Use a mix of uppercase and lowercase letters_
• _Include numbers and special characters_
• _Avoid common words or phrases_
• _Use a longer password (12+ characters)_
• _Use a unique password for each account_

*⚠️ Note: Never share your real passwords. This tool is for educational purposes only.*

${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}
`
    await conn.sendMessage(from, { text: resultMessage }, { quoted: mek })

  } catch (e) {
    console.log(e)
    reply(`🚫 An error occurred: ${e.message}`)
  }
})

//=================================================================================================================================

cmd({
    pattern: "gpass",
    alias: ["genaratepassword"],
    desc: "Generate a strong password.",
    category: "utility",
    react: "🔐",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        const length = args[0] ? parseInt(args[0]) : 12; // Default length is 12 if not provided
        if (isNaN(length) || length < 8) {
            return reply('Please provide a valid length for the password (minimum 8 characters).');
        }

        const generatePassword = (len) => {
            const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
            let password = '';
            for (let i = 0; i < len; i++) {
                const randomIndex = crypto.randomInt(0, charset.length);
                password += charset[randomIndex];
            }
            return password;
        };

        const password = generatePassword(length);
        const message = `🔐 *Your Strong Password* 🔐\n\nPlease find your generated password below:\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;

        // Send initial notification message
        await conn.sendMessage(from, { text: message }, { quoted: mek });

        // Send the password in a separate message
        await conn.sendMessage(from, { text: password }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`❌ Error generating password: ${e.message}`);
    }
});


//=================================================================================================================================

const cybersecurityTips = [
    "Use a unique password for each of your accounts.",
    "Enable two-factor authentication (2FA) whenever possible.",
    "Keep your software and operating systems up to date.",
    "Be cautious when clicking on links in emails or messages.",
    "Use a reputable antivirus software and keep it updated.",
    "Avoid using public Wi-Fi networks for sensitive transactions.",
    "Regularly backup your important data.",
    "Use a VPN when connecting to public networks.",
    "Be wary of phishing attempts in emails or messages.",
    "Don't share sensitive information on social media.",
    "Use encrypted messaging apps for sensitive communications.",
    "Regularly check your accounts for any suspicious activity.",
    "Use a password manager to generate and store strong passwords.",
    "Be cautious when downloading attachments from unknown sources.",
    "Enable automatic updates for your software and apps.",
    "Use privacy settings on your social media accounts.",
    "Avoid using easily guessable information in your passwords.",
    "Be careful what you plug into your devices (e.g., unknown USB drives).",
    "Use secure and encrypted cloud services for storing sensitive data.",
    "Educate yourself about current cybersecurity threats and best practices."
]

cmd({
    pattern: "cybertips",
    alias: ["hackertips"],
    desc: "Get random cybersecurity tips.",
    category: "useful",
    react: "🛡️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        // Shuffle the tips array
        const shuffled = cybersecurityTips.sort(() => 0.5 - Math.random());
        
        // Select 5 random tips
        const selectedTips = shuffled.slice(0, 5);
        
        const tipsMessage = `
🛡️ *Cybersecurity Tips* 🛡️

> Stay safe online with these important tips:

${selectedTips.map((tip, index) => `${index + 1}. ${tip}`).join('\n\n')}

> 🔐 Remember: Your online security is in your hands!

> Want more tips? Just use the .cybertips command again!

${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}
        `.trim();
        
        await conn.sendMessage(from, { text: tipsMessage }, { quoted: mek })
        
    } catch (e) {
        console.log(e)
        reply(`🚫 An error occurred: ${e.message}`)
    }
})


//=================================================================================================================================

cmd({
    pattern: "githubstalk",
    alias: ["gstalk", "gitstalk"],
    desc: "Fetch detailed GitHub user profile including profile picture.",
    category: "utility",
    react: "🖥️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        const username = args[0];
        if (!username) {
            return reply("Please provide a GitHub username.");
        }

        const apiUrl = `https://api.github.com/users/${username}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        let userInfo = `     🔍 *BHASHI-MD GIT STALK* 🔎
        
👤 *Username*: ${data.name || data.login}
🔗 *Github Url*:(${data.html_url})
📝 *Bio*: ${data.bio || 'Not available'}
🏙️ *Location*: ${data.location || 'Unknown'}
📊 *Public Repos*: ${data.public_repos}
👥 *Followers*: ${data.followers} | Following: ${data.following}
📅 *Created At*: ${new Date(data.created_at).toDateString()}
🔭 *Public Gists*: ${data.public_gists}

${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}
`;

        await conn.sendMessage(from, { image: { url: data.avatar_url }, caption: userInfo }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching data: ${e.response ? e.response.data.message : e.message}`);
    }
});

//=================================================================================================================================

cmd({
    pattern: "dog",
    alias: ["randomdog"],
    desc: "Fetch a random dog image.",
    category: "fun",
    react: "🐶",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        const apiUrl = `https://dog.ceo/api/breeds/image/random`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.message }, caption: '🐶 *Random Dog Image* 🐶\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching dog image: ${e.message}`);
    }
});

//=================================================================================================================================

cmd({
  pattern: "countdown",
  desc: "Set a countdown timer with a custom message.",
  category: "utility",
  react: "⏲️",
  filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
  try {
      const senderNumber = m.sender;
      const isGroup = m.isGroup || false;
                      if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
      if (args.length < 2) {
          return reply("❌ **Usage:** `!countdown [time in seconds] [message]`\nExample: `!countdown 10 Take a break!`");
      }

      const seconds = parseInt(args[0]);
      const message = args.slice(1).join(' ');

      if (isNaN(seconds) || seconds <= 0) {
          return reply("❌ **Error:** Please provide a valid number of seconds greater than 0.");
      }

      const countdownMessage = `🕰️ *Countdown Set!*\n⏳ *Time:* ${seconds} seconds\n📝 *Message:* ${message}\n\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;
      reply(countdownMessage);

      setTimeout(() => {
          conn.sendMessage(from, { text: `🚨 *Time's Up!*\n_${message}_\n` });
      }, seconds * 1000);

  } catch (e) {
      console.error(e);
      reply("❌ **Error:** An unexpected error occurred while setting the countdown timer.");
  }
});

//=================================================================================================================================

cmd({
    pattern: "gitclone",
    alias: ["repoclone"],
    desc: "Download a GitHub repository",
    category: "downloader",
    react: "📥",
    filename: __filename
},
async(conn, mek, m, {from, args, reply}) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        if (!args[0]) {
            return reply(`Please provide a GitHub repository URL.\n\nExample: .gitclone https://github.com/example/example`)
        }

        const regex = /(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)\/([^\/]+)/i
        const match = args[0].match(regex)

        if (!match) {
            return reply('Invalid GitHub repository URL. Please provide a valid URL.')
        }

        const [, user, repo] = match
        const zipUrl = `https://codeload.github.com/${user}/${repo}/zip/refs/heads/main`
        const apiUrl = `https://api.github.com/repos/${user}/${repo}`

        // Fetch repository information
        https.get(apiUrl, {
            headers: { 'User-Agent': 'ALEX-MD Bot' }
        }, (res) => {
            let data = ''
            res.on('data', (chunk) => data += chunk)
            res.on('end', async () => {
                if (res.statusCode === 404) {
                    return reply('Repository not found. Please check the URL and try again.')
                }

                const repoInfo = JSON.parse(data)

                // Send a message indicating download is starting
                await reply(`📥 Downloading: ${repoInfo.full_name}\n\nPlease wait, this may take a moment...`)

                // Download and send the repository
                await conn.sendMessage(from, {
                    document: { url: zipUrl },
                    mimetype: 'application/zip',
                    fileName: `${repoInfo.name}.zip`,
                    caption: `📦 Repository: ${repoInfo.full_name}\n🌟 Stars: ${repoInfo.stargazers_count}\n📚 Description: ${repoInfo.description || 'No description provided.'}\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`,
                })
            })
        }).on('error', (error) => {
            console.error(error)
            reply('An error occurred while fetching repository information. Please try again later.')
        })

    } catch (error) {
        console.error(error)
        reply('An error occurred while processing your request. Please try again later.')
    }
})

//=================================================================================================================================

cmd({
    pattern: "hack",
    desc: "Displays a dynamic and playful 'Hacking' message for fun.",
    category: "fun",
    react: "💻",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        const steps = [
            '💻 *HACK STARTING...* 💻',
            '*Initializing hacking tools...* 🛠️',
            '*Connecting to remote servers...* 🌐',
            '```[██████████] 10%``` ⏳'                                            ,
            '```[███████████████████] 20%``` ⏳'                                   ,
            '```[███████████████████████] 30%``` ⏳'                               ,
            '```[██████████████████████████] 40%``` ⏳'                            ,
            '```[███████████████████████████████] 50%``` ⏳'                       ,
            '```[█████████████████████████████████████] 60%``` ⏳'                 ,
            '```[██████████████████████████████████████████] 70%``` ⏳'            ,
            '```[██████████████████████████████████████████████] 80%``` ⏳'        ,
            '```[██████████████████████████████████████████████████] 90%``` ⏳'    ,
            '```[████████████████████████████████████████████████████] 100%``` ✅',
            '',
            '🔒 *System Breach: Successful!* 🔓',
            '🚀 *Command Execution: Complete!* 🎯',
            '*📡 Transmitting data...* 📤',
            '_🕵️‍♂️ Ensuring stealth..._ 🤫',
            '*🔧 Finalizing operations...* 🏁',
            '⚠️ *Note:* All actions are for demonstration purposes only.',
            '⚠️ *Reminder:* Ethical hacking is the only way to ensure security.',
            '> *BHASHI-MD-HACKING-COMPLETE ☣*'
        ];

        for (const line of steps) {
            await conn.sendMessage(from, { text: line }, { quoted: mek });
            await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay as needed
        }
    } catch (e) {
        console.log(e);
        reply(`❌ *Error:* ${e.message}`);
    }
});

//=================================================================================================================================

cmd({
    pattern: "joke",
    desc: "😂 Get a random joke",
    react: "🤣",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        const url = 'https://official-joke-api.appspot.com/random_joke';  // API for random jokes
        const response = await axios.get(url);
        const joke = response.data;

        const jokeMessage = `
😂 *Here's a random joke for you!* 😂

*${joke.setup}*

${joke.punchline} 😄

${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;

        return reply(jokeMessage);
    } catch (e) {
        console.log(e);
        return reply("⚠️ Couldn't fetch a joke right now. Please try again later.");
    }
});

//=================================================================================================================================

cmd({
    pattern: "trt",
    alias: ["translate"],
    desc: "🌍 Translate text between languages",
    react: "🌐",
    category: "useful",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        const args = q.split(' ');
        if (args.length < 2) return reply("❗ Please provide a language code and text. Usage: .translate [language code] [text]");

        const targetLang = args[0];
        const textToTranslate = args.slice(1).join(' ');

        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=en|${targetLang}`;

        const response = await axios.get(url);
        const translation = response.data.responseData.translatedText;

        const translationMessage = `
🌍 *Translation* 🌍

🔤 *Original*: ${textToTranslate}
🔠 *Translated*: ${translation}
🌐 *Language*: ${targetLang.toUpperCase()}

${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`;

        return reply(translationMessage);
    } catch (e) {
        console.log(e);
        return reply("⚠️ An error occurred while translating the text. Please try again later.");
    }
});

//=================================================================================================================================

cmd({
    pattern: "tech",
    desc: "Get random technology facts or latest tech news with images.",
    category: "information",
    react: "💻",
    filename: __filename
},
async(conn, mek, m, {from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        // Choose between tech fact or news with 70% chance for news
        const choice = Math.random() < 0.7 ? 'news' : 'fact';

        let message;
        let image = { url: config.ALIVE_IMG };  // Default to ALIVE_IMG

        if (choice === 'fact') {
            // Array of technology facts with emojis
            const techFacts = [
                "🦠 The first computer virus was created in 1983.",
                "🖱️ The first computer mouse was made of wood.",
                "⌨️ The QWERTY keyboard layout was designed to slow typing speed.",
                "📷 The first webcam was created to check the status of a coffee pot.",
                "💰 About 90% of the world's currency is digital.",
                "👩‍💻 The first computer programmer was a woman named Ada Lovelace.",
                "🏋️ The first electronic computer ENIAC weighed more than 27 tons.",
                "💾 The first hard drive could store just 5 MB of data.",
                "🌐 More than 570 new websites are created every minute.",
                "🎮 The first computer game was created in 1961."
            ];

            const randomFact = techFacts[Math.floor(Math.random() * techFacts.length)];
            message = `🖥️ Tech Fact of the Day:\n\n${randomFact}`;
        } else {
            // Fetch latest tech news
            const response = await axios.get('https://newsapi.org/v2/top-headlines', {
                params: {
                    country: 'us',
                    category: 'technology',
                    apiKey: '0f2c43ab11324578a7b1709651736382'  // Moved to config for better security
                }
            });

            const newsItem = response.data.articles[0];
            message = `📰 Breaking Tech News 🚨\n\n🔥 ${newsItem.title}\n\n📝 ${newsItem.description}\n\n🔗 Read more: ${newsItem.url}\n\n\n${mono}ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛${mono}`;

            // Use news image if available, otherwise keep ALIVE_IMG
            if (newsItem.urlToImage) {
                image = { url: newsItem.urlToImage };
            }
        }

        // Send the tech message with image
        await conn.sendMessage(from, { 
            image: image,
            caption: message
        }, { quoted: mek });

    } catch(e) {
        console.error(e);
        reply(`🚫 Oops! Something went wrong: ${e.message}`);
    }
})

//=================================================================================================================================

cmd({
  pattern: "news",
  desc: "Get the latest news on a specific topic.",
  react : "📰",
  category: "information",
  filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
      const senderNumber = m.sender;
      const isGroup = m.isGroup || false;
                      if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
    if (!q) return reply("🚨 Please provide a topic to search news for. Usage: .news [topic]")
    const apiKey = "0f2c43ab11324578a7b1709651736382" // Replace with your actual NewsAPI key
    const topic = encodeURIComponent(q)
    const apiUrl = `https://newsapi.org/v2/everything?q=${topic}&sortBy=publishedAt&language=en&apiKey=${apiKey}`
    const response = await axios.get(apiUrl)
    const articles = response.data.articles.slice(0, 5) // Get top 5 articles
    if (articles.length === 0) {
      return reply(`No recent news found for "${q}". Try a different topic.`)
    }
    let resultMessage = `📰 Latest News on "${q}" 📰\n\n`
    articles.forEach((article, index) => {
      resultMessage += `${index + 1}. ${article.title}\n`
      resultMessage += `_${article.description}\n_`
      resultMessage += `_Read more: ${article.url}_\n`
      resultMessage += `_Published: ${new Date(article.publishedAt).toLocaleString()}_\n\n`
    })
    resultMessage += `${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}`
    await conn.sendMessage(from, { text: resultMessage }, { quoted: mek })
  } catch (e) {
    console.log(e)
    reply(`🚫 An error occurred: ${e.message}`)
  }
})

//=================================================================================================================================

cmd({
  pattern: "shorturl",
  desc: "Create a short URL using TinyURL API.",
  category: "utility",
  filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
  try {
      const senderNumber = m.sender;
      const isGroup = m.isGroup || false;
                      if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
    if (!q) return reply("⚠️ Please provide a URL to shorten.");

    const longUrl = q.trim();
    const apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`;

    const response = await axios.get(apiUrl);
    const shortUrl = response.data;

    const resultMessage = `
🔗 *URL Shortener*

🌐 *Original URL:* ${longUrl}
✂️ *Shortened URL:* ${shortUrl}

You can now use this short URL to share your link more easily! 🌟

${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}
`;
    await conn.sendMessage(from, { text: resultMessage }, { quoted: mek });
  } catch (e) {
    console.error('Error shortening URL:', e.message);
    reply(`❌ An error occurred while shortening the URL: ${e.message}`);
  }
});

//=================================================================================================================================

cmd({
    pattern: "wallpaper",
    desc: "Fetch a random wallpaper image.",
    category: "fun",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        const apiUrl = `https://api.pexels.com/v1/search?query=wallpaper&per_page=1&page=${Math.floor(Math.random() * 100) + 1}`;
        const response = await axios.get(apiUrl, { headers: { Authorization: config.PEXELS_API_KEY } });
        const data = response.data.photos[0];

        await conn.sendMessage(from, { image: { url: data.src.original }, caption: '🖼️ *Random Wallpaper Image* 🖼️\n\n${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching wallpaper image: ${e.message}`);
    }
});

//=================================================================================================================================

const userTipIndex = new Map();

cmd({
    pattern: "studyhelper",
    desc: "Provide study tips and resources.",
    category: "info",
    react: "📚",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    const tips = [
        "📖 Break your study time into manageable chunks with breaks in between.",
        "📝 Use active recall and spaced repetition to improve retention.",
        "🌟 Practice past exam papers and sample questions.",
        "🎯 Set specific goals for each study session.",
        "💡 Teach what you've learned to someone else to solidify your understanding.",
        "📚 Organize your study space to reduce distractions.",
        "📅 Create a study schedule and stick to it.",
        "🎧 Listen to instrumental music or white noise to improve focus.",
        "🔍 Summarize your notes to highlight key points.",
        "🧠 Use mnemonic devices to remember complex information.",
        "✍️ Practice writing essays and problem-solving regularly.",
        "🧩 Mix different subjects during study sessions to keep things interesting.",
        "📊 Use flashcards for quick review and memorization.",
        "🌐 Use online resources and educational videos to supplement your learning.",
        "💪 Stay physically active and exercise to boost cognitive function.",
        "🚶‍♂️ Take regular breaks to rest and recharge your mind.",
        "💤 Ensure you get enough sleep for optimal cognitive performance.",
        "🥗 Eat a balanced diet to support brain health and concentration.",
        "📈 Track your progress to stay motivated and identify areas for improvement.",
        "👥 Study with friends or in study groups to gain different perspectives.",
        "🔖 Use color-coded notes or diagrams to visually organize information.",
        "📖 Read textbooks and additional materials for a deeper understanding.",
        "🕒 Practice time management during exams and assignments.",
        "📚 Set aside dedicated time for review and revision before exams.",
        "✏️ Practice mindfulness and stress-relief techniques to manage exam anxiety.",
        "🔑 Focus on understanding concepts rather than rote memorization.",
        "🎯 Set realistic and achievable study goals to maintain motivation.",
        "💡 Use apps and tools for time management and productivity.",
        "🎓 Seek help from teachers or tutors if you're struggling with specific topics.",
        "📚 Read summaries and highlights to reinforce learning.",
        "🎯 Stay organized with a planner or to-do list for tasks and deadlines.",
        "🧠 Challenge yourself with practice questions and mock tests regularly.",
        "🔄 Review and revisit material periodically to reinforce learning."
    ];

    // Retrieve the last sent tip index for the user
    let index = userTipIndex.get(from) || 0;

    // Send the next tip
    if (index < tips.length) {
        reply(`📚 Study Tip ${index + 1}:\n${tips[index]}\n\n${mono}ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛${mono}`);
        // Update the index for the next time the user requests a tip
        userTipIndex.set(from, index + 1);
    } else {
        reply("📚 You’ve received all study tips. Use `!studyhelper` again to start over.");
        // Reset the index if you want to allow users to start over
        userTipIndex.delete(from);
    }
});

//=================================================================================================================================

cmd({
    pattern: "developer",
    desc: "Sends the developer's contact information.",
    category: "info",
    react: "👨‍💻",
    filename: __filename
}, async (conn, mek, m, { from, quoted }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
        // Define the vCard contact with the updated details
        let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;VISHWA;;;\nFN:VISHWA\nORG:VISHWA OFC\nTITLE:\nitem1.TEL;waid=94702481115:94702481115\nitem1.X-ABLabel:VISHWA OFC\nX-WA-BIZ-DESCRIPTION:BHASHI-MD BY VISHWA\nX-WA-BIZ-NAME:VISHWA OFC\nEND:VCARD`;

        // Send the contact message
        await conn.sendMessage(from, { contacts: { displayName: 'VISHWA OFC', contacts: [{ vcard }] }}, { quoted: mek });
    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { text: `Error: ${e.message}` }, { quoted: mek });
    }
});

//=================================================================================================================================


cmd({
    pattern: "convert",
    desc: "Convert an amount from one currency to another.",
    category: "utility",
    react: "💱",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;
                        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }
        if (args.length < 3) {
            return reply("Usage: .convert <amount> <from_currency> <to_currency>");
        }

        const amount = args[0];
        const fromCurrency = args[1].toUpperCase();
        const toCurrency = args[2].toUpperCase();

        if (isNaN(amount)) {
            return reply("Please provide a valid amount.");
        }

        const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data.rates[toCurrency]) {
            return reply(`Conversion rate for ${toCurrency} not found.`);
        }

        const convertedAmount = (amount * data.rates[toCurrency]).toFixed(2);
        let conversionInfo = `💸_*Currency Conversion*_💸\n\n`;
        conversionInfo += `💵 *Amount*: ${amount} ${fromCurrency}\n`;
        conversionInfo += `🔄 *Converted Amount*: ${convertedAmount} ${toCurrency}\n`;
        conversionInfo += `📈 *Exchange Rate*: 1 ${fromCurrency} = ${data.rates[toCurrency]} ${toCurrency}\n
        
${mono}> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★${mono}
        `;

        await conn.sendMessage(from, { text: conversionInfo }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching data: ${e.message}`);
    }
});

//=================================================================================================================================


