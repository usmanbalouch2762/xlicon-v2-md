const toggles = require('../lib/toggles');
const { isOwnerSender } = require('../lib/ownercheck');

module.exports = {
    name: 'autolikestatus',
    aliases: ['als', 'autolike'],
    description: 'Toggle auto-like status on or off',

    async execute(sock, m, args) {
        if (!isOwnerSender(sock, m)) return;
        if (args[0] === 'on') {
            toggles.autolikestatus = true;
            return m.reply('ᴀᴜᴛᴏʟɪᴋᴇsᴛᴀᴛᴜs ᴏɴ ✅');
        }
        if (args[0] === 'off') {
            toggles.autolikestatus = false;
            return m.reply('ᴀᴜᴛᴏʟɪᴋᴇsᴛᴀᴛᴜs ᴏғғ ❌');
        }
        return m.reply(`ᴀᴜᴛᴏʟɪᴋᴇsᴛᴀᴛᴜs: ${toggles.autolikestatus ? 'ᴏɴ ✅' : 'ᴏғғ ❌'}\n\nᴜsᴇ: .ᴀᴜᴛᴏʟɪᴋᴇsᴛᴀᴛᴜs ᴏɴ/ᴏғғ`);
    }
};
