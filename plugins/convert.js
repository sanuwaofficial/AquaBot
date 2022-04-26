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
const { webp2img } = require('../lib/ezgif');
let wk = Config.WORKTYPE == 'public' ? false : true
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


    Aqua.addCommand({pattern: 'mp4audio$', fromMe: wk, desc: Lang.MP4TOAUDİO_DESC, deleteCommand: false}, (async (message, match) => {
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

    Aqua.addCommand({pattern: 'imagesticker$', fromMe: wk, desc: Lang.STİCKER_DESC, deleteCommand: false}, (async (message, match) => {
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
    await uploadFile(location).then( async (data) => { 
    const result = data.result.url
    
    const res =   await webp2img(result)
    const res2 = await axios.get( res, { responseType: 'arraybuffer'})
  
        await message.sendMessage(Buffer.from(res2.data), MessageType.image , {  quoted: message.data, caption: Config.CAPTION})
        return await message.client.deleteMessage(mid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true}) 
    })
    }));
    Aqua.addCommand({pattern: 'vsticker$', desc: Lang.ANİM_STİCK, fromMe: wk, deleteCommand: false}, (async (message, match) => {
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

    
