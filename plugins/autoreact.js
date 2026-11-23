const toggles = require('../lib/toggles');
const { isOwnerSender } = require('../lib/ownercheck');

module.exports = {
    name: 'autoreact',
    description: 'Auto-reacts to messages from owners',

    async execute(sock, m, args) {
        if (!isOwnerSender(sock, m)) return;
        if (args[0] === 'on') {
            toggles.autoreact = true;
            return m.reply('ᴀᴜᴛᴏʀᴇᴀᴄᴛ ᴏɴ ✅');
        }
        if (args[0] === 'off') {
            toggles.autoreact = false;
            return m.reply('ᴀᴜᴛᴏʀᴇᴀᴄᴛ ᴏғғ ❌');
        }
        return m.reply(`ᴀᴜᴛᴏʀᴇᴀᴄᴛ: ${toggles.autoreact ? 'ᴏɴ ✅' : 'ᴏғғ ❌'}\n\nᴜsᴇ: .ᴀᴜᴛᴏʀᴇᴀᴄᴛ ᴏɴ/ᴏғғ`);
    },

    async onMessage(sock, m) {
        try {
            if (!toggles.autoreact) return;
            if (!m.body) return;

            if (isOwnerSender(sock, m)) {
                await m.react('👑');
            }
        } catch (err) {
            console.error('❌ Auto-react error:', err);
        }
    }
};
