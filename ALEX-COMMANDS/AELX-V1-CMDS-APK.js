const sai = "6467ad0b29"
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
