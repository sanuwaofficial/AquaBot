const Aqua = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');
const Config = require('../config');
let wk = Config.WORKTYPE == 'public' ? false : true
const axios = require('axios');
const fs = require('fs');
const got = require("got");
const Language = require('../language');
const Lang = Language.getString('scrapers');
var gis = require('g-i-s');
 Aqua.addCommand({pattern: 'img ?(.*)', fromMe: wk, desc: Lang.IMG_DESC, deleteCommand: false}, (async (message, match) => { 

        if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORDS,MessageType.text, { quoted: message.data });
        gis(match[1], async (error, result) => {
            for (var i = 0; i < (result.length < 5 ? result.length : 5); i++) {
                var get = got(result[i].url, {https: {rejectUnauthorized: false}});
                var stream = get.buffer();
                
                stream.then(async (image) => {
                    await message.client.sendMessage(message.jid,image, MessageType.image);
                });
            }

            message.reply(Lang.IMG.format((result.length < 5 ? result.length : 5), match[1]));
        });
    }));

const pin = require('hxz-api')
var pdesc = ''
if (Config.LANG == 'EN') pdesc = 'Searches for related pics on pinterest'
if (Config.LANG == 'SI') pdesc = ' pinterest හි අදාළ පින්තූර සෙවීම.'

var not_found = '' 
if (Config.LANG == 'EN') not_found = '*⛔Could not find photos related to the topic you entered.⛔*'
if (Config.LANG == 'SI') not_found = '*⛔ඔබ ඇතුළත් කළ මාතෘකාවට අදාළ ඡායාරූප සොයාගැනීමට නොහැකි විය.⛔*'

var up_1 = '' 
if (Config.LANG == 'EN') up_1 = '*1 photo you requested has been uploaded.*'
if (Config.LANG == 'SI') up_1 = '*✅ඔබ ඉල්ලූ ඡායාරූප 1 ක් අප්ලෝඩ් කරන ලදී.*'

var up_2  = '' 
if (Config.LANG == 'EN') up_2 = '*The 2 photos you requested have been uploaded.*'
if (Config.LANG == 'SI') up_2 = '*✅ඔබ ඉල්ලූ ඡායාරූප 2ක් අප්ලෝඩ් කරන ලදී.*'

var up_3  = '' 
if (Config.LANG == 'EN') up_3 = '*The 3photos you requested have been uploaded.*'
if (Config.LANG == 'SI') up_3 = '*✅ඔබ ඉල්ලූ ඡායාරූප 3ක් අප්ලෝඩ් කරන ලදී.*'

var up_4 = '' 
if (Config.LANG == 'EN') up_4 = '*The 4photos you requested have been uploaded.*'
if (Config.LANG == 'SI') up_4 = '*✅ඔබ ඉල්ලූ ඡායාරූප 4ක් අප්ලෝඩ් කරන ලදී.*'

var up_5 = '' 
if (Config.LANG == 'EN') up_5 = '*The 5 photos you requested have been uploaded.*'
if (Config.LANG == 'SI') up_5 = '*✅ඔබ ඉල්ලූ ඡායාරූප 5 ක් අප්ලෝඩ් කරන ලදී.*'


Aqua.addCommand({ pattern: 'pimg ?(.*)', fromMe: wk, desc:pdesc, deleteCommand: false }, async (message, match) => {
   if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORDS,MessageType.text, { quoted: message.data });
  
  const images = await pin.pinterest(match[1])
  if (!images[0]){
  return await message.client.sendMessage(message.jid,not_found,MessageType.text, { quoted: message.data });
  }else{
  const img = await axios.get(images[0] , { responseType: 'arraybuffer'}) 
  await message.sendMessage(Buffer.from(img.data), MessageType.image, { caption: Config.CAPTION, quoted: message.data } );
  }
  if (!images[1]){
  return await message.client.sendMessage(message.jid,up_1,MessageType.text, { quoted: message.data });
  }else{
  const img = await axios.get(images[1] , { responseType: 'arraybuffer'}) 
  await message.sendMessage(Buffer.from(img.data), MessageType.image, { caption: Config.CAPTION, quoted: message.data } );
  }
  if (!images[2]){
   return await message.client.sendMessage(message.jid,up_2,MessageType.text, { quoted: message.data });
  }else{
  const img = await axios.get(images[2] , { responseType: 'arraybuffer'}) 
  await message.sendMessage(Buffer.from(img.data), MessageType.image, { caption: Config.CAPTION, quoted: message.data } );
  }
  if (!images[3]){
  return await message.client.sendMessage(message.jid,up_3,MessageType.text, { quoted: message.data });
  }else{
  const img = await axios.get(images[3] , { responseType: 'arraybuffer'}) 
  await message.sendMessage(Buffer.from(img.data), MessageType.image, { caption: Config.CAPTION, quoted: message.data } );
  }
  if (!images[4]){
  return await message.client.sendMessage(message.jid,up_4,MessageType.text, { quoted: message.data });
  }else{
  const img = await axios.get(images[4] , { responseType: 'arraybuffer'}) 
  await message.sendMessage(Buffer.from(img.data), MessageType.image, { caption: Config.CAPTION, quoted: message.data } );
  return await message.client.sendMessage(message.jid,up_5,MessageType.text, { quoted: message.data }); 
  }
})
