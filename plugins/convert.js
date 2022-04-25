const Aqua = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const {execFile} = require('child_process');
const cwebp = require('cwebp-bin');
const Config = require('../config');
const cheerio = require('cheerio')
const FormData = require('form-data')
let BodyForm = require('form-data')
const Axios = require('axios');
const { JSDOM } = require('jsdom')
const fetch = require('node-fetch')
const uploadFile = require('../lib/uploadfile')
let { fromBuffer } = require('file-type')
const axios = require('axios')
const Language = require('../language');
const Lang = Language.getString('conventer');

async function webp2mp4(url) {
  
const res = await axios('https://ezgif.com/webp-to-mp4?url=' + url)
const $ = cheerio.load(res.data)
       
        const file = $('input[name="file"]').attr('value')
       
   
        const data = {
          file: file,
          convert: 'Convert WebP to MP4!',
        }
  const res2 = await axios({
          method: 'post',
          url: 'https://ezgif.com/webp-to-mp4/' + data.file,
          data: new URLSearchParams(Object.entries(data)) 
         
         })  
  const $2 = cheerio.load(res2.data)  
  const link = $2('div#output > p.outfile > video > source').attr('src')
  return link
}

if (Config.WORKTYPE == 'private') {

    Aqua.addCommand({pattern: 'mp4audio$', fromMe: true, desc: Lang.MP4TOAUDİO_DESC, deleteCommand: false}, (async (message, match) => {
        const mid = message.jid
        if (message.reply_message === false) return await message.client.sendMessage(mid, Lang.MP4TOAUDİO_NEEDREPLY, MessageType.text);
        var downloading = await message.client.sendMessage(mid,Lang.MP4TOAUDİO,MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .save('output.mp3')
            .on('end', async () => {
                await message.client.sendMessage(mid, fs.readFileSync('output.mp3'), MessageType.audio, {mimetype: Mimetype.mp4Audio, ptt: false, quoted: message.data});
            });
        return await message.client.deleteMessage(mid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
    }));

    Aqua.addCommand({pattern: 'imagesticker$', fromMe: true, desc: Lang.STİCKER_DESC, deleteCommand: false}, (async (message, match) => {
        const mid = message.jid
        if (message.reply_message === false) return await message.client.sendMessage(mid, Lang.STİCKER_NEEDREPLY, MessageType.text);
        var downloading = await message.client.sendMessage(mid,Lang.STİCKER,MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .fromFormat('webp_pipe')
            .save('output.jpg')
            .on('end', async () => {
                await message.client.sendMessage(mid, fs.readFileSync('output.jpg'), MessageType.image, {mimetype: Mimetype.jpg, quoted: message.data, caption: Config.CAPTION });
            });
        return await message.client.deleteMessage(mid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
    }));
    Aqua.addCommand({pattern: 'vsticker$', desc: Lang.ANİM_STİCK, fromMe: true, deleteCommand: false}, (async (message, match) => {
       const mid = message.jid
        if (message.reply_message === false) return await message.sendMessage(Lang.STİCKER_NEEDREPLY);
      var up =  await message.client.sendMessage(mid, Lang.ANİMATE, MessageType.text)
        const savedFilename = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });
       await uploadFile(savedFilename).then( async (data) => { 
    const result = data.result.url
    
    const res =   await Axios.get(`https://hadi-api.herokuapp.com/api/converter/ezgif-with-url/webp-to-mp4?url=` + result, { responseType: 'arraybuffer'})
  
     await message.sendMessage(Buffer.from(res.data), MessageType.video , {  quoted: message.data, caption: Config.CAPTION})
     await message.client.deleteMessage(message.jid, {id: up.key.id, remoteJid: message.jid, fromMe: true}) ;

                                        })
    }));
}
else if (Config.WORKTYPE == 'public') {

    Aqua.addCommand({pattern: 'mp4audio$', fromMe: false, desc: Lang.MP4TOAUDİO_DESC, deleteCommand: false}, (async (message, match) => {
        const mid = message.jid
        if (message.reply_message === false) return await message.client.sendMessage(mid, Lang.MP4TOAUDİO_NEEDREPLY, MessageType.text);
        var downloading = await message.client.sendMessage(mid,Lang.MP4TOAUDİO,MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)    
            .save('output.mp3')
            .on('end', async () => {
                await message.client.sendMessage(mid, fs.readFileSync('output.mp3'), MessageType.audio, {mimetype: Mimetype.mp4Audio, ptt: false, quoted: message.data});
            });
        return await message.client.deleteMessage(mid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
    }));

    Aqua.addCommand({pattern: 'imagesticker$', fromMe: false, desc: Lang.STİCKER_DESC, deleteCommand: false}, (async (message, match) => {
        const mid = message.jid
        if (message.reply_message === false) return await message.client.sendMessage(mid, Lang.STİCKER_NEEDREPLY, MessageType.text);
        var downloading = await message.client.sendMessage(mid,Lang.STİCKER,MessageType.text);
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        ffmpeg(location)
            .fromFormat('webp_pipe')
            .save('output.jpg')
            .on('end', async () => {
                await message.client.sendMessage(mid, fs.readFileSync('output.jpg'), MessageType.image, {mimetype: Mimetype.jpg, quoted: message.data, caption: Config.CAPTION });
            });
        return await message.client.deleteMessage(mid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
    }));
    Aqua.addCommand({pattern: 'vsticker$', desc: Lang.ANİM_STİCK, fromMe: false, deleteCommand: false}, (async (message, match) => {
        const mid = message.jid
        if (message.reply_message === false) return await message.sendMessage(Lang.STİCKER_NEEDREPLY);
      var up =  await message.client.sendMessage(mid, Lang.ANİMATE, MessageType.text)
        const savedFilename = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });
       await uploadFile(savedFilename).then( async (data) => { 
    const result = data.result.url
    
    const res =   await webp2mp4(result)
    const res2 = await axios.get('https:' + res, { responseType: 'arraybuffer'})
  
     await message.sendMessage(Buffer.from(res2.data), MessageType.video , {  quoted: message.data, caption: Config.CAPTION})
     await message.client.deleteMessage(message.jid, {id: up.key.id, remoteJid: message.jid, fromMe: true}) ;

                                        })
    }));
}
    
