const Aqua = require('../events');
const Config = require('../config');
let wk = Config.WORKTYPE == 'public' ? false : true
const Language = require('../language');
const Lang = Language.getString('scrapers');
const {MessageType, GroupSettingChange, Mimetype, MessageOptions} = require('@adiwajshing/baileys');
const axios = require('axios')
const cheerio = require('cheerio')
const play = require('playstore-scraper')
const { webp2img } = require('../lib/ezgif');
var DOWN =''
   if (Config.LANG == 'EN') DOWN  = '*📥Downloading your APK...*'
   if (Config.LANG == 'SI') DOWN = '*📥ඔබ සෙවූ apk ගොනුව බාගත කරමින් පවතී...*'
var UP =''
   if (Config.LANG == 'EN') UP  = '*📤Uploading your APK...*'
   if (Config.LANG == 'SI') UP = '*📤ඔබ සෙවූ apk ගොනුව ගෙන එමින් පවතී...*'
var N_FOUND =''
   if (Config.LANG == 'EN') N_FOUND  = '*🧜‍♀️🧜‍♂️APK not found*'
   if (Config.LANG == 'SI') N_FOUND = '*🧜‍♂️🧜‍♀️ඔබ සෙවූ apk ගොනුව හමු නොවීය.*'
var NEED =''
   if (Config.LANG == 'EN') NEED  = '*🧜‍♀️🧜‍♂️Please enter a valid google play store apk link.\nyou can get it using .findapk command*'
   if (Config.LANG == 'SI') NEED = '*🧜‍♀️🧜‍♂️කරුණාකර වලංගු google play store app link එකක් ඇතුළත් කරන්න.\n.findapk විධානය මගින්ද එම ලින්ක් ලබා ගත හැකිය.*'
var DESC =''
   if (Config.LANG == 'EN') DESC  = 'download APK from google play store'
   if (Config.LANG == 'SI') DESC = 'google play store වෙතින් apk ගෙන එයි.'
var SDESC =''
   if (Config.LANG == 'EN') SDESC = '*it searchs on google play store*'
   if (Config.LANG == 'SI') SDESC= '*google play store හි සර්ච් කරයි*'

Aqua.addCommand({ pattern: 'findapk ?(.*)', fromMe: wk, desc:SDESC, deleteCommand: false }, async (message, match) => {
   
   if (match[1] === '') return await message.client.sendMessage(message.jid,'*Need App Name!*',MessageType.text, {quoted: message.data})
   var load = await message.client.sendMessage(message.jid,Lang.SEARCHING,MessageType.text, {quoted: message.data}); 
   const try1 = await play.search(match[1])
    get_result = try1.results
    ini_txt = ""
    for (var x of get_result) {
   ini_txt += `📦 Name : ${x.title}\n`
	ini_txt += `👨‍💻 Developer : ${x.developer}\n`
	ini_txt += `📃 Description : ${x.description}\n`
	ini_txt += `⭐ Rating : ${x.rating}\n`
   ini_txt += `🔗 Link : ${x.link}\n`
	ini_txt += `─────────────────\n\n`
        }
        await message.client.sendMessage(message.jid, '╔═══════════════╗\n║ *🤹‍♂️AQUA PlayStore Search🤹‍♀️*║\n╚═══════════════╝\n\n' + ' *─────────────────* \n\n' + ini_txt  ,MessageType.text, {quoted: message.data});
 return await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true})

})
  Aqua.addCommand({ pattern: 'downapk ?(.*)', fromMe: wk, desc:DESC, deleteCommand: false }, async (message, match) => { 
	
	  if (match[1] === '') return await message.client.sendMessage(message.jid,NEED,MessageType.text, {quoted: message.data})
	  if (!match[1].includes('https://play.google.com/store/apps/details?id')) return await message.client.sendMessage(message.jid,NEED,MessageType.text, {quoted: message.data})
	  var load = await message.client.sendMessage(message.jid,DOWN,MessageType.text, {quoted: message.data}); 
	  const id = match[1].replace('https://play.google.com/store/apps/details?id=' , '')
	   const try1 = await play.getExtendedInfoById(id)
	   const name = try1.title
	  const try2 = await axios.get('https://apk-dl2.herokuapp.com/api/apk-dl?url=https://play.google.com/store/apps/details?id=' + id , { responseType: 'arraybuffer'})
   
    
 if (try2.data.status) {
  return await message.client.sendMessage(message.jid, N_FOUND ,MessageType.text, {quoted: message.data})
    

 }else {
 if (Config.DETAILS == 'true') {
  const version = try1.version
  const icon = try1.icon
  const rating = try1.rating
  const developer = try1.additional_info.developer
  const msg ='┌───[🐋𝙰𝚀𝚄𝙰𝙱𝙾𝚃🐋]\n\n  *APK DOWNLOADER*\n\n│🎁ɴᴀᴍᴇ :' + name + '\n\n│🕹️ᴠᴇʀsɪᴏɴ : ' + version + '\n\n│👨‍💻ᴅᴇᴠᴇʟᴏᴘᴇʀ : ' + developer + '\n\n│✨ʀᴀᴛɪɴɢ : ' + rating + '\n\n└───────────◉'
  const res =   await webp2img(icon)
   const res2 = await axios.get( res, { responseType: 'arraybuffer'})
  var up = await message.client.sendMessage(message.jid,UP,MessageType.text, {quoted: message.data});
  await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true}) 	 
  await message.sendMessage(Buffer.from(res2.data), MessageType.image, { caption: msg, quoted: message.data } )
  await message.client.deleteMessage(message.jid, {id: up.key.id, remoteJid: message.jid, fromMe: true}) 
  await message.sendMessage(Buffer.from(try2.data), MessageType.document, { filename: name + '.apk', mimetype: 'application/vnd.android.package-archive', quoted: message.data });	 
 	 
 }else{
  var up = await message.client.sendMessage(message.jid,UP,MessageType.text, {quoted: message.data});
  await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true}) 	 

  await message.client.deleteMessage(message.jid, {id: up.key.id, remoteJid: message.jid, fromMe: true}) 	 
  await message.sendMessage(Buffer.from(try2.data), MessageType.document, { filename: name + '.apk', mimetype: 'application/vnd.android.package-archive', quoted: message.data });	 
 
 }	 
 } })


 Aqua.addCommand({ pattern: 'apk ?(.*)', fromMe: wk, dontAddCommandList: true , deleteCommand: false }, async (message, match) => { 
	
	  if (match[1] === '') return await message.client.sendMessage(message.jid,NEED,MessageType.text, {quoted: message.data})
	  if (!match[1].includes('https://play.google.com/store/apps/details?id')) return await message.client.sendMessage(message.jid,NEED,MessageType.text, {quoted: message.data})
	  var load = await message.client.sendMessage(message.jid,DOWN,MessageType.text, {quoted: message.data}); 
	  const id = match[1].replace('https://play.google.com/store/apps/details?id=' , '')
	   const try1 = await play.getExtendedInfoById(id)
	   const name = try1.title
	  const try2 = await axios.get('https://apk-dl2.herokuapp.com/api/apk-dl?url=https://play.google.com/store/apps/details?id=' + id , { responseType: 'arraybuffer'})
   
    
 if (try2.data.status) {
  return await message.client.sendMessage(message.jid, N_FOUND ,MessageType.text, {quoted: message.data})
    

 }else {
 if (Config.DETAILS == 'true') {
  const version = try1.version
  const icon = try1.icon
  const rating = try1.rating
  const developer = try1.additional_info.developer
  const msg ='┌───[🐋𝙰𝚀𝚄𝙰𝙱𝙾𝚃🐋]\n\n  *APK DOWNLOADER*\n\n│🎁ɴᴀᴍᴇ :' + name + '\n\n│🕹️ᴠᴇʀsɪᴏɴ : ' + version + '\n\n│👨‍💻ᴅᴇᴠᴇʟᴏᴘᴇʀ : ' + developer + '\n\n│✨ʀᴀᴛɪɴɢ : ' + rating + '\n\n└───────────◉'
  const res =   await webp2img(icon)
   const res2 = await axios.get( res, { responseType: 'arraybuffer'})
  var up = await message.client.sendMessage(message.jid,UP,MessageType.text, {quoted: message.data});
  await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true}) 	 
  await message.sendMessage(Buffer.from(res2.data), MessageType.image, { caption: msg, quoted: message.data } )
  await message.client.deleteMessage(message.jid, {id: up.key.id, remoteJid: message.jid, fromMe: true}) 
  await message.sendMessage(Buffer.from(try2.data), MessageType.document, { filename: name + '.apk', mimetype: 'application/vnd.android.package-archive', quoted: message.data });	 
 	 
 }else{
  var up = await message.client.sendMessage(message.jid,UP,MessageType.text, {quoted: message.data});
  await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true}) 	 

  await message.client.deleteMessage(message.jid, {id: up.key.id, remoteJid: message.jid, fromMe: true}) 	 
  await message.sendMessage(Buffer.from(try2.data), MessageType.document, { filename: name + '.apk', mimetype: 'application/vnd.android.package-archive', quoted: message.data });	 
 
 }	 
 } })
