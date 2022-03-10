/* Codded by @phaticusthiccy  
Telegram: t.me/phaticusthiccy
*/

const Aqua = require('../events');
const { MessageType, Mimetype } = require('@adiwajshing/baileys');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const { execFile } = require('child_process');
const cwebp = require('cwebp-bin');
const Config = require('../config');
let workt = Config.WORKTYPE == 'public' ? false : true
const exec = require('child_process').exec;
const Language = require('../language');
const Lang = Language.getString('conventer');

const SIEDI_DESC = '🪄 ᴀǫᴜᴀʙᴏᴛ ᴇᴅɪᴛ ᴘᴀᴄᴋ 🪄\n\n🧧විධානය: .mp4enhance\n📜විස්තරය: වීඩියෝවේ ගුණාත්මකභාවය වැඩි දියුණු කරයි.\n\n🧧විධානය: .interp\n📜විස්තරය: වීඩියෝවේ FPS වැඩි කරයි.\n\n🧧විධානය: .mp4slowmo\n📜විස්තරය: මෙන්ශන් දුන් වීඩියෝව slow-motion වීඩියෝවක් ලෙස සාදනු ලබයි.\n\n🧧විධානය: .x4mp4\n📜විස්තරය: වීඩියෝවේ ගුණාත්මකභාවය 75% කින් අඩු කරයි.\n\n🧧විධානය: .x2mp4\n📜විස්තරය: වීඩියෝවේ ගුණාත්මකභාවය 50% කින් අඩු කරයි.\n\n🧧විධානය: .gif\n📜විස්තරය: වීඩියෝව gif බවට පරිවර්තනය කරයි.\n\n🧧විධානය: .agif\n📜විස්තරය: වීඩියෝව voiced gif බවට පරිවර්තනය කරයි.\n\n🧧විධානය: .mp4blur\n📜විස්තරය: වීඩියෝවේ පසුබිම බොඳ කරයි.\n\n🧧විධානය: .mp4stab\n📜විස්තරය: වීඩියෝවේ කම්පනය අඩු කරයි.\n\n🧧විධානය: .mp4rainbow\n📜විස්තරය: Rainbow effect වීඩියෝ පටයට යොදයි.\n\n🧧විධානය: .mp4color\n📜විස්තරය: වීඩියෝවේ වර්ණ වඩාත් විචිත්‍ර හා අලංකාර කරයි.\n\n🧧විධානය: .mp4art\n📜විස්තරය: වීඩියෝවට Art effect එක් කරයි.\n\n🧧විධානය: .mp4negative\n📜විස්තරය: වීඩියෝවට negative filter යොදයි.\n\n🧧විධානය:.mp4vintage\n📜විස්තරය: වීඩියෝවට vintage effect යොදයි.\n\n🧧විධානය: .mp4bw\n📜විස්තරය: වීඩියෝවට black and white effect යොදයි..\n\n🧧විධානය: .mp4reverse\n📜විස්තරය: වීඩියෝව reverse කරයි.\n\n🧧විධානය: .mp4edge\n📜විස්තරය: වීඩියෝවට edge effect යොදයි.\n\n🧧විධානය: .mp4image\n📜විස්තරය: ඡායාරූපය තත්පර 5 ක වීඩියෝවක් බවට පරිවර්තනය කරයි.\n\n🧧විධානය: .spectrum\n📜විස්තරය: ශබ්ද වල වර්ණාවලිය වීඩියෝ බවට පරිවර්තනය කරයි.\n\n🧧විධානය: .waves\n📜විස්තරය: ශබ්දයේ තරංග පරාසය වීඩියෝ බවට පරිවර්තනය කරයි.\n\n🧧විධානය: .frequency\n📜විස්තරය: ශබ්දයේ සංඛ්‍යාත පරාසය වීඩියෝ බවට පරිවර්තනය කරයි.\n\n🧧විධානය: .avec\n📜විස්තරය: ශබ්දයේ histogram , වීඩියෝ බවට පරිවර්තනය කරයි.\n\n🧧විධානය: .volumeaudio\n📜විස්තරය: ශබ්දයේ ඩෙසිබල් අගය වීඩියෝ බවට පරිවර්තනය කරයි.\n\n🧧විධානය: .cqtaudio\n📜විස්තරය: Audio හි CQT අගය වීඩියෝ පටයක් බවට පරිවර්තනය කරයි.\n\n🧧විධානය: .mp3eq\n📜විස්තරය: ශබ්දය පැහැදිලි මට්ටමකට සකසන්න.\n\n🧧විධානය: .mp3bass\n📜විස්තරය: ශබ්දයට හානි නොකර Bass වැඩි කරයි.\n\n🧧විධානය: .mp3crusher\n📜විස්තරය: ශබ්දය විකෘති කරයි, හාස්‍ය උපදවන ලෙස සකසයි.\n\n🧧විධානය: .mp3reverse\n📜විස්තරය: ශබ්දය පිටුපසට වාදනය කරයි.\n\n🧧විධානය: .mp3pitch\n📜විස්තරය: ශබ්දය තුනී හා වේගවත් කරයි.\n\n🧧විධානය: .mp3low\n📜විස්තරය: ශබ්දය ගැඹුරු හා මන්දගාමී කරයි.\n\n🧧විධානය: .x2mp3\n📜විස්තරය: ශබ්දය එය මෙන් දෙගුණයක් වේගවත් කරයි.\n\n🧧විධානය: .mp3volume\n📜විස්තරය: ශබ්දය වැඩි කරයි.\n\n🧧විධානය: .bwimage\n📜විස්තරය: රූපයට black and white effect යොදයි.\n\n🧧විධානය: .vintageimage\n📜විස්තරය: වීඩියෝ පටයට vintage effect යොදයි.\n\n🧧විධානය: .edgeimage\n📜විස්තරය: ඡායාරූපයට edge effect යොදයි.\n\n🧧විධානය: .enhanceimage\n📜විස්තරය: ඡායාරූපය වඩාත් පැහැදිලි කරයි.\n\n🧧විධානය: .blurimage\n📜විස්තරය: ඡායාරූපයේ පසුබිම බොඳ කරයි.\n\n🧧විධානය: .grenimage\n📜විස්තරය: ඡායාරූපයට grain effect යොදයි.\n\n🧧විධානය: .negativeimage\n📜විස්තරය: ඡායාරූපය සඳහා negative filter යොදයි.\n\n🧧විධානය: .rainbowimage\n📜විස්තරය: ඡායාරූපය සඳහා Rainbow effect යොදයි.\n\n🧧විධානය: .colorimage\n📜විස්තරය: එමඟින් ඡායාරූපයේ වර්ණ වඩාත් විචිත්‍ර හා ආකර්ෂණීය බවට පත් කරයි.\n\n🧧විධානය: .artimage\n📜විස්තරය: ඡායාරූපය සඳහා art effect යොදයි.'
const ENEDI_DESC = '🪄 ᴀǫᴜᴀʙᴏᴛ ᴇᴅɪᴛ ᴘᴀᴄᴋ 🪄\n\n🧧Command: *.mp4enhance*\n📜Description: Enhance video’s quality.\n\n🧧Command: *.interp*\n📜Description: Increases the FPS of the video.\n\n🧧Command: *.mp4slowmo*\n📜Description: Applies true-slowmo to non-slow motion videos.\n\n🧧Command: *.x4mp4*\n📜Description: Reduce video’s quality by 75%.\n\n🧧Command: *.x2mp4*\n📜Description: Reduce video’s quality by 50%.\n\n🧧Command: *.gif*\n📜Description:Converts video to gif.\n\n🧧Command: *.agif*\n📜Description: Converts video to voiced gif.\n\n🧧Command: *.mp4blur*\n📜Description: Blurs the background of the video.\n\n🧧Command: *.mp4stab*\n📜Description: Decreases the vibration of the video.\n\n🧧Command: *.mp4rainbow*\n📜Description: Applies a rainbow effect to video.\n\n🧧Command: *.mp4color*\n📜Description: Makes the colors of the video more vivid and beautiful.\n\n🧧Command: *.mp4art*\n📜Description: Applies a art effect to the video.\n\n🧧Command: *.mp4negative*\n📜Description: Applies a negative color filter to the video.\n\n🧧Command: *.mp4vintage*\n📜Description: Applies a nostalgic effect to video.\n\n🧧Command: *.mp4bw*\n📜Description: Applies a monochrome effect to video.\n\n🧧Command: *.mp4reverse*\n📜Description: Plays the video in reverse.\n\n🧧Command: *.mp4edge*\n📜Description: Applies a edge effect to the video.\n\n🧧Command: *.mp4image*\n📜Description: Converts photo to 5 sec video.\n\n🧧Command: *.spectrum*\n📜Description: Converts the spectrum of sound into video.\n\n🧧Command: *.waves*\n📜Description: Converts the wave range of sound to video.\n\n🧧Command: *.frequency*\n📜Description: Converts the frequency range of sound to video.\n\n🧧Command: *.avec*\n📜Description: Converts the histogram of sound to video.\n\n🧧Command: *.volumeaudio*\n📜Description: Converts the decibel value of the sound into video.\n\n🧧Command: *.cqtaudio*\n📜Description: Converts the CQT value of audio to video.\n\n🧧Command: *.mp3eq*\n📜Description: Adjusts the sound to a crystal clear level.\n\n🧧Command: *.mp3bass*\n📜Description: Increases bass without damaging the sound.\n\n🧧Command: *.mp3crusher*\n📜Description: Distorts the sound, makes ridiculous.\n\n🧧Command:*.mp3reverse*\n📜Description: Plays the sound in reverse.\n\n🧧Command: *.mp3pitch*\n📜Description: Makes the sound thinner and faster.\n\n🧧Command: *.mp3low*\n📜Description: Makes the sound deep and slower.\n\n🧧Command: *.x2mp3*\n📜Description: Makes the sound twice as fast.\n\n🧧Command: *.mp3volume*\n📜Description: Increase sound level so much.\n\n🧧Command: *.bwimage*\n📜Description: Applies a monochrome effect to image.\n\n🧧Command: *.vintageimage*\n📜Description: Applies a vinatge effect to video.\n\n🧧Command: *.edgeimage*\n📜Description: Applies a edge effect to the photo.\n\n🧧Command: *.enhanceimage*\n📜Description: Makes the photo clearer.\n\n🧧Command: *.blurimage*\n📜Description: Blurs the background of the photo.\n\n🧧Command: *.grenimage*\n📜Description: Applies grain effect to the photo.\n\n🧧Command: *.negativeimage*\n📜Description: Applies a negative color filter to the photo.\n\n🧧Command: *.rainbowimage*\n📜Description: Applies rainbow effect to the photo.\n\n🧧Command: *.colorimage*\n📜Description: It makes the colors of the photo more vivid and attractive.\n\n🧧Command: *.artimage*\n📜Description: Applies a art effect to the photo.'



    Aqua.addCommand({ pattern: 'editor$', fromMe: workt, desc: Lang.XMEDİA_DESC, deleteCommand: false }, (async (message, match) => {
        if (Config.LANG == 'SI' || Config.LANG == 'EN') {
            await message.client.sendMessage(message.jid, SIEDI_DESC, MessageType.text, { quoted: message.data });
        } else {
            await message.client.sendMessage(message.jid, ENEDI_DESC, MessageType.text, { quoted: message.data });
        }
    }));

    Aqua.addCommand({ pattern: 'x4mp4', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (!message.reply_message.video) return await message.sendMessage('*Need Video!*');
        var downloading = await message.client.sendMessage(message.jid, '```Editing..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .withSize('25%')
            .format('mp4')
            .save('output.mp4')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, { caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));
    Aqua.addCommand({ pattern: 'mp3bass$', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {
        if (message.reply_message === false) return await message.sendMessage('*Need Audio!*');
        var downloading = await message.client.sendMessage(message.jid, '```Editing..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-filter:a", "bass=g=9:f=110:w=0.6"])
            .save('output.mp3')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, ptt: false });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));
    Aqua.addCommand({ pattern: 'x2mp4', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (!message.reply_message.video) return await message.sendMessage('*Need Video!*');
        var downloading = await message.client.sendMessage(message.jid, '```Editing..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .withSize('50%')
            .format('mp4')
            .save('output.mp4')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, { caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'mp4image', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (!message.reply_message.image) return await message.sendMessage('*Need Photo!*');
        var downloading = await message.client.sendMessage(message.jid, '```Converting..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .loop(6)
            .fps(19)
            .videoBitrate(400)
            .format('mp4')
            .save('output.mp4')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, { mimetype: Mimetype.mpeg, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'spectrum', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (!message.reply_message) return await message.sendMessage('*Need Audio!*');
        var downloading = await message.client.sendMessage(message.jid, '```Converting..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-filter_complex", "[0:a]showspectrum=s=720x1280,format=yuv420p[v]", "-map", "[v]", "-map 0:a"])
            .save('output.mp4')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, { mimetype: Mimetype.mpeg, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'waves', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (!message.reply_message) return await message.sendMessage('*Need Audio!*');
        var downloading = await message.client.sendMessage(message.jid, '```Converting..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-filter_complex", "[0:a]showwaves=s=720x1280:mode=cline:rate=25,format=yuv420p[v]", "-map", "[v]", "-map 0:a"])
            .save('output.mp4')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, { mimetype: Mimetype.mpeg, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'frequency', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (!message.reply_message) return await message.sendMessage('*Need Audio!*');
        var downloading = await message.client.sendMessage(message.jid, '```Converting..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-filter_complex", "[0:a]showfreqs=s=720x1280:mode=cline:fscale=log,format=yuv420p[v]", "-map", "[v]", "-map 0:a"])
            .save('output.mp4')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, { mimetype: Mimetype.mpeg, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'avec', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (!message.reply_message) return await message.sendMessage('*Need Audio!*');
        var downloading = await message.client.sendMessage(message.jid, '```Converting..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-filter_complex", "[0:a]avectorscope=s=720x1280:rf=5:gf=25:bf=5:draw=line,format=yuv420p[v]", "-map", "[v]", "-map 0:a"])
            .save('output.mp4')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, { mimetype: Mimetype.mpeg, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'volumeaudio', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (!message.reply_message) return await message.sendMessage('*Need Audio!*');
        var downloading = await message.client.sendMessage(message.jid, '```Converting..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-filter_complex", "[0:a]showvolume=f=1:b=4:w=720:h=68,format=yuv420p[vid]", "-map", "[vid]", "-map 0:a"])
            .save('output.mp4')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, { mimetype: Mimetype.mpeg, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'cqtaudio', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (!message.reply_message) return await message.sendMessage('*Need Audio!*');
        var downloading = await message.client.sendMessage(message.jid, '```Converting..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-filter_complex", "[0:a]showcqt=s=1280x720,format=yuv420p[v]", "-map", "[v]", "-map 0:a"])
            .save('output.mp4')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, { mimetype: Mimetype.mpeg, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'mp3eq', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('*Need Audio!*');
        var downloading = await message.client.sendMessage(message.jid, '```Editing..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-af", "superequalizer=1b=10:2b=10:3b=1:4b=5:5b=7:6b=5:7b=2:8b=3:9b=4:10b=5:11b=6:12b=7:13b=8:14b=8:15b=9:16b=9:17b=10:18b=10[a];[a]loudnorm=I=-16:TP=-1.5:LRA=14", "-ar 48k"])
            .save('output.mp3')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, ptt: false });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'mp3crusher', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('*Need Audio!*');
        var downloading = await message.client.sendMessage(message.jid, '```Editing..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-filter_complex", "acrusher=level_in=8:level_out=18:bits=8:mode=log:aa=1"])
            .save('output.mp3')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, ptt: false , quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'mp3reverse', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('*Need Audio!*');
        var downloading = await message.client.sendMessage(message.jid, '```Converting..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-filter_complex", "areverse"])
            .save('output.mp3')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, ptt: false, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'mp4vintage', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('*Need Video!*');
        var downloading = await message.client.sendMessage(message.jid, '```Editing..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-vf", "curves=vintage,format=yuv420p"])
            .fps(22)
            .save('output.mp4')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, { mimetype: Mimetype.mpeg, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'mp4reverse', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('*Need Video!*');
        var downloading = await message.client.sendMessage(message.jid, '```Editing..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-vf", "reverse", "-af", "areverse"])
            .format('mp4')
            .fps(22)
            .save('output.mp4')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, { mimetype: Mimetype.mpeg, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'mp4bw', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('*Need Video!*');
        var downloading = await message.client.sendMessage(message.jid, '```Editing..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-vf", "hue=s=0"])
            .format('mp4')
            .save('output.mp4')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, { mimetype: Mimetype.mpeg, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'bwimage', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('*Need Photo!*');
        var downloading = await message.client.sendMessage(message.jid, '```Editing..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-vf", "hue=s=0"])
            .save('output.jpg')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.jpg'), MessageType.image, { mimetype: Mimetype.jpg, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'vintageimage', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('*Need Photo!*');
        var downloading = await message.client.sendMessage(message.jid, '```Editing..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-vf", "curves=vintage"])
            .save('output.jpg')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.jpg'), MessageType.image, { mimetype: Mimetype.jpg, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'mp4enhance', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('*Need Video!*');
        var downloading = await message.client.sendMessage(message.jid, '```Editing..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-vf", "unsharp=3:3:1.5"])
            .format('mp4')
            .save('output.mp4')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, { mimetype: Mimetype.mpeg, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'blurimage', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('*Need Photo!*');
        var downloading = await message.client.sendMessage(message.jid, '```Converting..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-vf", "split[original][copy];[copy]scale=ih*16/9:-1,crop=h=iw*9/16,gblur=sigma=20[blurred];[blurred][original]overlay=(main_w-overlay_w)/2:(main_h-overlay_h)/2"])
            .save('output.jpg')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.jpg'), MessageType.image, { mimetype: Mimetype.jpg, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'mp4blur', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('*Need Audio!*');
        var downloading = await message.client.sendMessage(message.jid, '```Editing..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-vf", "split[original][copy];[copy]scale=ih*16/9:-1,crop=h=iw*9/16,gblur=sigma=20[blurred];[blurred][original]overlay=(main_w-overlay_w)/2:(main_h-overlay_h)/2"])
            .save('output.mp4')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, { mimetype: Mimetype.mpeg, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'mp3pitch', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('*Need Audio!*');
        var downloading = await message.client.sendMessage(message.jid, '```Editing..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-af", "asetrate=44100*1.3"])
            .save('output.mp3')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, ptt: false, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'mp4edge', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('*Need Video!*');
        var downloading = await message.client.sendMessage(message.jid, '```Edging Video..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-codec:v", "mpeg4", "-filter:v", "edgedetect=low=0.9:high=0.3"])
            .format('mp4')
            .save('output.mp4')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, { mimetype: Mimetype.mpeg, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'mp3low', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('*Need Audio!*');
        var downloading = await message.client.sendMessage(message.jid, '```Editing..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-af", "asetrate=44100*0.9"])
            .save('output.mp3')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, ptt: false, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'x2mp3', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('*Need Audio!*');
        var downloading = await message.client.sendMessage(message.jid, '```Editing..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-filter:a", "atempo=2.0", "-vn"])
            .save('output.mp3')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, ptt: false, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'edgeimage', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('*Need Photo*');
        var downloading = await message.client.sendMessage(message.jid, '```Edging Image..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-filter:v", "edgedetect=low=0.9:high=0.2"])
            .save('output.jpg')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.jpg'), MessageType.image, { mimetype: Mimetype.jpg, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'enhanceimage', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('*Need Photo!*');
        var downloading = await message.client.sendMessage(message.jid, '```Converting..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-vf", "unsharp=3:3:1.5"])
            .save('output.jpg')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.jpg'), MessageType.image, { mimetype: Mimetype.jpg, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'mp3volume', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('*Need Audio!*');
        var downloading = await message.client.sendMessage(message.jid, '```Editing..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-filter:a", "volume=5.3"])
            .save('output.mp3')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, ptt: false });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'gif', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('Need Video!');
        var downloading = await message.client.sendMessage(message.jid, '```Converting to Gif..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .noAudio()
            .fps(13)
            .videoBitrate(500)
            .save('output_gif.mp4')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output_gif.mp4'), MessageType.video, { mimetype: Mimetype.gif, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'agif', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('Need Video!');
        var downloading = await message.client.sendMessage(message.jid, '```Converting to Gif..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .fps(13)
            .videoBitrate(500)
            .save('output_gif.mp4')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output_gif.mp4'), MessageType.video, { mimetype: Mimetype.gif, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'grenimage', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('Need Photo!');
        var downloading = await message.client.sendMessage(message.jid, '```Adding Gren..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .videoFilters('noise=alls=100:allf=t+u')
            .save('output.jpg')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.jpg'), MessageType.image, { mimetype: Mimetype.jpg, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'interp ?(.*)', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {
        if (message.reply_message === false && match[1] === '') return await message.sendMessage('*Need Video and FPS Value!*\nEx: ```.interp 100```');
        if (match[1] <= 10) return await message.sendMessage('*Low FPS Value ⚠️*\n*Please, type over 10*');
        if (match[1] >= 500) return await message.sendMessage('*High FPS Value ⚠️*\n*Please, type under 500*');
        await message.client.sendMessage(message.jid, '```Interpolating..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        exec('ffprobe -hide_banner -loglevel fatal -show_error -show_format -show_streams -show_programs -show_chapters -show_private_data -print_format json ' + location, async (err, st, stderr) => {
            var stdout = JSON.parse(st)
            var value = { value: 100 }
            var time_c = { time: 1 }
            if (stdout.format.size / 1000000 > 0 && stdout.format.size / 1000000 < 6) {
                value.value = value.value - 2
                time_c.time = time_c.time + 1
            }
            if (stdout.format.size / 1000000 > 5 && stdout.format.size / 1000000 < 11) {
                value.value = value.value - 5
                time_c.time = time_c.time + 1.4
            }
            if (stdout.format.size / 1000000 > 10 && stdout.format.size / 1000000 < 21) {
                value.value = value.value - 9
                time_c.time = time_c.time + 2
            }
            if (stdout.format.size / 1000000 > 20 && stdout.format.size / 1000000 < 31) {
                value.value = value.value - 25
                time_c.time = time_c.time + 2.3
            }
            if (stdout.format.size / 1000000 > 30) {
                value.value = value.value - 39
                time_c.time = time_c.time + 9
            }
            if (stdout.streams[0].duration > 0 && stdout.streams[0].duration < 21) {
                value.value = value.value - 4
                time_c.time = time_c.time + 1
            }
            if (stdout.streams[0].duration > 20 && stdout.streams[0].duration < 41) {
                value.value = value.value - 9
                time_c.time = time_c.time + 1.4
            }
            if (stdout.streams[0].duration > 40 && stdout.streams[0].duration < 61) {
                value.value = value.value - 11
                time_c.time = time_c.time + 2
            }
            if (stdout.streams[0].duration > 60 && stdout.streams[0].duration < 81) {
                value.value = value.value - 15
                time_c.time = time_c.time + 2.7
            }
            if (stdout.streams[0].duration > 80 && stdout.streams[0].duration < 101) {
                value.value = value.value - 21
                time_c.time = time_c.time + 3.4
            }
            if (stdout.streams[0].duration > 100 && stdout.streams[0].duration < 121) {
                value.value = value.value - 27
                time_c.time = time_c.time + 4
            }
            if (stdout.streams[0].duration > 120) {
                value.value = value.value - 39
                time_c.time = time_c.time + 9
            }
            if (stdout.streams[0].r_frame_rate.split('/')[0] > 0 && stdout.streams[0].r_frame_rate.split('/')[0] < 11) {
                value.value = value.value + 1
                time_c.time = time_c.time - 0.6
            }
            if (stdout.streams[0].r_frame_rate.split('/')[0] > 10 && stdout.streams[0].r_frame_rate.split('/')[0] < 21) {
                value.value = value.value - 3
                time_c.time = time_c.time + 1
            }
            if (stdout.streams[0].r_frame_rate.split('/')[0] > 20 && stdout.streams[0].r_frame_rate.split('/')[0] < 31) {
                value.value = value.value - 19
                time_c.time = time_c.time + 2.3
            }
            if (stdout.streams[0].r_frame_rate.split('/')[0] > 30 && stdout.streams[0].r_frame_rate.split('/')[0] < 41) {
                value.value = value.value - 31
                time_c.time = time_c.time + 4.3
            }
            if (stdout.streams[0].r_frame_rate.split('/')[0] > 40) {
                value.value = value.value - 40
                time_c.time = time_c.time + 9
            }
            if (stdout.streams[0].r_frame_rate.split('/')[0] > 9 && stdout.streams[0].r_frame_rate.split('/')[0] < 31 && match[1] > 39) {
                time_c.time = time_c.time + 3.3
            }
            if (stdout.streams[0].r_frame_rate.split('/')[0] > 30 && stdout.streams[0].r_frame_rate.split('/')[0] < 41 && match[1] > 39) {
                time_c.time = time_c.time + 5
            }
            if (stdout.streams[0].r_frame_rate.split('/')[0] > 30 && stdout.streams[0].r_frame_rate.split('/')[0] < 41 && match[1] > 49) {
                time_c.time = time_c.time + 5.4
            }
            if (stdout.streams[0].r_frame_rate.split('/')[0] > 30 && stdout.streams[0].r_frame_rate.split('/')[0] < 41 && match[1] > 59) {
                time_c.time = time_c.time + 6
            }
            if (stdout.streams[0].r_frame_rate.split('/')[0] > 30 && stdout.streams[0].r_frame_rate.split('/')[0] < 41 && match[1] > 69) {
                time_c.time = time_c.time + 7.5
            }
            if (stdout.streams[0].r_frame_rate.split('/')[0] > 40 && stdout.streams[0].r_frame_rate.split('/')[0] < 61 && match[1] > 59) {
                time_c.time = time_c.time + 9
            }
            if (stdout.streams[0].r_frame_rate.split('/')[0] > 40 && stdout.streams[0].r_frame_rate.split('/')[0] < 61 && match[1] > 64) {
                time_c.time = time_c.time + 9.2
            }
            if (stdout.streams[0].r_frame_rate.split('/')[0] > 40 && stdout.streams[0].r_frame_rate.split('/')[0] < 61 && match[1] > 69) {
                time_c.time = time_c.time + 9.5
            }
            if (stdout.streams[0].r_frame_rate.split('/')[0] > 40 && stdout.streams[0].r_frame_rate.split('/')[0] < 61 && match[1] > 75) {
                time_c.time = time_c.time + 10
            }
            let prcs = Config.LANG == 'SI' || Config.LANG == 'EN' ? '_මෙම ක්‍රියාවලියට යම් කාලයක් ගත විය හැකිය._\n_අපේක්ෂිත කාලය:_ *' + time_c.time + ' විනාඩි*\n_සාර්ථකත්ව අනුපාතය:_ *' + value.value + '%*' : '_This process may take a while._\n_Envisaged Time:_ *' + time_c.time + ' Minute*\n_Success Rate:_ *' + value.value + '%*'
            await message.client.sendMessage(message.jid, prcs, MessageType.text);
            var dam = 10
            ffmpeg(location)
                .videoFilters(`minterpolate=fps=${match[1]}:mi_mode=mci:me_mode=bidir`)
                .format('mp4')
                .save('output.mp4')
                .on('progress', async (progress) => {
                    var l = progress.percent
                    while (l > 10 && dam == 10) {
                        dam = 1
                        let yon = Config.LANG == 'SI' || Config.LANG == 'EN' ? '*%10 සම්පූර්ණ කළා!*' : '*Completed %10!*'
                        await message.client.sendMessage(message.jid, yon, MessageType.text)

                    }

                    while (l > 30 && dam == 1) {
                        dam = 2
                        let yotuz = Config.LANG == 'SI' || Config.LANG == 'EN' ? '*%30 සම්පූර්ණ කළා*' : '*Completed %30!*'
                        await message.client.sendMessage(message.jid, yotuz, MessageType.text)

                    }

                    while (l > 50 && dam == 2) {
                        dam = 3
                        let yelli = Config.LANG == 'SI' || Config.LANG == 'EN' ? '*%50 සම්පූර්ණ කළා*' : '*Completed %50!*'
                        await message.client.sendMessage(message.jid, yelli, MessageType.text)

                    }

                    while (l > 70 && dam == 3) {
                        dam = 4
                        let yetmis = Config.LANG == 'SI' || Config.LANG == 'EN' ? '*%70 සම්පූර්ණ කළා*' : '*Completed %70!*'
                        await message.client.sendMessage(message.jid, yetmis, MessageType.text)

                    }

                    while (l > 90 && dam == 4) {
                        dam = 5
                        let vprocc = Config.LANG == 'SI' || Config.LANG == 'EN' ? '*වීඩියෝව සකස් කිරීම..*' : '*Preparing Video..*'
                        await message.client.sendMessage(message.jid, vprocc, MessageType.text)

                    }
                })
                .on('end', async () => {
                    dam = 10
                    await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, { caption: Config.CAPTION, quoted: message.data });
                });
        });
    }));

    Aqua.addCommand({ pattern: 'rainbowimage', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('*Need Photo!*');
        var downloading = await message.client.sendMessage(message.jid, '```Editing..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-vf", "geq=r='X/W*r(X,Y)':g='(1-X/W)*g(X,Y)':b='(H-Y)/H*b(X,Y)"])
            .videoFilters('eq=brightness=0.5')
            .save('output.jpg')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.jpg'), MessageType.image, { mimetype: Mimetype.jpg, caption: Config.CAPTION, quoted: message.data  });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'mp4rainbow', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('*Need Video!*');
        var downloading = await message.client.sendMessage(message.jid, '```Editing..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-vf", "geq=r='X/W*r(X,Y)':g='(1-X/W)*g(X,Y)':b='(H-Y)/H*b(X,Y)", "-pix_fmt yuv420p"])
            .videoFilters('eq=brightness=0.5')
            .save('output.mp4')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, { mimetype: Mimetype.mpeg, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'negativeimage', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('*Need Photo!*');
        var downloading = await message.client.sendMessage(message.jid, '```Editing..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-vf", "curves=color_negative"])
            .save('output.jpg')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.jpg'), MessageType.image, { mimetype: Mimetype.jpg, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'mp4negative', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('*Need Video!*');
        var downloading = await message.client.sendMessage(message.jid, '```Editing..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-vf", "curves=color_negative,format=yuv420p"])
            .format('mp4')
            .save('output.mp4')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, { mimetype: Mimetype.mpeg, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'mp4art', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('*Need Video!*');
        var downloading = await message.client.sendMessage(message.jid, '```Editing..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-vf", "convolution=-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2,format=yuv420p"])
            .format('mp4')
            .save('output.mp4')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, { mimetype: Mimetype.mpeg, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'artimage', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('*Need Video!*');
        var downloading = await message.client.sendMessage(message.jid, '```Editing..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-vf", "convolution=-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2"])
            .save('output.jpg')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.jpg'), MessageType.image, { mimetype: Mimetype.jpg, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'mp4stab', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('*Need Video!*');
        var downloading = await message.client.sendMessage(message.jid, '```Editing..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-vf", "deshake,format=yuv420p"])
            .format('mp4')
            .save('output.mp4')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, { mimetype: Mimetype.mpeg, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'mp4color', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('*Need Video!*');
        var downloading = await message.client.sendMessage(message.jid, '```Editing..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-vf", "eq=contrast=1.3:saturation=1.5:brightness=-0.1,format=yuv420p"])
            .format('mp4')
            .save('output.mp4')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.mp4'), MessageType.video, { mimetype: Mimetype.mpeg, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'colorimage', fromMe: workt, dontAddCommandList: true, deleteCommand: false }, (async (message, match) => {

        if (message.reply_message === false) return await message.sendMessage('*Need Photo!*');
        var downloading = await message.client.sendMessage(message.jid, '```Editing..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .outputOptions(["-y", "-vf", "eq=contrast=1.3:saturation=1.5:brightness=-0.1"])
            .save('output.jpg')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('output.jpg'), MessageType.image, { mimetype: Mimetype.jpg, caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));

    Aqua.addCommand({ pattern: 'mp4slowmo', fromMe: workt, dontAddCommandList: true , deleteCommand: false}, (async (message, match) => {

        if (!message.reply_message.video) return await message.sendMessage('*Need Video!*');
        var downloading = await message.client.sendMessage(message.jid, '```Motion Render Interpolating..```', MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        await message.client.sendMessage(message.jid, '_This process may take a while.._', MessageType.text);

        ffmpeg(location)
            .videoFilters('minterpolate=fps=120')
            .videoFilters('setpts=4*PTS')
            .noAudio()
            .format('mp4')
            .save('slowmo.mp4')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('slowmo.mp4'), MessageType.video, { caption: Config.CAPTION, quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, { id: downloading.key.id, remoteJid: message.jid, fromMe: true })
    }));
