// Shared owner check for plugins. Handles device suffixes
// (9234...:12@s.whatsapp.net) and LID senders (WhatsApp sometimes
// delivers the sender as an @lid JID with the phone JID in
// participantAlt / remoteJidAlt). Use everywhere instead of
// global.owners.includes(m.sender), which silently fails on both.
function norm(jid = '') {
    return String(jid).split(':')[0];
}

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

module.exports = { isOwnerSender };
