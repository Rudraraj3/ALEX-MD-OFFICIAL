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
*╎➮ 11 𝑁𝑒𝑤𝑠 𝑀𝑒𝑛𝑢*
*╎➮ 12 𝐺𝑟𝑜𝑢𝑝 𝑀𝑒𝑛𝑢*
*╎➮ 13 𝐵𝑢𝑔 𝑀𝑒𝑛𝑢*
*╎➮ 14 𝑂𝑤𝑛𝑒𝑟 𝑀𝑒𝑛𝑢*
*╎➮ 15 𝐸𝒉𝑖 𝑀𝑒𝑛𝑢*
*╚──────────────┈┈*
*╭─ 「  𝑴𝒓 𝑨𝒍𝒆𝒙 𝑰𝒅  」*
*╰───────────────┈*
        ⏤͟͟͞͞★❬❬ 𝑼𝒑𝒅𝒂𝒕𝒆𝒔  ❭❭⏤͟͟͞͞★

> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★`;

// Main Menu
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

// Download Menu
const DL_MSG = `*╭─ 「  𝐴𝐿𝐸𝑋-𝑀𝐷 」*
*╰────────────┈*
╭══════════════◈
┃「  𝐷𝑂𝑊𝑁𝐿𝑂𝐴𝐷 𝑀𝐸𝑁𝑈 」
╰══════════════◈
*╭────────────┈◦•◦❥•*
*╎➮ . 𝑆𝑜𝑛𝑔*
*╎➮ . 𝑉𝑖𝑑𝑒𝑜*
*╎➮ . 𝐹𝑏*
*╎➮ . 𝑇𝑖𝑘𝑡𝑜𝑘*
*╎➮ . 𝐼𝑚𝑔*
*╎➮ . 𝐺𝑑𝑟𝑖𝑣𝑒*
*╎➮ . 𝑀𝑓𝑖𝑟𝑒*
*╎➮ . 𝐴𝑝𝑘*
*╎➮ . 𝐺𝑖𝑡𝑐𝑙𝑜𝑛𝑒*
*╎➮ . 𝑊𝑎𝑙𝑙𝑝𝑎𝑝𝑒𝑟*
*╚──────────────┈┈*
*╭─ 「  𝑴𝒓 𝑨𝒍𝒆𝒙 𝑰𝒅  」*
*╰───────────────┈*
       *⏤͟͟͞͞★❬❬ 𝑈𝑃𝐷𝐴𝑇𝐸𝑆 ❭❭⏤͟͟͞͞★*

> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★`;

// Converter Menu
const CONVERTER_MSG = `*╭─ 「  𝐴𝐿𝐸𝑋-𝑀𝐷 」*
*╰────────────┈*
╭══════════════◈
┃「  𝐶𝑂𝑁𝑉𝐸𝑅𝑇 𝑀𝐸𝑁𝑈 」
╰══════════════◈
*╭────────────┈◦•◦❥•*
*╎➮ .𝑄𝑟*
*╎➮ .𝑆𝒉𝑜𝑟𝑡𝑢𝑟𝑙*
*╎➮ .𝑇𝑟𝑡*
*╎➮ .𝑀𝑜𝑟𝑠𝑒*
*╎➮ .𝐸𝑏𝑖𝑛𝑎𝑟𝑦*
*╎➮ .𝐷𝑏𝑖𝑛𝑎𝑟𝑦*
*╎➮ .𝐺𝑖𝑡𝑐𝑙𝑜𝑛𝑒*
*╚──────────────┈┈*
*╭─ 「  𝑴𝒓 𝑨𝒍𝒆𝒙 𝑰𝒅  」*
*╰───────────────┈*
        ⏤͟͟͞͞★❬❬ 𝑼𝒑𝒅𝒂𝒕𝒆𝒔  ❭❭⏤͟͟͞͞★

> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★`;

// AI Menu
const AI_MSG = `*╭─ 「  𝐴𝐿𝐸𝑋-𝑀𝐷 」*
*╰────────────┈*
╭══════════════◈
┃「  𝐴𝐼  𝑀𝐸𝑁𝑈 」
╰══════════════◈
*╭────────────┈◦•◦❥•*
*╎➮ .𝐴𝑖*
*╚──────────────┈┈*
*╭─ 「  𝑴𝒓 𝑨𝒍𝒆𝒙 𝑰𝒅  」*
*╰───────────────┈*
        ⏤͟͟͞͞★❬❬ 𝑼𝒑𝒅𝒂𝒕𝒆𝒔  ❭❭⏤͟͟͞͞★

> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★`;

// Search Menu
const SEARCH_MSG = `*╭─ 「  𝐴𝐿𝐸𝑋-𝑀𝐷 」*
*╰────────────┈*
╭══════════════◈
┃「  𝑆𝐸𝐴𝑅𝐶𝐻  𝑀𝐸𝑁𝑈 」
╰══════════════◈
*╭────────────┈◦•◦❥•*
*╎➮ .𝑌𝑡𝑠*
*╎➮ .𝐺𝑖𝑡𝒉𝑢𝑏𝑠𝑡𝑎𝑙𝑘*
*╎➮ .𝐶𝑟𝑖𝑐*
*╎➮ .𝑁𝑝𝑚*
*╎➮ .𝐷𝑒𝑓𝑖𝑛𝑒*
*╎➮ .𝐶𝑜𝑙𝑜𝑢𝑟*
*╎➮ .𝐼𝑡𝑢𝑛𝑒*
*╎➮ .𝑇𝑒𝑐𝒉*
*╎➮ .𝑍𝑖𝑝*
*╎➮ .𝑆𝑟𝑒𝑝𝑜*
*╎➮ .𝐿𝑦𝑟𝑖𝑐𝑠*
*╚──────────────┈┈*
*╭─ 「  𝑴𝒓 𝑨𝒍𝒆𝒙 𝑰𝒅  」*
*╰───────────────┈*
        ⏤͟͟͞͞★❬❬ 𝑼𝒑𝒅𝒂𝒕𝒆𝒔  ❭❭⏤͟͟͞͞★

> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★`;

// Fun Menu
const FUN_MSG = `*╭─ 「  𝐴𝐿𝐸𝑋-𝑀𝐷 」*
*╰────────────┈*
╭══════════════◈
┃「  𝐹𝑈𝑁 𝑀𝐸𝑁𝑈 」
╰══════════════◈
*╭────────────┈◦•◦❥•*
*╎➮ .𝐺𝑖𝑓*
*╎➮ .𝑅𝑣𝑖𝑑𝑒𝑜*
*╎➮ .𝐽𝑜𝑘𝑒*
*╎➮ .𝑀𝑦𝑠𝑡𝑒𝑟𝑦𝑏𝑜𝑥*
*╎➮ .𝑃𝑟𝑒𝑑𝑖𝑐𝑡*
*╎➮ .𝐺𝑒𝑛𝑑𝑒𝑟𝑖𝑧𝑒𝑟*
*╎➮ .𝑁𝑎𝑡𝑖𝑜𝑛𝑎𝑙𝑖𝑧𝑒*
*╎➮ .𝐹𝑎𝑐𝑡*
*╎➮ .𝐻𝑎𝑐𝑘*
*╎➮ .𝑆𝑡𝑢𝑑𝑦𝒉𝑒𝑙𝑝𝑒𝑟*
*╎➮ .𝑅𝑐𝑜𝑙𝑜𝑟*
*╎➮ .𝑅𝑐𝑜𝑓𝑓𝑒𝑒*
*╎➮ .𝑅𝑎𝑛𝑖𝑚𝑒*
*╎➮ .𝑅𝑐𝑜𝑠𝑝𝑙𝑎𝑦*
*╎➮ .𝑅𝑤𝑎𝑖𝑓𝑢*
*╎➮ .𝑅𝒉𝑢𝑠𝑏𝑢*
*╎➮ .𝑅𝑖𝑚𝑔*
*╎➮ .𝑅𝑣𝑖𝑑𝑒𝑜*
*╚──────────────┈┈*
*╭─ 「  𝑴𝒓 𝑨𝒍𝒆𝒙 𝑰𝒅  」*
*╰───────────────┈*
        ⏤͟͟͞͞★❬❬ 𝑼𝒑𝒅𝒂𝒕𝒆𝒔  ❭❭⏤͟͟͞͞★

> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★`;

// NSFW Menu
const XXX_MSG = `*╭─ 「  𝐴𝐿𝐸𝑋-𝑀𝐷 」*
*╰────────────┈*
╭══════════════◈
┃「  18+ 𝑀𝐸𝑁𝑈 」
╰══════════════◈
*╭────────────┈◦•◦❥•*
*╎➮ .𝑋𝑛𝑥𝑥*
*╎➮ .𝑋𝑛𝑥𝑥𝑑𝑙*
*╎➮ .𝐻𝑒𝑛𝑡𝑎𝑖𝑣𝑖𝑑*
*╎➮ .𝑁𝑠𝑓𝑤𝑙𝑜𝑙𝑖*
*╎➮ .𝑁𝑠𝑓𝑤𝑎𝑠𝑠*
*╎➮ .𝑁𝑠𝑓𝑤𝑏𝑑𝑠𝑚*
*╎➮ .𝑁𝑠𝑓𝑤𝑒𝑟𝑜*
*╎➮ .𝑁𝑠𝑓𝑤𝑔𝑙𝑎𝑠𝑠*
*╎➮ .𝐻𝑒𝑛𝑡𝑎𝑖*
*╎➮ .𝑇𝑒𝑡𝑎𝑧*
*╎➮ .𝐵𝑜𝑜𝑡𝑦*
*╎➮ .𝐸𝑐𝑐𝒉𝑖*
*╎➮ .𝐹𝑢𝑟𝑟𝑜*
*╎➮ .𝑇𝑟𝑎𝑝𝑖𝑡𝑜*
*╎➮ .𝐼𝑚𝑎𝑔𝑒𝑛𝑙𝑒𝑎𝑏𝑖𝑎𝑛𝑠*
*╎➮ .𝑃𝑎𝑛𝑡𝑖𝑒𝑠*
*╎➮ .𝑃𝑒𝑛𝑒*
*╎➮ .𝑃𝑟𝑜𝑛𝑜*
*╎➮ .𝑅𝑒𝑛𝑑𝑜𝑚𝑥𝑥𝑥*
*╎➮ .𝑃𝑒𝑐𝒉𝑜𝑠*
*╎➮ .𝑌𝑎𝑜𝑖2*
*╎➮ .𝑌𝑢𝑟𝑖2*
*╎➮ .𝐻𝑒𝑛𝑡𝑎𝑖2*
*╎➮ .𝑇𝑟𝑎𝑙*
*╎➮ .𝐻𝑛𝑒𝑘𝑜*
*╎➮ .𝐵𝑒𝑙𝑜𝑤𝑗𝑜𝑏*
*╎➮ .𝐶𝑜𝑢𝑠𝑡𝑜𝑚𝑛𝑎𝑓𝑤*
*╚──────────────┈┈*
*╭─ 「  𝑴𝒓 𝑨𝒍𝒆𝒙 𝑰𝒅  」*
*╰───────────────┈*
        ⏤‌‌‌‌★❬❬ 𝑼𝒑𝒅𝒂𝒕𝒆𝒔  ❭❭⏤‌‌‌‌★

> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★`;

// Useful Menu
const USEFUL_MSG = `*╭─ 「  𝐴𝐿𝐸𝑋-𝑀𝐷 」*
*╰────────────┈*
╭══════════════◈
┃「  𝑈𝑆𝐸𝐹𝑈𝐿𝐿 𝑀𝐸𝑁𝑈 」
╰══════════════◈
*╭────────────┈◦•◦❥•*
*╎➮ .𝐵𝑖𝑛𝑎𝑛𝑐𝑒*
*╎➮ .𝑊𝑎*
*╎➮ .𝑆𝑙𝑜𝑣𝑒*
*╎➮ .𝐽𝑖𝑑*
*╎➮ .𝐷𝑛𝑠𝑙𝑜𝑜𝑘𝑢𝑝*
*╎➮ .𝐶𝑜𝑢𝑛𝑡𝑑𝑜𝑤𝑛*
*╎➮ .𝐶𝒉𝑒𝑐𝑘𝑝𝑤*
*╎➮ .𝑈𝑠𝑒𝑟𝑖𝑛𝑓𝑜*
*╎➮ .𝐼𝑝𝑔𝑒𝑜*
*╎➮ .𝑊𝒉𝑜𝑖𝑠*
*╎➮ .𝐻𝑒𝑎𝑑𝑒𝑟*
*╎➮ .𝑊𝑒𝑎𝑡𝒉𝑒𝑟*
*╎➮ .𝐺𝑜𝑎𝑠𝑠*
*╎➮ .𝑁𝑒𝑤𝑠𝑝𝑎𝑠𝑡𝑒*
*╎➮ .𝐺𝑒𝑡𝑝𝑎𝑠𝑡𝑒𝑟*
*╚──────────────┈┈*
*╭─ 「  𝑴𝒓 𝑨𝒍𝒆𝒙 𝑰𝒅  」*
*╰───────────────┈*
        ⏤‌‌‌‌★❬❬ 𝑼𝒑𝒅𝒂𝒕𝒆𝒔  ❭❭⏤‌‌‌‌★

> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★`;

// Logo Menu
const LOGO_MSG = `*╭─ 「  𝐴𝐿𝐸𝑋-𝑀𝐷 」*
*╰────────────┈*
╭══════════════◈
┃「  𝐿𝑂𝐺𝑂  𝑀𝐸𝑁𝑈 」
╰══════════════◈
*╭────────────┈◦•◦❥•*
*╎➮ .𝐴𝑙𝑒𝑟𝑡*
*╎➮ .𝑈𝑛𝑓𝑜𝑟𝑔𝑖𝑣𝑎𝑏𝑙𝑒*
*╎➮ .𝑃𝑖𝑘𝑎𝑐𝒉𝑢*
*╎➮ .𝐶𝑎𝑢𝑡𝑖𝑜𝑛*
*╎➮ .𝐷𝑟𝑎𝑘𝑒*
*╎➮ .𝑃𝑜𝑜𝒉*
*╎➮ .𝑆𝑎𝑑𝑐𝑎𝑡*
*╎➮ .𝑂𝑜𝑔𝑤𝑎𝑦*
*╚──────────────┈┈*
*╭─ 「  𝑴𝒓 𝑨𝒍𝒆𝒙 𝑰𝒅  」*
*╰───────────────┈*
        ⏤‌‌‌‌★❬❬ 𝑼𝒑𝒅𝒂𝒕𝒆𝒔  ❭❭⏤‌‌‌‌★

> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★`;

// Movie Menu
const MV_MSG = `*╭─ 「  𝐴𝐿𝐸𝑋-𝑀𝐷 」*
*╰────────────┈*
╭══════════════◈
┃「  𝑀𝑂𝑉𝐼𝐸 𝑀𝐸𝑁𝑈 」
╰══════════════◈
*╭────────────┈◦•◦❥•*
*╎➮ .𝑀𝑜𝑣𝑖𝑒*
*╎➮ .𝑈𝑝𝑐𝑜𝑚𝑖𝑛𝑔𝑚𝑜𝑣𝑖𝑒*
*╎➮ .𝑅𝑒𝑛𝑑𝑜𝑚𝑚𝑜𝑣𝑖𝑒*
*╎➮ .𝑇𝑜𝑝𝑚𝑜𝑣𝑖𝑒*
*╎➮ .𝐴𝑛𝑖𝑚𝑒*
*╎➮ .𝑇𝑜𝑝𝑎𝑛𝑖𝑚𝑒*
*╎➮ .𝑈𝑝𝑐𝑜𝑚𝑖𝑛𝑔𝑎𝑛𝑖𝑚𝑒*
*╚──────────────┈┈*
*╭─ 「  𝑴𝒓 𝑨𝒍𝒆𝒙 𝑰𝒅  」*
*╰───────────────┈*
        ⏤‌‌‌‌★❬❬ 𝑼𝒑𝒅𝒂𝒕𝒆𝒔  ❭❭⏤‌‌‌‌★

> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★`;

// News Menu
const NEWS_MSG = `*╭─ 「  𝐴𝐿𝐸𝑋-𝑀𝐷 」*
*╰────────────┈*
╭══════════════◈
┃「  𝑁𝐸𝑊𝑆 𝑀𝐸𝑁𝑈 」
╰══════════════◈
*╭────────────┈◦•◦❥•*
*╎➮ .𝑁𝑒𝑤𝑠*
*╎➮ .𝑁𝑒𝑤𝑠𝑤*
*╎➮ .𝐸𝑠𝑎𝑛𝑎*
*╎➮ .𝐸𝑠𝑎𝑛𝑎𝑙𝑖𝑠𝑡*
*╎➮ .𝐿𝑜𝑠𝑛𝑒𝑤𝑠*
*╎➮ .𝐿𝑖𝑠𝑡𝑖𝑜𝑠𝑛𝑒𝑤𝑠*
*╚──────────────┈┈*
*╭─ 「  𝑴𝒓 𝑨𝒍𝒆𝒙 𝑰𝒅  」*
*╰───────────────┈*
        ⏤‌‌‌‌★❬❬ 𝑼𝒑𝒅𝒂𝒕𝒆𝒔  ❭❭⏤‌‌‌‌★

> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★`;

// Placeholder Menus (currently empty)
const GROUP_MSG = `*╭─ 「  𝐴𝐿𝐸𝑋-𝑀𝐷 」*
*╰────────────┈*
╭══════════════◈
┃「  𝐺𝑅𝑂𝑈𝑃 𝑀𝐸𝑁𝑈 」
╰══════════════◈
*╭────────────┈◦•◦❥•*
*╎➮ . 𝑃𝑟𝑜𝑚𝑜𝑡𝑒*
*╎➮ . 𝐷𝑒𝑚𝑜𝑡𝑒*
*╎➮ . 𝐴𝑑𝑑*
*╎➮ . 𝑇𝑎𝑔𝑎𝑙𝑙*
*╎➮ . 𝑆𝑒𝑡𝑠𝑢𝑏𝑗𝑒𝑐𝑡*
*╎➮ . 𝑆𝑒𝑡𝑑𝑒𝑠𝑐*
*╎➮ . 𝐻𝑖𝑑𝑒𝑡𝑎𝑔*
*╎➮ . 𝑀𝑢𝑡𝑒*
*╎➮ . 𝑈𝑛𝑚𝑢𝑡𝑒*
*╎➮ . 𝐾𝑖𝑐𝑘*
*╎➮ . 𝐺𝑟𝑜𝑢𝑝𝑖𝑛𝑓𝑜*
*╎➮ . 𝐺𝑒𝑡𝑝𝑖𝑐*
*╎➮ . 𝑆𝑒𝑡𝑔𝑜𝑜𝑑𝑏𝑦𝑒*
*╎➮ . 𝑆𝑒𝑡𝑤𝑒𝑙𝑐𝑜𝑚𝑒*
*╚──────────────┈┈*
*╭─ 「  𝑴𝒓 𝑨𝒍𝒆𝒙 𝑰𝒅  」*
*╰───────────────┈*
        *⏤͟͟͞͞★❬❬ 𝑈𝑃𝐷𝐴𝑇𝐸𝑆 ❭❭⏤͟͟͞͞★*

> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★`;

//Bug Menu
const BG_MSG = `*╭─「 𝐴𝐿𝐸𝑋-𝑀𝐷 」*
*╰────────────┈*
𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐝𝐚𝐫𝐤 𝐡𝐚𝐜𝐤𝐞𝐫 𝐳𝐨𝐧𝐞
𝐭𝐞𝐚𝐦𝐞 𝐥𝐞𝐚𝐝𝐞𝐫 𝐚𝐥𝐞𝐱-𝐢𝐝
╭━─────────────━━❯❯
┃➮ .𝐵𝑈𝐺 𝑀𝐸𝑁𝑈
╰━───────────━━❯❯
╭━━─────────────━❯❯
╰╮➢ 𝐴𝐿𝐸𝑋-𝑀𝐷 𝐶𝑅𝐴𝑆𝐻 ➮_
╭━━────────────━━❯❯
┃✗ .crash
┃✗ .crash_doc
┃✗ .crash_home
┃✗ .crash_status
┃✗ .crash_key
┃✗.bug
┃✗ .pay
┃✗ .bug1
┃✗ .bug2
┃✗ .bug3
┃✗ .bug4
┃✗ .kill
┃✗ .kill1
┃✗ .crash_loc
┃✗ .crash_audio
┃✗ .crash_doc
┃✗ .notecrash
┃✗ .bn_whatsapp
┃✗ .lock
┃✗ .doc
┃✗ .maxim
┃✗ .bug_ios
┃✗ .crashgp_v12
┃✗ .apple
┃✗ .home_crash
┃✗ .1x_doc
┃✗ .xxx_crash
┃✗ .cn_chat1
┃✗ .nova_alex
┃✗ .system_down
┃✗ .crash_hack
┃✗ .doc_beta
┃✗ .docbeta_v1
┃✗.docbeta_v2
┃✗ .bugcall
┃✗ .loc_beta
┃✗ .bug_callv1
┃✗ .crash-ios
┃✗ .community_bug
┃✗ .trava-audio
┃✗ .alex_kill1
┃✗ .aled_crash1
╰━━───────────━━❯❯
*⏤͟͟͞͞★❬❬ 𝑈𝑃𝐷𝐴𝑇𝐸𝑆 ❭❭⏤͟͟͞͞★*

> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★`;

//Owner Msnu
const OWNER_MSG = `*╭─ 「  𝐴𝐿𝐸𝑋-𝑀𝐷 」*
*╰────────────┈*
╭══════════════◈
┃「  𝑂𝑊𝑁𝐸𝑅 𝑀𝐸𝑁𝑈 」
╰══════════════◈
*╭────────────┈◦•◦❥•*
*╎➮ . 𝐴𝑢𝑡𝑜𝑏𝑖𝑜*
*╎➮ . 𝑅𝑒𝑠𝑡𝑎𝑟𝑡*
*╎➮ . 𝑈𝑝𝑑𝑎𝑡𝑒*
*╎➮ . 𝑈𝑝𝑔𝑟𝑎𝑑𝑒*
*╎➮ . 𝑅𝑒𝑚𝑜𝑣𝑒𝑜𝑤𝑛𝑒𝑟*
*╎➮ . 𝐴𝑛𝑡𝑖𝑙𝑖𝑛𝑘*
*╎➮ . 𝐵𝑎𝑛*
*╎➮ . 𝑈𝑛𝑏𝑎𝑛*
*╎➮ . 𝑆𝑒𝑡𝑏𝑜𝑡𝑏𝑖𝑜*
*╎➮ . 𝑆𝑒𝑡𝑏𝑜𝑡𝑛𝑎𝑚𝑒*
*╎➮ . 𝑈𝑛𝑏𝑙𝑜𝑐𝑘*
*╎➮ . 𝑆𝑒𝑡𝑝𝑝*
*╎➮ . 𝑆𝑒𝑡𝑎𝑢𝑡𝑜𝑏𝑖𝑜*
*╎➮ . 𝐵𝑟𝑜𝑎𝑑𝑐𝑎𝑠𝑡*
*╎➮ . 𝐽𝑜𝑖𝑛*
*╎➮ . 𝐿𝑒𝑓𝑡*
*╚──────────────┈┈*
*╭─ 「  𝑴𝒓 𝑨𝒍𝒆𝒙 𝑰𝒅  」*
*╰───────────────┈*
    *⏤͟͟͞͞★❬❬ 𝑈𝑃𝐷𝐴𝑇𝐸𝑆 ❭❭⏤͟͟͞͞★*
 
> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★`;

// Ehi Menu
const EM_MSG = `*╭─ 「  𝐴𝐿𝐸𝑋-𝑀𝐷 」*
*╰────────────┈*
╭══════════════◈
┃「  𝐸𝐻𝐼 𝑀𝐸𝑁𝑈 」
╰══════════════◈
*╭────────────┈◦•◦❥•*
*╎➮ . 𝐸𝒉𝑖*
*╎➮ . 𝑉2𝑟𝑎𝑦*
*╎➮ . 𝐷𝑖𝑎𝑙𝑜𝑔*
*╎➮ . 𝐻𝑢𝑡𝑐𝒉*
*╎➮ . 𝑀𝑜𝑏𝑖𝑡𝑒𝑙*
*╎➮ . 𝑃𝑎𝑖𝑑𝐸𝒉𝑖*
*╚──────────────┈┈*
*╭─ 「  𝑴𝒓 𝑨𝒍𝒆𝒙 𝑰𝒅  」*
*╰───────────────┈*
       *⏤͟͟͞͞★❬❬ 𝑈𝑃𝐷𝐴𝑇𝐸𝑆 ❭❭⏤͟͟͞͞★*

> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★`;
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
                    body: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★​',
                    thumbnailUrl: thumbnailUrl, // Use the URL directly here
                    sourceUrl: 'https://alex-id-programmer.vercel.app/',
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
    pattern: "mainmenu",
    alias: ["1"],
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
          body: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: 'https://alex-id-programmer.vercel.app/',
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
    pattern: "downloadmenu",
    alias: ["2"],
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
          body: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★​',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: 'https://alex-id-programmer.vercel.app/',
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
    pattern: "convertermenu",
    alias: ["3"],
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
          body: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: 'https://alex-id-programmer.vercel.app/',
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
    pattern: "aimenu",
    alias: ["4"],
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
          body: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: 'https://alex-id-programmer.vercel.app/',
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
    pattern: "searchmenu",
    alias: ["5"],
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
          body: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★​',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: 'https://alex-id-programmer.vercel.app/',
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
    pattern: "funmenu",
    alias: ["6"],
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
          body: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: 'https://alex-id-programmer.vercel.app/',
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
    pattern: "18+menu",
    alias: ["7"],
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
      caption: XXX_MSG,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          newsletterJid: "120363285813931317@newsletter",
        },
        externalAdReply: {
          title: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          body: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★​',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: 'https://alex-id-programmer.vercel.app/',
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
    pattern: "usefulmenu",
    alias: ["8"],
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
          body: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          thumbnailUrl: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          sourceUrl: 'https://alex-id-programmer.vercel.app/',
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
    pattern: "logomenu",
    alias: ["9"],
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
          body: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★​',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: 'https://alex-id-programmer.vercel.app/',
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
    pattern: "groupmenu",
    alias: ["10"],
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
          body: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: 'https://alex-id-programmer.vercel.app/',
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
    pattern: "newsmenu",
    alias: ["11"],
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
          body: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: 'https://alex-id-programmer.vercel.app/',
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
    pattern: "moviemenu",
    alias: ["12"],
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
      caption: MV_MSG,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          newsletterJid: "120363285813931317@newsletter",
        },
        externalAdReply: {
          title: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          body: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: 'https://alex-id-programmer.vercel.app/',
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
    pattern: "bugmenu",
    alias: ["13"],
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
      caption: BG_MSG,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          newsletterJid: "120363285813931317@newsletter",
        },
        externalAdReply: {
          title: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          body: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: 'https://alex-id-programmer.vercel.app/',
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
    pattern: "ownermenu",
    alias: ["14"],
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
          body: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: 'https://alex-id-programmer.vercel.app/',
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
    pattern: "ehimenu",
    alias: ["15"],
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
      caption: EM_MSG,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          newsletterJid: "120363285813931317@newsletter",
        },
        externalAdReply: {
          title: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃',
          body: '> ⏤͟͟͞͞★❬❬ 𝐴𝑙𝑒𝑥-𝑀𝑑 𝑊𝒉𝑎𝑡𝑠𝑎𝑝𝑝 𝐵𝑜𝑡 ❭❭⏤͟͟͞͞★',
          thumbnailUrl: 'https://telegra.ph/file/aa2b0c3227ae3ec2001b3.jpg',
          sourceUrl: 'https://alex-id-programmer.vercel.app/',
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
