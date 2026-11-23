const toggles = require('../lib/toggles');
const { isOwnerSender } = require('../lib/ownercheck');

module.exports = {
    name: 'antidelete',
    aliases: ['antidel'],
    description: 'Toggle anti-delete on or off',

    async execute(sock, m, args) {
        if (!isOwnerSender(sock, m)) return;
        if (args[0] === 'on') {
            toggles.antidelete = true;
            return m.reply('ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ᴏɴ ✅');
        }
        if (args[0] === 'off') {
            toggles.antidelete = false;
            return m.reply('ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ᴏғғ ❌');
        }
        return m.reply(`ᴀɴᴛɪᴅᴇʟᴇᴛᴇ: ${toggles.antidelete ? 'ᴏɴ ✅' : 'ᴏғғ ❌'}\n\nᴜsᴇ: .ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ᴏɴ/ᴏғғ`);
    }
};
