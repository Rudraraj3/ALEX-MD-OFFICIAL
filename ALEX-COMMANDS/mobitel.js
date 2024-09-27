const config = require('../config');
const { cmd, commands } = require('../command');

// Function to send the package message
const sendPackageMessage = async (conn, from, quotedMessage, caption, imageUrl, vcard) => {
    try {
        const imageMessage = await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: caption,
            footer: '',
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363285813931317@newsletter",
                    newsletterName: "ALEX-ID PROGRAMMER"
                }
            }
        }, { quoted: quotedMessage });

        await conn.sendMessage(from, {
            contacts: {
                displayName: 'ALEX-ID PROGRAMMER',
                contacts: [{ vcard }]
            }
        }, { quoted: imageMessage });

    } catch (error) {
        console.error(error);
        reply(`Error: ${error.message}`);
    }
};

// Hutch Command
cmd({
    pattern: "mobitel",
    desc: "Check bot's response time.",
    category: "main",
    react: "✔",
    filename: __filename
}, async (conn, mek, m, { from, quoted, reply }) => {
    const caption = `* 🛜 MOBITEL 🛜

🚀 ඔයාත් Mobitel sim එකක් හො router එකක් use කරන user කෙනෙක් නම් දැනට vpn connect කරගෙන උපරිම speed එකක් ගන්න පුළුවන් package යටින් දාලා තියෙනවා. යට දාලා තියෙන පැකේජ් වලින් විතරයි දැනට හොඳ speed එකක් ගන්න පුලුවන්🛜📳..

┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅

🚀 Slt router Zoom pakages
🚀 mobitel Zoom

* 𝗨𝗻𝗟𝗶𝗠𝗶𝘁𝗲𝗗 -𝗥𝘀.400 /=
* 150 𝗚𝗕 - 𝗥𝘀.300 /=
* 100 𝗚𝗕 - 𝗥𝘀.200/=

💲 Sampath bank💲
      💲 Ez cash 💲

┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅`;
    const imageUrl = 'https://telegra.ph/file/373da0a8456643b802c3e.jpg';
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;ALEX-ID;;;\nFN:ALEX-ID\nORG:ALEX OFC\nTITLE:\nitem1.TEL;waid=94756857260:94756857260\nitem1.X-ABLabel:ALEX OFC\nX-WA-BIZ-DESCRIPTION:ALEX-MD BY ALEX\nX-WA-BIZ-NAME:ALEX OFC\nEND:VCARD`;

    await sendPackageMessage(conn, from, mek, caption, imageUrl, vcard);
});
