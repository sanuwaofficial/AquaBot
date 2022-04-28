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
const FormData = require('form-data')
async function imgstic(path) {
	
		const bodyForm = new FormData();
		bodyForm.append('new-image', fs.createReadStream(path))
		const res = await axios(`https://s5.ezgif.com/jpg-to-webp`,{
			method: 'POST',
			data: new URLSearchParams(Object.entries( bodyForm)) ,
			
		})
        const $ = cheerio.load(res.data)
       
        const file = $('input[name="file"]').attr('value')
       
       
        const data = {
          file: file,
          'convert-to-webp': 'Convert WebP to MP4!',
        }
  const res2 = await axios({
          method: 'post',
          url: 'https://ezgif.com/jpg-to-webp/' + data.file,
          data: new URLSearchParams(Object.entries(data)) 
         
         })  
  const $2 = cheerio.load(res2.data)  
  const link = $2('div#output > p.outfile > img').attr('src')
   const output = 'https:' + link
return output	
}

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
           const res =  await imgstic(location)
           const res2 = await axios.get( res, { responseType: 'arraybuffer'})  
           await message.sendMessage(Buffer.from(res2.data), MessageType.sticker, { quoted: message.data})
        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

        }

        ffmpeg(location)
            .outputOptions(["-y", "-vcodec libwebp", "-lossless 1", "-qscale 1", "-preset default", "-loop 0", "-an", "-vsync 0", "-s 600x600"])
            .videoFilters('scale=600:600:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=600:600:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1')
            .save('sticker.webp')
            .on('end', async () => {
                await message.sendMessage(fs.readFileSync('sticker.webp'), MessageType.sticker, { quoted: message.data });
            });
        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})
    }));
