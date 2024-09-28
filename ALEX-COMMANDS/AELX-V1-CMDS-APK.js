const sai = "6467ad0b29"
const path = require('path');
const { cmd, commands } = require('../command');
const config = require('../config');
const axios = require('axios');
const fs = require('fs');
const { checkAccess, isPremiumUser, blacklistedJIDs, premiumJIDs, dataLoaded } = require('../DATABASE/accessControl');




cmd({
    pattern: 'save',
    desc: 'Saves media from a status or message to your device.',
    category: 'media',
    react: '💾',
    filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        // Check access permissions
        if (!checkAccess(senderNumber, isGroup)) {
            if (blacklistedJIDs.includes(senderNumber)) {
                return reply("*🚫 You are blacklisted. Access denied.*");
            } else {
                return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode!*");
            }
        }

        // Check if a message is quoted
        if (!m.quoted) {
            return reply("Please reply to a status or message with media that you want to save.");
        }

        // Get the quoted message
        const quotedMsg = m.quoted;

        // Check for different types of media
        const mediaType = quotedMsg.type || quotedMsg.mtype;
        let mediaData;
        let fileExtension = '';
        let mimeType = '';

        switch (mediaType) {
            case 'imageMessage':
                mediaData = await quotedMsg.download() || await conn.downloadMediaMessage(quotedMsg);
                fileExtension = 'jpg';
                mimeType = 'image/jpeg';
                break;
            case 'videoMessage':
                mediaData = await quotedMsg.download() || await conn.downloadMediaMessage(quotedMsg);
                fileExtension = 'mp4';
                mimeType = 'video/mp4';
                break;
            case 'audioMessage':
                mediaData = await quotedMsg.download() || await conn.downloadMediaMessage(quotedMsg);
                fileExtension = 'ogg';
                mimeType = 'audio/ogg';
                break;
            case 'documentMessage':
                mediaData = await quotedMsg.download() || await conn.downloadMediaMessage(quotedMsg);
                fileExtension = quotedMsg.fileName ? quotedMsg.fileName.split('.').pop() : 'bin';
                mimeType = quotedMsg.mimetype || 'application/octet-stream';
                break;
            default:
                return reply("The replied message does not contain supported media. Please reply to an image, video, audio, or document.");
        }

        if (!mediaData) {
            return reply("Failed to download the media.");
        }

        // Ensure media directory exists
        const mediaDir = path.join(__dirname, 'media');
        if (!fs.existsSync(mediaDir)) {
            fs.mkdirSync(mediaDir);
        }

        // Generate a unique filename
        const filename = `𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃 | ${Date.now()}.${fileExtension}`;

        // Save the media to a file
        const filePath = path.join(mediaDir, filename);
        fs.writeFileSync(filePath, mediaData);

        // Send the saved file back to the user
        await conn.sendMessage(from, { document: fs.readFileSync(filePath), mimetype: mimeType, fileName: filename }, { quoted: m });

        reply(`*✅ Status Saved* ${filename}\n\n> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★$`);
        console.log('Media saved successfully');
    } catch (e) {
        console.error('Error executing media saver command:', e);
        reply('⚠️ An error occurred while saving the media.');
    }
});


cmd({
    pattern: "rvideo",
    alias: ["randomvideo"],
    desc: "Fetch and send a random video from Pexels.",
    category: "fun",
    react: "🎥",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
           const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        // Check access permissions
        if (!checkAccess(senderNumber, isGroup)) {
            if (blacklistedJIDs.includes(senderNumber)) {
                return reply("*🚫 You are blacklisted. Access denied.*");
            } else {
                return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode!*");
            }
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
        await conn.sendMessage(from, { video: { url: videoPath }, caption: `🎥 *Random Pexels Video* 🎥\n\nTitle: ${videoTitle}\n\n> ʙʜᴀꜱʜɪ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ㋛` }, { quoted: mek });

        // Clean up the downloaded video file
        fs.unlinkSync(videoPath);

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});

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

        // Check access permissions
        if (!checkAccess(senderNumber, isGroup)) {
            if (blacklistedJIDs.includes(senderNumber)) {
                return reply("*🚫 You are blacklisted. Access denied.*");
            } else {
                return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode!*");
            }
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

        // Check access permissions
        if (!checkAccess(senderNumber, isGroup)) {
            if (blacklistedJIDs.includes(senderNumber)) {
                return reply("*🚫 You are blacklisted. Access denied.*");
            } else {
                return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode!*");
            }
        }

        // Check if the XNXX video URL is provided
        if (!q) return reply("🪄 Please provide an XNXX video URL to download ✨");

        // Construct the API URL for fetching video details
        const apiUrl = `https://deliriusapi-official.vercel.app/download/xnxxdl?url=${encodeURIComponent(q)}`;

        // Fetch video details from the API
        let response = await axios.get(apiUrl);
        let result = response.data;

        // Check if the API response contains data
        if (result && result.status && result.data) {
            const video = result.data; // Accessing video data

            let desc = `🎬 *TITLE*: ${video.title}
> 👁️ *Views*: ${video.views}
> 📺 *Quality*: ${video.quality}
> ⏳ *Duration*: ${video.duration}
> 🔗 *Video URL*: ${video.url}`;

            // Send the video details
            await conn.sendMessage(from, { text: desc }, { quoted: mek });

            // Check if high quality download link is available
            const downloadUrl = video.download.high; // Use high-quality download link

            // Send the video
            await conn.sendMessage(from, {
                video: { url: downloadUrl },
                caption: `🎬 *${video.title}*`,
                mimetype: 'video/mp4' // Specify the correct MIME type
            }, { quoted: mek });
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
                const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        // Check access permissions
        if (!checkAccess(senderNumber, isGroup)) {
            if (blacklistedJIDs.includes(senderNumber)) {
                return reply("*🚫 You are blacklisted. Access denied.*");
            } else {
                return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode!*");
            }
        }
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

        // Check access permissions
        if (!checkAccess(senderNumber, isGroup)) {
            if (blacklistedJIDs.includes(senderNumber)) {
                return reply("*🚫 You are blacklisted. Access denied.*");
            } else {
                return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode!*");
            }
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
/*cmd({
    pattern: "srepo2",
    desc: "Stalk GitHub repository.",
    react: "🐱‍💻",
    category: "stalk",
    filename: __filename
}, async (conn, mek, m, { from, args, reply, q }) => {
    try {
        const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        // Check access permissions
        if (!checkAccess(senderNumber, isGroup)) {
            if (blacklistedJIDs.includes(senderNumber)) {
                return reply("*🚫 You are blacklisted. Access denied.*");
            } else {
                return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode!*");
            }
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

*/
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

        // Check access permissions
        if (!checkAccess(senderNumber, isGroup)) {
            if (blacklistedJIDs.includes(senderNumber)) {
                return reply("*🚫 You are blacklisted. Access denied.*");
            } else {
                return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode!*");
            }
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
                const senderNumber = m.sender;
        const isGroup = m.isGroup || false;

        // Check access permissions
        if (!checkAccess(senderNumber, isGroup)) {
            if (blacklistedJIDs.includes(senderNumber)) {
                return reply("*🚫 You are blacklisted. Access denied.*");
            } else {
                return reply("*😢 Access denied. You don't have permission to use this command.🎁 Change Bot Mode!*");
            }
        }
 
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
            caption: `乂  𝖡 𝖧 𝖠 𝖲 𝖧 𝖨  𝖠 𝖯 𝖪  𝖣 𝖫

‎  *📥 𝖠𝗉𝗄 𝖭𝖺𝗆𝖾 :* ${apkName}
‎  *🛍️ 𝖯𝖺𝖼𝗄𝖺𝗀𝖾 :* ${apkPackage} 
‎  *📆 𝖫𝖺𝗌𝗍 𝖴𝗉𝖽𝖺𝗍𝖾 :* ${apkLastUpdate} 
‎  *⚙️ 𝖲𝗂𝗓𝖾 :* ${apkSize} MB`,
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
            caption: `> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★`,
            footer: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★'
        }, { quoted: mek });

        fs.unlinkSync(filePath);

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});
