const Aqua = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const exec = require('child_process').exec;
const os = require("os");
const fs = require('fs');
const Config = require('../config')
const Language = require('../language');
const Lang = Language.getString('evaluators');
const SLang = Language.getString('conventer');
const NLang = Language.getString('scrapers');
const googleTTS = require('google-translate-tts');
const Heroku = require('heroku-client');
const heroku = new Heroku({
    token: Config.HEROKU.API_KEY
});
let baseURI = '/apps/' + Config.HEROKU.APP_NAME;

var dd = ''
var errmsg = ''
if (Config.LANG == 'SI') dd = 'එය Server එක තුළ ශ්‍රව්‍ය, දෘශ්‍ය හා ඡායාරූප ගබඩා කරනු ලබයි.', errmsg = '*ඔබ සොයන ෆයිල් එක Server එක තුළ නොමැත!*'
if (Config.LANG == 'EN') dd = 'Prints the inside of the file on the server.', errmsg = '*The file you are looking for is not available on the server!*'

Aqua.addCommand({pattern: 'print ?(.*)', fromMe: true, desc: dd, deleteCommand: false}, (async (message, match) => {    
    exec('cat ' + match[1], async (err, stdout, stderr) => {
        if (err) {
            return await message.client.sendMessage(message.jid,errmsg, MessageType.text)
        }
        await message.client.sendMessage(message.jid, `Root ~# ${match[1]} \n\n` + stdout, MessageType.text)
    });
}));
var bdesc = ''
var berr = ''
var need_way = ''
if (Config.LANG == 'SI') bdesc = 'එය Server එක තුළ ශ්‍රව්‍ය, දෘශ්‍ය හා ඡායාරූප ගබඩා කරයි.', berr = '*ඔබ සොයන ෆයිල් එක Server එක තුළ නොමැත!*', need_way = '*Dosya Yolu Girmen Gerekiyor!*'
if (Config.LANG == 'EN') bdesc = 'Sends audio, video and photos inside the server.', berr = '*The file you are looking for is not available on the server!*', need_way = '*File Path Required!*'
let wk_q = Config.WORKTYPE == 'public' ? false : true
Aqua.addCommand({pattern: 'bashmedia ?(.*)', fromMe: wk_q, desc: bdesc, usage: 'video.mp4 && media/gif/pic.mp4', deleteCommand: false}, (async (message, match) => {
    var id = message.jid
    try {
        if (match[1].includes('jpg') || match[1].includes('tiff') || match[1].includes('raw') || match[1].includes('dng') || match[1].includes('png') || match[1].includes('jpeg')) {
            await message.client.sendMessage(id, fs.readFileSync(`/root/WhatsAsenaDuplicated/${match[1]}`), MessageType.image, { caption: Config.CAPTION })
        }
        else if (match[1].includes('mp4') || match[1].includes('avi') || match[1].includes('webm') || match[1].includes('mkv') || match[1].includes('mpeg')) {
            await message.client.sendMessage(id, fs.readFileSync(`/root/WhatsAsenaDuplicated/${match[1]}`), MessageType.video, { caption: Config.CAPTION });
        }
        else if (match[1].includes('mp3') || match[1].includes('waw') || match[1].includes('flac') || match[1].includes('weba') || match[1].includes('ogg') || match[1].includes('m4a')) {
            await message.client.sendMessage(id,fs.readFileSync(`/root/WhatsAsenaDuplicated/${match[1]}`), MessageType.audio);
        }
        else {
            await message.client.sendMessage(id,need_way, MessageType.text)
        }
    } catch (err) {
        await message.client.sendMessage(id,berr, MessageType.text)
    }
}));
let wk_ad = Config.WORKTYPE == 'public' ? false : true
var addsdesc = ''
var rep_add = ''
var suc_add = ''
if (Config.LANG == 'SI') addsdesc = 'Server එකට රූප, ශ්‍රව්‍ය හෝ වීඩියෝ upload කරයි.', rep_add = '*ඕනෑම රූප, ශ්‍රව්‍ය හෝ වීඩියෝ පණිවිඩයක් මෙන්ශන් කරන්න!*', suc_add = '*Server එකට මාධ්‍ය එකතු කරන ලදි! ✅*'
if (Config.LANG == 'EN') addsdesc = 'Uploads image, audio or video to the server.', rep_add = '*Reply to Any Media Message!*', suc_add = '*Media Added to Server! ✅*'

Aqua.addCommand({pattern: 'addserver$', fromMe: wk_ad, desc: addsdesc, deleteCommand: false}, (async (message, match) => {
    if (message.reply_message.image) {
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });
        var fin = location.split('.')[1]
        exec('mv ' + location + ' /root/WhatsAsenaDuplicated/server-image.' + fin)
        await message.client.sendMessage(message.jid,suc_add, MessageType.text)
    }
    else if (message.reply_message.video) {
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
            
        });
        var fin = location.split('.')[1]
        exec('mv ' + location + ' /root/WhatsAsenaDuplicated/server-video.' + fin)
        await message.client.sendMessage(message.jid,suc_add, MessageType.text)
    }
    else if (message.reply_message.audio) {
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
            
        });
        var fin = location.split('.')[1]
        exec('mv ' + location + ' /root/WhatsAsenaDuplicated/server-audio.' + fin)
        await message.client.sendMessage(message.jid,suc_add, MessageType.text)
    }
    else { await message.client.sendMessage(message.jid,rep_add, MessageType.text)
    }
}));
async function checkUsAdmin(message, user = message.data.participant) {
    var grup = await message.client.groupMetadata(message.jid);
    var sonuc = grup['participants'].map((member) => {     
        if (member.jid.split("@")[0] == user.split("@")[0] && member.isAdmin) return true; else; return false;
    });
    return sonuc.includes(true);
}
async function checkImAdmin(message, user = message.client.user.jid) {
    var grup = await message.client.groupMetadata(message.jid);
    var sonuc = grup['participants'].map((member) => {     
        if (member.jid.split("@")[0] == user.split("@")[0] && member.isAdmin) return true; else; return false;
    });
    return sonuc.includes(true);
}
var antilink_var = ''
async function antlch() {
    await heroku.get(baseURI + '/config-vars').then(async (vars) => {
        antilink_var = vars.ANTİ_LİNK
    });
}
antlch()
var ldc = ''
if (Config.LANG == 'SI') ldc = '*Link එකක් සමුවුණා!*'
if (Config.LANG == 'EN') ldc = '*Link Detected!*'
Aqua.addCommand({on: 'text', fromMe: false, deleteCommand: false, deleteCommand: false}, (async (message, match) => {
    if (antilink_var == 'true' && message.jid !== '905511384572-1616356915@g.us') {
        let regex1 = new RegExp('chat.whatsapp.com')
        let regex2 = new RegExp('https://wa.me')
        if (regex1.test(message.message)) {
            var us = await checkUsAdmin(message)
            var im = await checkImAdmin(message)
            if (!im) return;
            if (us) return;
            await message.client.groupRemove(message.jid, [message.data.participant]);         
            await message.client.sendMessage(message.jid,ldc, MessageType.text, {quoted: message.data })
        } 
        else if (regex2.test(message.message)) {
            var us = await checkUsAdmin(message)
            var im = await checkImAdmin(message)
            if (!im) return;
            if (us) return;
            await message.client.groupRemove(message.jid, [message.data.participant]);         
            await message.client.sendMessage(message.jid,ldc, MessageType.text, {quoted: message.data })
        }
      
    }
}));
Aqua.addCommand({pattern: 'term ?(.*)', fromMe: true, desc: Lang.TERM_DESC}, (async (message, match) => {
    var user = message.client.user.name
    var id = message.jid
    if (match[1] === '') return await message.client.sendMessage(id,Lang.GIVE_ME_CODE,MessageType.text);

    exec(match[1], async (err, stdout, stderr) => {
        if (err) {
            return await message.client.sendMessage(id,'```' + user + ':~# ' + match[1] + '\n' + err + '```',MessageType.text);
        }
        
        return await message.client.sendMessage(id,'```' + user + ':~# ' + match[1] + '\n' + stdout + '```',MessageType.text);
      });
}));
let wk = Config.WORKTYPE == 'public' ? false : true
var medinfo = ''
if (Config.LANG == 'SI') medinfo = 'මෙන්ශන් දුන් වීඩියෝ පටයේ තාක්ෂණික තොරතුරු පෙන්වයි.'
if (Config.LANG == 'EN') medinfo = 'Shows the technical information of the replied video.'

Aqua.addCommand({pattern: 'mediainfo$', fromMe: wk, desc: medinfo, deleteCommand: false}, (async (message, match) => {
    var id = message.jid
    if (message.reply_message.video) {
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage           
        });
        exec('mv ' + location + ' /root/WhatsAsenaDuplicated/vid.mp4')
        exec('ffprobe -hide_banner -loglevel fatal -show_error -show_format -show_streams -show_programs -show_chapters -show_private_data -print_format json /root/WhatsAsenaDuplicated/vid.mp4', async (err, st, stderr) => {
            if (err) {
                return await message.client.sendMessage(id,'*Error:* \n\n' + err,MessageType.text);
            }
            var stdout = JSON.parse(st)
            let
                vsize = Config.LANG == 'SI' || Config.LANG == 'EN' ? '*වීඩියෝවේ විශාලත්වය:* ' : '*Video Size:* '
                vlength = Config.LANG == 'SI' || Config.LANG == 'EN' ? '\n*වීඩියෝවේ දිග:* ' : '\n*Video Length:* '
                second = Config.LANG == 'SI' || Config.LANG == 'EN' ? ' තත්පර' : ' Second'
                vrvalue = Config.LANG == 'SI' || Config.LANG == 'EN' ? '\n*වීඩියෝවේ Resolution දක්වයි:* ' : '\n*Video Resolution Value:* '
                vpvalue = Config.LANG == 'SI' || Config.LANG == 'EN' ? '\n*වීඩියෝවේ Pixel අගය දක්වයි:* ' : '\n*Video Pixel Value:* '
                vpformat = Config.LANG == 'SI' || Config.LANG == 'EN' ? '\n*වීඩියෝවේ පික්සල් ආකෘතිය දක්වයි:* ' : '\n*Video Pixel Format:* '
                vcprofile = Config.LANG == 'SI' || Config.LANG == 'EN' ? '\n*වීඩියෝවේ Codec Profile දක්වයි:* ' : '\n*Video Codec Profile:* '
                vctag = Config.LANG == 'SI' || Config.LANG == 'EN' ? '\n*වීඩියෝවේ Codec Tag දක්වයි:* ' : '\n*Video Codec Tag:* '
                srvalue = Config.LANG == 'SI' || Config.LANG == 'EN' ? '\n*උදාහරණ Aspect Ratio :* ' : '\n*Example Aspect Ratio:* '
                vrvalue = Config.LANG == 'SI' || Config.LANG == 'EN' ? '\n*බැලිය හැකි Aspect Ratio:* ' : '\n*Viewable Aspect Ratio:* '
                vfps = Config.LANG == 'SI' || Config.LANG == 'EN' ? '\n*වීඩිඕ පටයේ FPS අගය:* ' : '\n*Video FPS Value:* '
                vavgfps = Config.LANG == 'SI' || Config.LANG == 'EN' ? '\n*වීඩියෝ පටයේ සමාන්‍ය FPS අගය:* ' : '\n*Video Average FPS Value:* '
                sctip = Config.LANG == 'SI' || Config.LANG == 'EN' ? '\n*Audio Codec Type එක පෙන්වයි:* ' : '\n*Audio Codec Type:* '
                sctag = Config.LANG == 'SI' || Config.LANG == 'EN' ? '\n*Audio Codec Tag එක පෙන්වයි:* ' : '\n*Audio Codec Tag:* '
                shzvalue = Config.LANG == 'SI' || Config.LANG == 'EN' ? '\n*Audio KHz Rate එක දක්වයි:* ' : '\n*Audio KHz Rate:* '
                schannel = Config.LANG == 'SI' || Config.LANG == 'EN' ? '\n*Audio Channels දක්වයි:* ' : '\n*Audio Channels:* '
                schome = Config.LANG == 'SI' || Config.LANG == 'EN' ? '\n*Audio Channel Layout එක දක්වයි:* ' : '\n*Audio Channel Layout:* '
            var msgi = vsize + stdout.format.size / 1000000 + 'MB' + vlength + stdout.streams[0].duration + second + vrvalue + stdout.streams[0].width + 'p' + vpvalue + stdout.streams[0].width + 'x' + stdout.streams[0].height + vpformat + stdout.streams[0].pix_fmt + vcprofile + stdout.streams[0].codec_name + vctag + stdout.streams[0].codec_tag_string + srvalue + stdout.streams[0].sample_aspect_ratio + vrvalue + stdout.streams[0].display_aspect_ratio + vfps + stdout.streams[0].r_frame_rate.split('/')[0] + vavgfps + stdout.streams[0].avg_frame_rate.split('/')[0] + sctip + stdout.streams[1].codec_name + sctag + stdout.streams[1].codec_tag_string + shzvalue + stdout.streams[1].sample_rate + schannel + stdout.streams[1].channels + schome + stdout.streams[1].channel_layout            
            return await message.client.sendMessage(id,msgi,MessageType.text);
        });
    } else { return await message.client.sendMessage(id,SLang.MP4TOAUDİO_NEEDREPLY, MessageType.text)
    }
}));
var sucmsg = ''
var pmmm = ''
var psmm = ''
if (Config.LANG == 'TR') sucmsg = '*පණිවිඩය සාර්ථකව යවන ලදි ✅*', pmmm = 'පිළිතුරු දුන් පුද්ගලයාට පෞද්ගලික පණිවිඩයක් යවයි.', psmm = 'පෞද්ගලික ලෙස Voice පණිවිඩයක් යවයි.'
if (Config.LANG == 'EN') sucmsg = '*Message Sent Successfully ✅*', pmmm = 'Sends a private message to the replied person.', psmm = 'Sends a private voice message to the respondent.'
Aqua.addCommand({pattern: 'pmsend ?(.*)', fromMe: true, desc: pmmm, deleteCommand: false }, (async (message, match) => {
    if (!message.reply_message) return await message.client.sendMessage(message.jid,NLang.NEED_REPLY, MessageType.text);
    if (message.reply_message && match[1] == '') return await message.client.sendMessage(message.jid, NLang.NEED_WORDS, MessageType.text);
    const uspm = message.reply_message.jid
    await message.client.sendMessage(uspm, `${match[1]}`, MessageType.text);
    await message.client.sendMessage(message.jid, sucmsg, MessageType.text);
}));
Aqua.addCommand({pattern: 'pmttssend ?(.*)', fromMe: true, desc: psmm, deleteCommand: false}, (async (message, match) => {
    if (!message.reply_message) return await message.client.sendMessage(message.jid,NLang.NEED_REPLY, MessageType.text);
    if (message.reply_message && match[1] == '') return await message.client.sendMessage(message.jid, NLang.NEED_WORDS, MessageType.text);
    let 
        LANG = Config.LANG.toLowerCase(),
        ttsMessage = match[1],
        SPEED = 1.0

    if(langMatch = match[1].match("\\{([a-z]{2})\\}")) {
        LANG = langMatch[1]
        ttsMessage = ttsMessage.replace(langMatch[0], "")
    } 
    if(speedMatch = match[1].match("\\{([0].[0-9]+)\\}")) {
        SPEED = parseFloat(speedMatch[1])
        ttsMessage = ttsMessage.replace(speedMatch[0], "")
    }
    
    var buffer = await googleTTS.synthesize({
        text: ttsMessage,
        voice: LANG
    });
    fs.writeFileSync('tts.mp3', buffer);

    await message.client.sendMessage(message.reply_message.jid, fs.readFileSync('tts.mp3'), MessageType.audio, {mimetype: Mimetype.mp4Audio, ptt: true});
    await message.client.sendMessage(message.jid,sucmsg, MessageType.text);
       
}));
