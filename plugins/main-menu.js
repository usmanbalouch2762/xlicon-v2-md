const axios = require('axios');

module.exports = {
    name: 'menu',
    description: 'Show available bot commands',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        await m.react('✔️');
        
        const prefix = global.BOT_PREFIX || '.';

        const now = new Date();

        const date = now.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'Africa/Accra'
        });

        const time = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            timeZone: 'Africa/Accra'
        });

        const botOwner = global.ownerName || 'ABZTECH';
        const user = m.pushName || m.sender?.split('@')[0] || 'User';
        const Founder = 'Cockroach';

        const menuText = `
┌─ム xʟɪᴄᴏɴ ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ
│ *ғᴏᴜɴᴅᴇʀ:* ${Founder}
│ *ᴏᴡɴᴇʀ:* ${botOwner}
│ *ᴜsᴇʀ:* ${user}
│ *ᴅᴀᴛᴇ:* ${date}
│ *ᴛɪᴍᴇ:* ${time} (GMT)
│ *ᴘʀᴇғɪx:* ${prefix}
╰──────────────────╯

┌─ム ᴀᴠᴀɪʟᴀʙʟᴇ ᴄᴏᴍᴍᴀɴᴅs
│
├─ム *ɢᴇɴᴇʀᴀʟ*
│ ᪣ ${prefix}ᴀʟɪᴠᴇ
│ ᪣ ${prefix}ᴘɪɴɢ
│ ᪣ ${prefix}ᴜᴘᴛɪᴍᴇ
│ ᪣ ${prefix}ᴏᴡɴᴇʀ
│ ᪣ ${prefix}ɢᴜɪᴅᴇ
│ ᪣ ${prefix}ᴍᴇɴᴜ
│ ᪣ ${prefix}ᴍᴇɴᴜ2
│
├─ム *ᴅᴏᴡɴʟᴏᴀᴅᴇʀs*
│ ᪣ ${prefix}ᴛɪᴋᴛᴏᴋ / ${prefix}ᴛᴛ
│ ᪣ ${prefix}ʏᴛᴍᴘ3
│ ᪣ ${prefix}ʏᴍᴘ4
│ ᪣ ${prefix}ᴘʟᴀʏ
│ ᪣ ${prefix}ɪɢ
│ ᪣ ${prefix}ғʙ
│ ᪣ ${prefix}ɪᴍɢ
│ ᪣ ${prefix}ᴄʟɪᴘ
│ ᪣ ${prefix}ʏᴛsᴇᴀʀᴄʜ
│
├─ム *ᴛᴏᴏʟs*
│ ᪣ ${prefix}sᴛɪᴄᴋᴇʀ
│ ᪣ ${prefix}ᴏᴄʀ
│ ᪣ ${prefix}ᴡʀɪᴛᴇ
│ ᪣ ${prefix}ᴛᴛs
│ ᪣ ${prefix}ᴛᴛs2
│ ᪣ ${prefix}ᴘᴏʟʟ
│ ᪣ ${prefix}sʜᴀᴢᴀᴍ
│ ᪣ ${prefix}ᴛᴇxᴛᴘʀᴏ
│ ᪣ ${prefix}ᴄʜɪᴅ
│ ᪣ ${prefix}ᴛᴏᴜʀʟ
│ ᪣ ${prefix}ᴛᴡᴇᴇᴛ
│ ᪣ ${prefix}ʀᴇsɪᴢᴇ
│ ᪣ ${prefix}ᴘᴘ
│ ᪣ ${prefix}ᴡᴇᴀᴛʜᴇʀ
│ ᪣ ${prefix}sᴛʏʟᴇ
│ ᪣ ${prefix}ʙɪʙʟᴇ
│ ᪣ ${prefix}ʙʟᴜᴇ
│ ᪣ ${prefix}ɢᴜᴇssɢᴇɴᴅᴇʀ
│ ᪣ ${prefix}ᴀɢᴇᴄᴀʟᴄᴜʟᴀᴛᴏʀ
│ ᪣ ${prefix}ʜɪᴅᴇ
│ ᪣ ${prefix}ғᴏʀᴡᴀʀᴅ
│ ᪣ ${prefix}ʀᴇᴛᴀɢ
│ ᪣ ${prefix}ʟᴏɢɢᴇʀ
│ ᪣ ${prefix}ᴠɪᴇᴡᴏɴᴄᴇ
│ ᪣ ${prefix}ᴛᴇᴍᴘ
│
├─ム *ᴀɪ*
│ ᪣ ${prefix}ᴀɪ
│ ᪣ ${prefix}ᴀɪ-sᴇᴀʀᴄʜ
│ ᪣ ${prefix}ᴀɪᴠ
│ ᪣ ${prefix}ɢᴇɴ
│
├─ム *ғᴜɴ*
│ ᪣ ${prefix}ғʟᴀɢ
│ ᪣ ${prefix}ᴡᴀɪғᴜ
│ ᪣ ${prefix}ᴀɴɪᴍsᴛɪᴄᴋᴇʀ
│ ᪣ ${prefix}ɴᴇᴋᴏ
│ ᪣ ${prefix}ᴋɪᴛsᴜɴᴇ
│ ᪣ ${prefix}ʜᴜsʙᴀɴᴅᴏ
│ ᪣ ${prefix}ᴄᴏᴜᴘʟᴇᴘᴘ
│
├─ム *ɢʀᴏᴜᴘ*
│ ᪣ ${prefix}ᴛᴀɢᴀʟʟ
│ ᪣ ${prefix}ᴀʟʟ
│ ᪣ ${prefix}ᴛᴀɢᴍᴇ
│ ᪣ ${prefix}ᴄᴏᴜᴘʟᴇᴘᴘ
│ ᪣ ${prefix}ɢʀᴏᴜᴘ
│ ᪣ ${prefix}ɢɪɴғᴏ
│ ᪣ ${prefix}ᴀɴᴛɪɢsᴛ
│ ᪣ ${prefix}ᴀɴᴛɪʟɪɴᴋ
│ ᪣ ${prefix}ᴡᴇʟᴄᴏᴍᴇ
│ ᪣ ${prefix}ʟɪɴᴋɢᴄ
│ ᪣ ${prefix}ɢsᴛᴀᴛᴜs
│
├─ム *sᴛᴀᴛᴜs*
│ ᪣ ${prefix}ɢsᴛᴀᴛᴜs
│
├─ム *ᴄʜᴀɴɴᴇʟ*
│ ᪣ ${prefix}ᴄʜᴀɴɴᴇʟɪᴅ
│
├─ム *ᴀᴅᴍɪɴ*
│ ᪣ ${prefix}ᴋɪᴄᴋ
│ ᪣ ${prefix}ᴘʀᴏᴍᴏᴛᴇ
│ ᪣ ${prefix}ᴅᴇᴍᴏᴛᴇ
│ ᪣ ${prefix}ᴀɴᴛɪʟɪɴᴋ
│
├─ム *ᴏᴡɴᴇʀ ᴏɴʟʏ*
│ ᪣ ${prefix}ᴇxᴇᴄ
│ ᪣ ${prefix}ᴀᴅᴅᴏᴡɴᴇʀ
│ ᪣ ${prefix}sᴇᴛᴘʀᴇғɪx
│ ᪣ ${prefix}sᴇᴛᴘᴘ
│ ᪣ ${prefix}sᴇʟғ
│ ᪣ ${prefix}sᴀᴠᴇ
│ ᪣ ${prefix}ᴅᴇʟ
│ ᪣ ${prefix}ᴊᴏɪɴ / ${prefix}ʟᴇᴀᴠᴇ
│
├─ム *ᴀᴜᴛᴏ*
│ ᪣ ${prefix}ᴀᴜᴛᴏᴠɪᴇᴡsᴛᴀᴛᴜs ᴏɴ/ᴏғғ — sᴛᴀᴛᴜs ᴋʜᴜᴅ ᴅᴇᴋʜᴛᴀ ʜᴀɪ
│ ᪣ ${prefix}ᴀᴜᴛᴏʀᴇᴀᴄᴛ ᴏɴ/ᴏғғ — ᴏᴡɴᴇʀ ᴋ ᴍᴇssᴀɢᴇ ᴘᴇ 👑
│ ᪣ ᴍᴇɴᴛɪᴏɴ-ᴏᴡɴᴇʀ — ᴏᴡɴᴇʀ ᴛᴀɢ ʜᴏ ᴛᴏ ᴀᴜᴛᴏ ʀᴇᴘʟʏ
│ ᪣ xʟɪᴄᴏɴ ʀᴇᴘʟʏ — xʟɪᴄᴏɴ ʟɪᴋʜᴏ ᴛᴏ ᴀᴜᴛᴏ ʀᴇᴘʟʏ
│ ᪣ ᴀᴜᴛᴏ ʀᴇᴘʟʏ — ᴛʀɪɢɢᴇʀ ᴡᴏʀᴅs ᴘᴇ ᴋʜᴜᴅ ᴊᴀᴡᴀʙ
│ ᪣ ᴡᴇʟᴄᴏᴍᴇ ᴍᴇssᴀɢᴇs — ɢʀᴏᴜᴘ ᴍᴇɪɴ ɴᴇᴡ ᴍᴇᴍʙᴇʀ
│
╰─────────◆────────╯

> 「 𝙏𝙞𝙢𝙚 - 𝙏𝙞𝙢𝙚𝙡𝙚𝙨𝙨 」
`.trim();

        try {
            const imageBuffer = (await axios.get(global.menuImage, {
                responseType: 'arraybuffer'
            })).data;

            await m.reply(imageBuffer, {
                caption: menuText
            });

        } catch (err) {
            console.error('Menu error:', err);
            await m.reply('❌ Failed to load menu. Please try again later.');
        }
    }
};
