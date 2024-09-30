const { cmd } = require('../command');
const config = require('../config'); 
const { checkAccess, isPremiumUser, blacklistedJIDs, premiumJIDs, dataLoaded } = require('../DATABASE/accessControl');
const commands ={
   }

};

const os = require('os');

// Runtime function
const runtime = () => {
  const totalSeconds = Math.floor(process.uptime());
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

// Command implementation
cmd({
  pattern: "list",
  desc: "Display all available commands in a beautiful format with statistics.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, { from, reply, pushname }) => {
  try {
    const senderNumber = m.sender;
    const isGroup = m.isGroup || false;

    if (!checkAccess(senderNumber, isGroup)) {
      return reply("Access denied. You don't have permission to use this command. Change Bot Mode !");
    }

    const botVersion = "1.0.0";
    const uptime = runtime();
    const platform = process.platform;
    const date = new Date().toLocaleDateString();
    const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    const totalMemory = Math.round(os.totalmem() / 1024 / 1024);
const d = '`'
    let statsMessage = `╭─ 「  *𝐴𝐿𝐸𝑋-𝑉1 𝑀𝐷* 」
╰────────────┈
╭══════════════◈
┃「  ${d}𝐴𝐿𝐸𝑋-𝑀𝐷 𝐿𝐼𝑆𝑇${d} 」
╰══════════════◈
> ⿻ ᴠᴇʀꜱɪᴏɴ :: 1.0.0
> ⿻ ʀᴜɴᴛɪᴍᴇ :: ${uptime}
> ⿻ ᴘʀᴇғɪx :: <${config.PREFIX}>
> ⿻ ᴅᴀᴛᴇ :: ${date}
> ⿻ ᴘʟᴀᴛғᴏʀᴍ :: ${platform}
> ⿻ ʀᴀᴍ ᴜꜱᴀɢᴇ :: ${memoryUsage} MB / ${totalMemory} MB
> ⿻ ᴄʀᴇᴀᴛᴏʀ :: 𝑀𝑟 𝐴𝑙𝑒𝑥 𝐼𝑑 𝑃𝑟𝑜𝑔𝑟𝑎𝑚𝑚𝑒𝑟
`;

    // Function to generate command list
    const generateCommandList = (category) => {
      let commandList = '';
      const commands = groupedCommands[category] || [];
      commands.forEach(cmd => {
        commandList += `*╎⿻* ${config.PREFIX}${cmd}\n`;
      });
      return commandList;
    };

    // Group commands by category
    const groupedCommands = {};
    Object.keys(commands).forEach(cmd => {
      const category = commands[cmd].category || "Uncategorized";
      if (!groupedCommands[category]) {
        groupedCommands[category] = [];
      }
      groupedCommands[category].push(cmd);
    });

    // Generate menu for each category
    let menuMessage = '';
    for (const category in groupedCommands) {
      menuMessage += `*╭─ 「  ${category.charAt(0).toUpperCase() + category.slice(1)} Commands 」*
*╰───────────────┈*
*┌────────────┈◦•◦❥•*
${generateCommandList(category)}
*└──────────────┈┈*\n\n`;
    }

    const fullMessage = statsMessage + '\n\n' + menuMessage;

    const sentMessage = await conn.sendMessage(from, { 
      image: { url: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg' },
      caption: fullMessage,
      gifPlayback: true,
      contextInfo: {
        externalAdReply: {
          title: "ALEX-MD MENU",
          body: "⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★",
          sourceUrl: "https://github.com/MrAlexRoyce/"
        },
        forwardingScore: 1, 
        isForwarded: true, 
        forwardedNewsletterMessageInfo: { 
          newsletterJid: "120363285813931317@newsletter", 
          newsletterName: "𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃" 
        } 
      }
    }, { quoted: mek });

    await conn.sendMessage(from, {
      react: {
        text: "📃",
        key: sentMessage.key
      }
    });
  } catch (e) {
    console.log(e);
    reply(`An error occurred: ${e.message}`);
  }
});

module.exports = { commands };
