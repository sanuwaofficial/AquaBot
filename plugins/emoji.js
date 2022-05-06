const Aqua = require('../events');
const { MessageType, Mimetype } = require('@adiwajshing/baileys');
const axios = require('axios');
const Config = require('../config');
const { EmojiAPI } = require("emoji-api");
const emoji = new EmojiAPI();
const { img2webp } = require('../lib/ezgif');
let wk = Config.WORKTYPE == 'public' ? false : true
var NEED_1EMOJI = ''
if (Config.LANG == 'EN') NEED_1EMOJI = '*Please enter an emoji*'
if (Config.LANG == 'SI') NEED_1EMOJI = 'කරුණාකර ඉමෝජි ඇතුළත් කරන්න.'
var DESC = ''
if (Config.LANG == 'EN') DESC = 'Converts emoji to a photo.'
if (Config.LANG == 'SI') DESC = 'ඉමෝජියක් ඡායාරූප බවට පරිවර්තනය කරයි.'

var STICDESC = ''
if (Config.LANG == 'EN') STICDESC = 'Converts emoji to a sticker.'
if (Config.LANG == 'SI') STICDESC = 'ඉමෝජියක් ස්ටිකරයක් බවට පරිවර්තනය කරයි.'

Aqua.addCommand({ pattern: 'pemoji ?(.*)', fromMe: wk, desc:DESC, deleteCommand: false }, async (message, match) => {
  if (!match[1]) return await message.client.sendMessage(message.jid,NEED_1EMOJI, MessageType.text, { quoted: message.data });

  emoji.get(match[1])
    .then(async (data) => {
        const res = data.images[4].url
         if(!res) {
           return await message.client.sendMessage(message.jid,'error', MessageType.text, { quoted: message.data });
         }else {
           const img =  await axios.get(res , { responseType: 'arraybuffer'} )
            await message.sendMessage(Buffer.from(img.data), MessageType.image, { quoted: message.data, caption: Config.CAPTION }); 
         }

    })})

Aqua.addCommand({ pattern: 'sticemoji ?(.*)', fromMe: wk, desc:STICDESC, deleteCommand: false }, async (message, match) => {
  if (!match[1]) return await message.client.sendMessage(message.jid,NEED_1EMOJI, MessageType.text, { quoted: message.data });

  emoji.get(match[1])
    .then(async (data) => {
        const res = data.images[4].url
         if(!res) {
           return await message.client.sendMessage(message.jid,'error', MessageType.text, { quoted: message.data });
         }else {

 const stic =  await img2webp(res)
 const stic2 = await axios.get( stic, { responseType: 'arraybuffer'})
 await message.sendMessage(Buffer.from(stic2.data), MessageType.sticker, { quoted: message.data}); 
         }

    })})
