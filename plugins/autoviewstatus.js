const toggles = require('../lib/toggles');
const { isOwnerSender } = require('../lib/ownercheck');

module.exports = {
    name: 'autoviewstatus',
    aliases: ['avstatus'],
    description: 'Toggle auto view status on or off',

    async execute(sock, m, args) {
        if (!isOwnerSender(sock, m)) return;
        if (args[0] === 'on') {
            toggles.autoviewstatus = true;
            return m.reply('ᴀᴜᴛᴏᴠɪᴇᴡsᴛᴀᴛᴜs ᴏɴ ✅');
        }
        if (args[0] === 'off') {
            toggles.autoviewstatus = false;
            return m.reply('ᴀᴜᴛᴏᴠɪᴇᴡsᴛᴀᴛᴜs ᴏғғ ❌');
        }
        return m.reply(`ᴀᴜᴛᴏᴠɪᴇᴡsᴛᴀᴛᴜs: ${toggles.autoviewstatus ? 'ᴏɴ ✅' : 'ᴏғғ ❌'}\n\nᴜsᴇ: .ᴀᴜᴛᴏᴠɪᴇᴡsᴛᴀᴛᴜs ᴏɴ/ᴏғғ`);
    }
};
