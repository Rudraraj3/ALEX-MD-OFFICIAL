const sai = "6467ad0b29"
const path = require('path');
const { cmd, commands } = require('../command');
const config = require('../config');
const axios = require('axios');
const fs = require('fs');
const checkAccess = require('../DATABASE/accessControl'); 



//======================================================================================================================
cmd({
    pattern: "xnxx2",
    desc: "Search XNXX for videos.",
    react: "🔍",
    category: "search",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        // Check if the sender has access (implement checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }

        // Check if the search query is provided
        if (!q) return reply("🪄 Please provide a search query ✨");

        // Construct the API URL for searching videos
        const apiUrl = `https://deliriusapi-official.vercel.app/search/xnxxsearch?query=${encodeURIComponent(q)}`;

        // Fetch search results from the API
        let response = await axios.get(apiUrl);
        let result = response.data;

        // Check if the API response contains data
        if (result && result.data && Array.isArray(result.data)) {
            if (result.data.length === 0) {
                return reply("❌ No videos found for the search query.");
            }

            // Build the search results response
            let searchResults = "🔍 *XNXX Search Results:*\n\n";
            result.data.forEach((video, index) => {
                searchResults += `${index + 1}. *TITLE*: ${video.title}
> 👁️ *Views*: ${video.views}
> 📺 *Quality*: ${video.quality}
> ⏳ *Duration*: ${video.duration}
> 🔗 *Video URL*: ${video.link}
`;
            });

            // Send the search results as a message
            await conn.sendMessage(from, { text: searchResults }, { quoted: mek });
        } else {
            // If the API response fails, send an error message
            return reply("❌ Failed to fetch the search results. Please try again later.");
        }
    } catch (e) {
        console.error(e);
        reply(`❗ An error occurred: ${e.message}`);
    }
});
//======================================================================================================================
cmd({
    pattern: "xnxxdl2",
    desc: "Download video from XNXX in high quality.",
    react: "📹",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        // Check if the sender has access (implement checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }

        // Check if the XNXX video URL is provided
        if (!q) return reply("🪄 Please provide an XNXX video URL to download ✨");

        // Construct the API URL for fetching video details
        const apiUrl = `https://deliriusapi-official.vercel.app/download/xnxxdl?url=${encodeURIComponent(q)}`;

        // Fetch video details from the API
        let response = await axios.get(apiUrl);
        let result = response.data;

        // Check if the API response contains data
        if (result && result.data) {
            const video = result.data; // Assuming 'data' contains the details
            
            let desc = `🎬 *TITLE*: ${video.title}
> 👁️ *Views*: ${video.views}
> 📺 *Quality*: ${video.quality}
> ⏳ *Duration*: ${video.duration}
> 🔗 *Video URL*: ${video.url}`;

            // Send the video details
            await conn.sendMessage(from, { text: desc }, { quoted: mek });

            // Now download and send the video
            const videoUrl = video.url; // Assuming 'url' contains the direct video URL
            await conn.sendMessage(from, { video: { url: videoUrl }, caption: `🎬 *${video.title}*` }, { quoted: mek });
        } else {
            // If the API response fails, send an error message
            return reply("❌ Failed to fetch the video details. Please check the URL and try again!");
        }
    } catch (e) {
        console.error(e);
        reply(`❗ An error occurred: ${e.message}`);
    }
});

//======================================================================================================================

cmd({
    pattern: "wabeta",
    desc: "Get latest WhatsApp beta information",
    category: "utility",
    react: "📱",
    filename: __filename
},
async (conn, mek, m, { from, quoted, isCmd, command, isGroup, sender, senderNumber, reply }) => {
    try {
        const response = await axios.get('https://deliriusapi-official.vercel.app/tools/wabetainfo');
        const betaInfo = response.data.data;

        if (betaInfo && betaInfo.length > 0) {
            let replyMessage = "📢 *Latest WhatsApp Beta Information* 📢\n\n";
            betaInfo.forEach((info, index) => {
                if (index < 5) { // Limit to 5 entries to avoid excessively long messages
                    replyMessage += `*${index + 1}. ${info.title}*\n`;
                    replyMessage += `> 📅*Date*: ${info.date}\n`;
                    replyMessage += `> 🌍*Category*: ${info.category}\n`;
                    replyMessage += `> 💬*Description*: ${info.description}\n`;
                    replyMessage += `> 🌟*More info*: ${info.url}\n\n`;
                }
            });

            await reply(replyMessage);
        } else {
            await reply("No WhatsApp beta information available at the moment.");
        }
    } catch (error) {
        console.error('Error fetching WhatsApp beta information:', error);
        await reply("An error occurred while fetching WhatsApp beta information. Please try again later.");
    }
});

//======================================================================================================================
cmd({
    pattern: "tiktokstalk",
    desc: "Stalk TikTok user details.",
    react: "🎵",
    category: "stalk",
    filename: __filename
}, async (conn, mek, m, { from, args, reply, q }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        // Check if the sender has access (implement checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }

        // Check if the TikTok username is provided
        if (!q) return reply("🪄 Please provide a TikTok username ✨");

        // Construct the API URL for fetching TikTok user details
        const apiUrl = `https://api.giftedtechnexus.co.ke/api/stalk/tiktokstalk?username=${q}&apikey=ibrahimtech_ai`;

        // Fetch TikTok user details from the API
        let response = await fetch(apiUrl);
        let result = await response.json();

        // Check if the API response is successful
        if (result.success) {
            const user = result.result.user;
            const stats = result.result.stats;

            let desc = `[ 🏷️ *TIKTOK STALK* 👤 ]\n
> 🏷️ *Username*: ${user.uniqueId}
> 👤 *Nickname*: ${user.nickname}
> 🌍 *Region*: ${user.region}
> 💬 *Bio*: ${user.signature}
> 🌐 *Bio Link*: ${user.bioLink ? user.bioLink.link : "N/A"}
> ✅ *Verified*: ${user.verified ? "Yes" : "No"}
> 📅 *Account Created*: ${new Date(user.createTime * 1000).toLocaleDateString()}
            
> 👥 *Followers*: ${stats.followerCount}
> 👤 *Following*: ${stats.followingCount}
> ❤️ *Hearts*: ${stats.heartCount}
> 🎥 *Videos*: ${stats.videoCount}
> 🌟 *Friends*: ${stats.friendCount}

*🐱‍💻 Here are the details of the requested TikTok user.*
`;

            // Send the user details with their avatar
            await conn.sendMessage(from, {
                text: desc,
                contextInfo: {
                    externalAdReply: {
                        title: user.nickname,
                        body: `TikTok User Info`,
                        thumbnailUrl: user.avatarLarger, // User's larger avatar
                        sourceUrl: `https://www.tiktok.com/@${user.uniqueId}`, // Link to TikTok profile
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            });
        } else {
            // If the API response fails, send an error message
            return reply("❌ Failed to fetch the TikTok user details. Please check the username and try again!");
        }
    } catch (e) {
        console.log(e);
        reply(`An error occurred: ${e.message}`);
    }
});

//======================================================================================================================
cmd({
    pattern: "srepo2",
    desc: "Stalk GitHub repository.",
    react: "🐱‍💻",
    category: "stalk",
    filename: __filename
}, async (conn, mek, m, { from, args, reply, q }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        // Check if the sender has access (implement checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }

        // Check if the GitHub repository URL is provided
        if (!q) return reply("🪄 Please provide a GitHub repository URL ✨");

        // Construct the API URL for fetching repository details
        const apiUrl = `https://api.giftedtechnexus.co.ke/api/stalk/repostalk?url=${q}&apikey=ibrahimtech_ai`;

        // Fetch repository details from the API
        let response = await fetch(apiUrl);
        let result = await response.json();

        // Check if the API response is successful and contains the necessary data
        if (result.success && result.repo) {
            const repoDetails = result.repo;  // Assuming 'repo' contains the details
            
            // Check if the expected properties exist in the response
            if (repoDetails) {
                let desc = `> 🏷️ *Repository*: ${repoDetails.full_name || "N/A"}
> 📄 *Description*: ${repoDetails.description || "N/A"}
> 🌟 *Stars*: ${repoDetails.stars || "N/A"}
> 🍴 *Forks*: ${repoDetails.forks || "N/A"}
> 📅 *Created At*: ${repoDetails.created_at || "N/A"}
> 👨‍💻 *Owner*: ${repoDetails.owner_name || "N/A"}
> 🔗 *URL*: ${repoDetails.repo_url || "N/A"}

*🐱‍💻 Here are the details of the requested repository.*
`;

                // Send the repository details as a message
                await conn.sendMessage(from, {
                    text: desc,
                    contextInfo: {
                        externalAdReply: {
                            title: repoDetails.full_name || "N/A",
                            body: `GitHub Repository Info`,
                            thumbnailUrl: repoDetails.owner_avatar || '', // Assuming API provides the avatar URL
                            sourceUrl: repoDetails.repo_url || '',
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    }
                });
            } else {
                return reply("❌ Repository details not found. Please check the URL and try again!");
            }
        } else {
            // If the API response fails or does not contain repo details, send an error message
            return reply("❌ Failed to fetch the repository details. Please check the URL and try again!");
        }
    } catch (e) {
        console.log(e);
        reply(`❗ An error occurred: ${e.message}`);
    }
});


//=====================================================================================================================

cmd({
    pattern: "igdl",
    desc: "Download Instagram Reels.",
    react: "📥",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, args, reply, q }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        // Check if the sender has access (implement checkAccess function accordingly)
        if (!checkAccess(senderNumber, isGroup)) {
            return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode !*");
        }

        // Check if the Instagram URL is provided
        if (!q) return reply("🪄 Please provide an Instagram reel URL ✨");

        // Construct the API URL for downloading the Instagram reel
        const apiUrl = `https://api-aswin-sparky.koyeb.app/api/downloader/igdl?url=${encodeURIComponent(q)}`;

        // Fetch reel details from the API
        let response = await axios.get(apiUrl);
        let result = response.data;

        // Check if the API response contains data
        if (result && result.data && result.data.length > 0) {
            const reelData = result.data[0]; // Assuming the first item is the reel data

            if (reelData) {
                let desc = `*Downloading the Instagram reel for you...*`;

                // Send the reel details as a message
                await conn.sendMessage(from, { text: desc }, { quoted: mek });

                // Check if it's a video and send it
                if (reelData.type === 'video' && reelData.url) {
                    await conn.sendMessage(from, {
                        video: { url: reelData.url },
                        caption: 'Here is your Instagram reel!',
                        contextInfo: {
                            externalAdReply: {
                                title: "Instagram Reel Download",
                                body: `Download your requested Instagram reel`,
                                thumbnailUrl: reelData.thumbnail || '', // Thumbnail URL
                                sourceUrl: reelData.url || '',
                                mediaType: 1,
                                renderLargerThumbnail: true
                            }
                        }
                    });
                } else {
                    reply("❌ The requested content is not a video or could not be retrieved.");
                }
            } else {
                return reply("❌ Failed to fetch the reel details. Please try again later!");
            }
        } else {
            // If the API response fails, send an error message
            return reply("❌ Failed to fetch the reel details. Please check the URL and try again!");
        }
    } catch (e) {
        console.error(e);
        reply(`❗ An error occurred: ${e.message}`);
    }
});

cmd({
    pattern: "apk",
    desc: "Fetch APK details and send APK file.",
    category: "apk",
    react: "📦",
    filename: __filename
},
async (conn, mek, m, { from, reply, q, pushname }) => {
    try {
 
        if (!q) {
            return reply("Please provide a package name to search for. Example: `.apk com.whatsapp`");
        }

        const apkurl = `https://prabath-md-api.up.railway.app/api/apkdl?q=${q}&apikey=${sai}`;
        const response = await axios.get(apkurl);
        const data = response.data;

        if (!data || !data.data) {
            return reply("Error: Unable to fetch APK details.");
        }

        const apkData = data.data;
        const apkIcon = apkData.icon;
        const apkName = apkData.name;
        const apkPackage = apkData.package;
        const apkLastUpdate = apkData.lastup;
        const apkSize = apkData.size;
        const apkDownloadLink = apkData.dllink;

        await conn.sendMessage(from, {
            image: { url: apkIcon },
            caption: `╭─『 *ᴀᴘᴋ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ* 』───⊷
│
│ ✨ *ʀᴇQᴜᴇꜱᴛᴇʀ*: ${pushname}
│ 🤖 *ʙᴏᴛ*: BHASHI-MD
│ 🎁 *ꜱɪᴢᴇ :* ${apkSize} MB
│ 🎨 *ʟᴀᴛᴇꜱᴛ ᴜᴘᴅᴀᴛᴇ* : ${apkLastUpdate} 
│ ✨ *ꜰɪʟᴇ ɴᴀᴍᴇ :* ${apkName}
│ 🎊 *ᴘᴀᴄᴋᴀɢᴇ :* ${apkPackage} 
│
│ 🤷‍♀️ *We Will Send Your Apk File Latest Update*
╰────────────────────⊷`,
            footer: 'ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛'
        }, { quoted: mek });

        const filePath = path.join(__dirname, `${apkPackage}.apk`);

        const apkResponse = await axios({
            url: apkDownloadLink,
            method: 'GET',
            responseType: 'stream'
        });

        const writer = fs.createWriteStream(filePath);

        apkResponse.data.pipe(writer);

        writer.on('error', (err) => {
            console.error(`File write error: ${err.message}`);
            reply(`Error: ${err.message}`);
        });

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        await conn.sendMessage(from, {
            document: { url: filePath },
            mimetype: 'application/vnd.android.package-archive',
            fileName: `${apkName}.apk`,
            caption: `ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛`,
            footer: 'ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛'
        }, { quoted: mek });

        fs.unlinkSync(filePath);

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});
