// Persistent self-mode flag for the .self command (survives bot restarts).
// Stored in selfmode.json next to index.js. Default is OFF (safe: never
// risk locking the owner out if the file is lost).
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'selfmode.json');

function read() {
    try {
        const raw = fs.readFileSync(FILE, 'utf8');
        const data = JSON.parse(raw);
        return data.selfMode === true;
    } catch (e) {
        return false;
    }
}

function write(value) {
    try {
        fs.writeFileSync(FILE, JSON.stringify({ selfMode: !!value }), 'utf8');
    } catch (e) {
        console.error('selfmode write error:', e.message);
    }
}

module.exports = {
    isSelfMode: () => read(),
    setSelfMode: (v) => write(v)
};
