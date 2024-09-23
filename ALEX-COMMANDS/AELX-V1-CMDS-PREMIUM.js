const axios = require('axios');
const { cmd, commands } = require('../command');
const config = require('../config');
const { xeontext2 } = require('../Media/xeontext2');
const { xeontext1 } = require('../Media/xeontext1');// Import xeontext2 from xeontext1.js
const { alextext1 } = require('../Media/Alexcrash');
const checkPremiumAccess = require('../DATABASE/checkPremiumAccess');


//======================================================================================================================
cmd({
    pattern: "bug",
    desc: "Send a bug report message.",
    react: "✔",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { reply }) => {
    try {
        const senderNumber = m.sender;
        const hasPremiumAccess = await checkPremiumAccess(senderNumber);
        if (!hasPremiumAccess) {
            return reply("🚫 You do not have premium access to use this command.");
        }

        // Send the bug report message from xeontext1.js
        return reply(xeontext1);
    } catch (e) {
        console.log(e);
        // Handle any errors by replying with the error message
        return reply(`${e}`);
    }
});
//======================================================================================================================
cmd({
    pattern: "bug1",
    desc: "Send a bug report message.",
    react: "✔",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { reply }) => {
    try {
        const senderNumber = m.sender;
         const hasPremiumAccess = await checkPremiumAccess(senderNumber);
        if (!hasPremiumAccess) {
            return reply("🚫 You do not have premium access to use this command.");
        }

        // Send the bug report message from xeontext1.js
        return reply(xeontext2);
    } catch (e) {
        console.log(e);
        // Handle any errors by replying with the error message
        return reply(`${e}`);
    }
});
//======================================================================================================================
cmd({
    pattern: "bug2",
    desc: "Send a bug report message.",
    react: "✔",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { reply }) => {
    try {
        const senderNumber = m.sender;
        const hasPremiumAccess = await checkPremiumAccess(senderNumber);
        if (!hasPremiumAccess) {
            return reply("🚫 You do not have premium access to use this command.");
        }

        // Send the bug report message from xeontext1.js
        return reply(alextext1);
    } catch (e) {
        console.log(e);
        // Handle any errors by replying with the error message
        return reply(`${e}`);
    }
});
//======================================================================================================================
cmd({
    pattern: 'virtex1',
    desc: 'Sends the first virtex text from the source.',
    category: 'fun',
    react: '🔥',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
         const senderNumber = m.sender;
        const hasPremiumAccess = await checkPremiumAccess(senderNumber);
        if (!hasPremiumAccess) {
            return reply("🚫 You do not have premium access to use this command.");
        }

        let virtex1 = await fetch('https://raw.githubusercontent.com/Caliph91/txt/main/pirtex/1.txt').then(v => v.text());
        conn.sendPresenceUpdate('recording', from);
        await conn.sendMessage(from, { text: virtex1, caption: '🔥 *by BHASHI-MD* 🔥' });
        console.log('Virtex1 message sent successfully');
    } catch (e) {
        console.error('Error sending virtex1 message:', e);
        reply('⚠️ An error occurred while fetching the text.');
    }
});
//======================================================================================================================
cmd({
    pattern: 'virtex2',
    desc: 'Sends the second virtex text from the source.',
    category: 'fun',
    react: '🔥',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
                const senderNumber = m.sender;
        const hasPremiumAccess = await checkPremiumAccess(senderNumber);
        if (!hasPremiumAccess) {
            return reply("🚫 You do not have premium access to use this command.");
        }

        let virtex2 = await fetch('https://raw.githubusercontent.com/Caliph91/txt/main/pirtex/2.txt').then(v => v.text());
        conn.sendPresenceUpdate('recording', from);
        await conn.sendMessage(from, { text: virtex2, caption: '🔥 *by BHASHI-MD* 🔥' });
        console.log('Virtex2 message sent successfully');
    } catch (e) {
        console.error('Error sending virtex2 message:', e);
        reply('⚠️ An error occurred while fetching the text.');
    }
});
//======================================================================================================================
cmd({
    pattern: 'virtex3',
    desc: 'Sends the third virtex text from the source.',
    category: 'fun',
    react: '🔥',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
                const senderNumber = m.sender;
        const hasPremiumAccess = await checkPremiumAccess(senderNumber);
        if (!hasPremiumAccess) {
            return reply("🚫 You do not have premium access to use this command.");
        }

        let virtex3 = await fetch('https://raw.githubusercontent.com/Caliph91/txt/main/pirtex/3.txt').then(v => v.text());
        conn.sendPresenceUpdate('recording', from);
        await conn.sendMessage(from, { text: virtex3, caption: '🔥 *by BHASHI-MD* 🔥' });
        console.log('Virtex3 message sent successfully');
    } catch (e) {
        console.error('Error sending virtex3 message:', e);
        reply('⚠️ An error occurred while fetching the text.');
    }
});

cmd({
    pattern: 'virtex4',
    desc: 'Sends the fourth virtex text from the source.',
    category: 'fun',
    react: '🔥',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
                const senderNumber = m.sender;
        const hasPremiumAccess = await checkPremiumAccess(senderNumber);
        if (!hasPremiumAccess) {
            return reply("🚫 You do not have premium access to use this command.");
        }

        let virtex4 = await fetch('https://raw.githubusercontent.com/Caliph91/txt/main/pirtex/4.txt').then(v => v.text());
        conn.sendPresenceUpdate('recording', from);
        await conn.sendMessage(from, { text: virtex4, caption: '🔥 *by BHASHI-MD* 🔥' });
        console.log('Virtex4 message sent successfully');
    } catch (e) {
        console.error('Error sending virtex4 message:', e);
        reply('⚠️ An error occurred while fetching the text.');
    }
});
//======================================================================================================================
cmd({
    pattern: 'binario',
    desc: 'Sends the binary text from the source.',
    category: 'fun',
    react: '🔥',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
                const senderNumber = m.sender;
        const hasPremiumAccess = await checkPremiumAccess(senderNumber);
        if (!hasPremiumAccess) {
            return reply("🚫 You do not have premium access to use this command.");
        }

        let binario = await fetch('https://raw.githubusercontent.com/BrunoSobrino/ShadowBotV3-OBSOLETO/master/lib/Binario.txt').then(v => v.text());
        conn.sendPresenceUpdate('recording', from);
        await conn.sendMessage(from, { text: binario, caption: '🔥 *by BHASHI-MD* 🔥' });
        console.log('Binario message sent successfully');
    } catch (e) {
        console.error('Error sending binario message:', e);
        reply('⚠️ An error occurred while fetching the text.');
    }
});

//======================================================================================================================
