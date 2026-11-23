const fs = require("fs");
const { tmpdir } = require("os");
const path = require("path");
const Crypto = require("crypto");
const ffmpeg = require("fluent-ffmpeg");
const fetch = require('node-fetch');
const { addStickerMetadata } = require("../lib/sticker");

function tempFile(ext) {
    return path.join(
        tmpdir(),
        `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}${ext}`
    );
}

function cleanupFiles(...files) {
    for (const file of files) {
        try {
            if (fs.existsSync(file)) fs.unlinkSync(file);
        } catch {}
    }
}

function convertImageToWebp(buffer) {
    const input = tempFile(".input");
    const output = tempFile(".webp");

    return new Promise((resolve, reject) => {
        try {
            fs.writeFileSync(input, buffer);

            ffmpeg(input)
                .outputOptions([
                    "-vcodec libwebp",
                    "-pix_fmt yuva420p",
                    "-lossless 0",
                    "-compression_level 6",
                    "-vf scale=512:512:force_original_aspect_ratio=decrease:flags=lanczos,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=black@0,format=yuva420p"
                ])
                .toFormat("webp")
                .on("end", () => {
                    try {
                        resolve(fs.readFileSync(output));
                    } catch (error) {
                        reject(error);
                    } finally {
                        cleanupFiles(input, output);
                    }
                })
                .on("error", error => {
                    cleanupFiles(input, output);
                    reject(error);
                })
                .save(output);
        } catch (error) {
            cleanupFiles(input, output);
            reject(error);
        }
    });
}

module.exports = {
    name: 'animsticker',
    aliases: ['asticker', 'agirl'],
    description: 'Sends a random anime girl as a sticker',

    async execute(sock, m, args) {
        try {
            await m.react('💖');

            const category = (args[0] || 'waifu').toLowerCase();
            const allowed = ['waifu', 'neko', 'kitsune'];
            const pick = allowed.includes(category) ? category : 'waifu';

            const res = await fetch(`https://nekos.best/api/v2/${pick}`);
            if (!res.ok) throw new Error(`API responded with status: ${res.status}`);
            const data = await res.json();
            if (!data.results || !data.results.length) throw new Error('No image found in API response.');
            const imageUrl = data.results[0].url;

            const imgRes = await fetch(imageUrl);
            if (!imgRes.ok) throw new Error('Failed to download image.');
            const imgBuffer = Buffer.from(await imgRes.arrayBuffer());

            const webpBuffer = await convertImageToWebp(imgBuffer);
            const sticker = await addStickerMetadata(webpBuffer, 'Cockroach Anime', 'cockroach');

            await sock.sendMessage(m.from, { sticker: sticker || webpBuffer }, { quoted: m });
        } catch (err) {
            console.error('❌ Error fetching anime sticker:', err);
            await m.reply('❌ Anime sticker nahi ban saka. Dobara try karo.');
        }
    }
};
