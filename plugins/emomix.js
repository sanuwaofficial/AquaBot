const Aqua = require('../events');
const { MessageType, Mimetype } = require('@adiwajshing/baileys');
const axios = require('axios');
const Config = require('../config');
const { EmojiAPI } = require("emoji-api");
const emoji = new EmojiAPI();
const { img2webp } = require('../lib/ezgif');
let wk = Config.WORKTYPE == 'public' ? false : true

const Language = require('../language');
var NEED_EMOJI = ''
if (Config.LANG == 'EN') NEED_EMOJI = '*Please enter two different emojis*\nex: .emomix 😀;😁'
if (Config.LANG == 'SI') NEED_EMOJI = 'කරුණාකර එකිනෙකට වෙනස් ඉමෝජි දෙකක් ඇතුළත් කරන්න.ඉමෝජි වෙන්කිරීමට ; සළකුණ භාවිතා කරන්න.'
var MIXDESC = ''
if (Config.LANG == 'EN') MIXDESC = 'create stikers using two emojis'
if (Config.LANG == 'SI') MIXDESC = 'ඉමෝජි දෙකක් එක් කර ස්ටිකර් සාදයි.'
var ERROR = ''
if (Config.LANG == 'EN') ERROR = '⛔Can not create stickers with the emoji you entered.⛔'
if (Config.LANG == 'SI') ERROR = '⛔ඔබ ඇතුළත් කළ ඉමෝජි සමග ස්ටිකර් සෑදිය නොහැක.⛔'


Aqua.addCommand({ pattern: 'emomix ?(.*)', fromMe: wk, desc:MIXDESC, deleteCommand: false }, async (message, match) => {
  
if (!match[1]) return await message.client.sendMessage(message.jid,NEED_EMOJI, MessageType.text, { quoted: message.data });
if (!match[1].includes(';')) return await message.client.sendMessage(message.jid,NEED_EMOJI,MessageType.text, {quoted: message.data});
   var split = match[1].split(';');
   var emo1 = split[0];
   var emo2 = split[1];
  var uri1 = encodeURI(emo1)
  var uri2 = encodeURI(emo2)
  await axios.get(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${uri1}_${uri2}`).then(async (response) => {
  
  if (response.data.locale == '') {
    return await message.client.sendMessage(message.jid,ERROR,MessageType.text, {quoted: message.data});
  }else {
 const result = response.data.results[0].media_formats.png_transparent.url
    const res =   await img2webp(result)
    const res2 = await axios.get( res, { responseType: 'arraybuffer'})
 await message.sendMessage(Buffer.from(res2.data), MessageType.sticker, { quoted: message.data}); 
  }})});
