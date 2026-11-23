module.exports = {
    name: 'mention-owner',
    description: 'Auto reply + react when owner is tagged in a group',
    async execute() { },
    async onMessage(sock, m) {
        try {
            const text = m.body || m.text || m.message?.extendedTextMessage?.text || '';
            const owners = ['923448104519'];
            const isOwnerTagged = owners.some(owner => text.includes(`@${owner}`));
            if (!isOwnerTagged) return;
            const audioUrl = 'https://files.catbox.moe/n82azy.mp3';
            const audioResponse = await fetch(audioUrl);
            const audioBuffer = await audioResponse.arrayBuffer();
            const fakeQuoted = {
                key: {
                    remoteJid: m.from,
                    fromMe: false,
                    participant: m.sender,
                    id: 'fakeid123'
                },
                message: {
                    contactMessage: {
                        displayName: '923448104519 OWNER WAS TAGGED',
                        vcard: `BEGIN:VCARD
VERSION:3.0
N:923448104519;;;;
FN:923448104519
item1.TEL;waid=923448104519:+923448104519
item1.X-ABLabel:Mobile
END:VCARD`
                    }
                }
            };
            await sock.sendMessage(m.from, {
                audio: Buffer.from(audioBuffer),
                mimetype: 'audio/mp4',
                ptt: false
            }, { quoted: fakeQuoted });
            await m.react('👑');
        } catch (err) {
            console.error('Mention-owner plugin error:', err);
        }
    }
};
