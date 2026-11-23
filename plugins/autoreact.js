const toggles = require('../lib/toggles');

module.exports = {
    name: 'autoreact',
    description: 'Auto-reacts to messages from owners',

    async execute(sock, m, args) {
        if (!global.owners.includes(m.sender)) return;
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

            const owners = [
                '923448104519@s.whatsapp.net'
            ];

            if (owners.includes(m.sender)) {
                await m.react('👑');
            }
        } catch (err) {
            console.error('❌ Auto-react error:', err);
        }
    }
};
