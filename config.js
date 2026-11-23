//incase you guys read this i found issue why bot stop working after linking with session id  i will fix soon
require('dotenv').config();
global.sessionid = process.env.SESSION_ID || '';
global.BOT_PREFIX = '.';
global.owners = ['923448104519@s.whatsapp.net'];
global.dev = ['923448104519@s.whatsapp.net'];
global.menuImage = 'https://cockroach-daily-tools.vercel.app/assets/cockroach-avatar.jpg';
global.ownerName = 'cockroach';
