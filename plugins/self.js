const selfmode = require('../lib/selfmode');

function norm(jid = '') {
    return String(jid).split(':')[0];
}

// Owner check that also handles device suffixes (9234...:12@s.whatsapp.net)
// and LID senders (WhatsApp sometimes delivers the sender as an @lid JID
// with the phone JID in participantAlt / remoteJidAlt).
function isOwnerSender(sock, m) {
    const candidates = [
        m.sender,
        m.key && m.key.participantAlt,
        m.key && m.key.remoteJidAlt,
        m.key && m.key.participant
    ].filter(Boolean).map(norm);
    const owners = Array.isArray(global.owners) ? global.owners.map(norm) : [];
    const botIds = [
        norm(sock.user && sock.user.id),
        norm(sock.user && sock.user.lid)
    ].filter(Boolean);
    return candidates.some(c => owners.includes(c) || botIds.includes(c));
}

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
