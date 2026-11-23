const selfmode = require('../lib/selfmode');
const { isOwnerSender } = require('../lib/ownercheck');

module.exports = {
    name: 'self',
    aliases: ['selfmode'],

    async execute(sock, m, args) {
        await m.react('⚙️');
        if (!isOwnerSender(sock, m)) {
            return;
        }

        if (args[0] === 'on') {
            selfmode.setSelfMode(true);
            m.reply('sᴇʟғ ᴍᴏᴅᴇ ᴏɴ - ᴏɴʟʏ ʙᴏᴛ & ᴏᴡɴᴇʀs ᴄᴀɴ ᴜsᴇ ʙᴏᴛ');
        }
        else if (args[0] === 'off') {
            selfmode.setSelfMode(false);
            m.reply('sᴇʟғ ᴍᴏᴅᴇ ᴏғғ - ᴇᴠᴇʀʏᴏɴᴇ ᴄᴀɴ ᴜsᴇ ʙᴏᴛ');
        }
        else {
            const on = selfmode.isSelfMode();
            m.reply(`sᴇʟғ ᴍᴏᴅᴇ: ${on ? 'ᴏɴ (ʙᴏᴛ & ᴏᴡɴᴇʀs ᴏɴʟʏ)' : 'ᴏғғ (ᴇᴠᴇʀʏᴏɴᴇ)'}\n\nᴜsᴇ: .sᴇʟғ ᴏɴ/ᴏғғ`);
        }
    },

    async onMessage(sock, m) {
        if (!selfmode.isSelfMode()) return false;
        if (isOwnerSender(sock, m)) return false;

        if (m.body && m.body.startsWith(global.BOT_PREFIX)) {
            return true;
        }

        return false;
    }
};
