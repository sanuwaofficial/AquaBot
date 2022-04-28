const Aqua = require('../events');
const {MessageType, Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const {execFile} = require('child_process');
const cwebp = require('cwebp-bin');
const Config = require('../config');
let wk = Config.WORKTYPE == 'public' ? false : true
const Language = require('../language');
const Lang = Language.getString('sticker');
const axios = require('axios')
const cheerio = require('cheerio')
const { webp2mp4 ,  webp2img ,  img2webp , vid2webp  } = require('../lib/ezgif');
const uploadFile = require('../lib/uploadfile')


Aqua.addCommand({pattern: 'sticker$', fromMe: wk, desc: Lang.STICKER_DESC,  deleteCommand: false}, (async (message, match) => {    

        if (message.reply_message === false) return await message.client.sendMessage(message.jid,Lang.NEED_REPLY, MessageType.text);
        var downloading = await message.client.sendMessage(message.jid,Lang.DOWNLOADING,MessageType.text, { quoted: message.data});
        var location = await message.client.downloadAndSaveMediaMessage({
            key: {
                remoteJid: message.reply_message.jid,
                id: message.reply_message.id
            },
            message: message.reply_message.data.quotedMessage
        });

        if (message.reply_message.video === false && message.reply_message.image) {
          await uploadFile(location).then( async (data) => { 
          const result = data.result.url
          const res = await img2webp(result)
           const res2 = await axios.get( res, { responseType: 'arraybuffer'})  
           await message.sendMessage(Buffer.from(res2.data), MessageType.sticker, { quoted: message.data}) })
        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

        }

       await uploadFile(location).then( async (data) => { 
          const result = data.result.url
          const res = await vid2webp(result)
           const res2 = await axios.get( res, { responseType: 'arraybuffer'})  
           await message.sendMessage(Buffer.from(res2.data), MessageType.sticker, { quoted: message.data}) })
        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
    }));
