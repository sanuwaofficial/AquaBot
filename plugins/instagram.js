const Aqua = require('../events');
const { MessageType, Mimetype } = require('@adiwajshing/baileys');
const axios = require('axios');
const Config = require('../config');
let wk = Config.WORKTYPE == 'public' ? false : true
const Language = require('../language');
const Lang = Language.getString('instagram');



Aqua.addCommand({ pattern: 'ig ?(.*)', fromMe: wk, desc:Lang.INSTA_DESC, deleteCommand: false }, async (message, match) => {

  const iglink = match[1]

if (!iglink) return await message.client.sendMessage(message.jid,Lang.N_URL, MessageType.text, { quoted: message.data });
if (!match[1].includes('instagram.com')) return await message.client.sendMessage(message.jid,Lang.N_URL,MessageType.text, {quoted: message.data});
await axios.get(`https://sanuw-api.herokuapp.com/docs/download/igpost?url=${match[1]}&apikey=sanuwa`).then(async (response) => {
    
if (response.data.result.type == 'image') {	

var load= await message.client.sendMessage(message.jid,Lang.D_POST, MessageType.text, { quoted: message.data });
var up = await message.client.sendMessage(message.jid,Lang.U_POST, MessageType.text, { quoted: message.data });
await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true}) ; 

const msg = '┌───[🐋𝙰𝚀𝚄𝙰𝙱𝙾𝚃🐋]\n\n  *📥INSTAGRAM DOWNLODER*\n\n│❤️ʟɪᴋᴇs: ' + response.data.result.likes +  '\n\n│💬 ᴄᴏᴍᴍᴇɴᴛs: '+ response.data.result.comments + '\n\n│ 📤ᴜᴘʟᴏᴀᴅᴇʀ: ' + response.data.result.username +'\n\n│📂 ᴛʏᴘᴇ: '+ response.data.result.type + '\n\n└───────────◉'
const linkdata = await axios.get(response.data.result.url, { responseType: 'arraybuffer'})

await message.sendMessage(Buffer.from(linkdata.data), MessageType.image , { caption: msg , quoted: message.data }) 
return await message.client.deleteMessage(message.jid, {id: up.key.id, remoteJid: message.jid, fromMe: true})}
    
    else if (response.data.result.type == 'video') {

var load= await message.client.sendMessage(message.jid,Lang.D_VID, MessageType.text, { quoted: message.data });   
var up = await message.client.sendMessage(message.jid,Lang.U_VID , MessageType.text, { quoted: message.data });
await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true}) ; 

const msg = '┌───[🐋𝙰𝚀𝚄𝙰𝙱𝙾𝚃🐋]\n\n  *📥INSTAGRAM DOWNLODER*\n\n│❤️ʟɪᴋᴇs: ' + response.data.result.likes +  '\n\n│💬 ᴄᴏᴍᴍᴇɴᴛs: '+ response.data.result.comments + '\n\n│ 📤ᴜᴘʟᴏᴀᴅᴇʀ: ' + response.data.result.username +'\n\n│📂 ᴛʏᴘᴇ: '+ response.data.result.type + '\n\n└───────────◉'
const linkdata = await axios.get(response.data.result.url, { responseType: 'arraybuffer'})

await message.sendMessage(Buffer.from(linkdata.data), MessageType.video , { caption: msg , quoted: message.data})
return await message.client.deleteMessage(message.jid, {id: up.key.id, remoteJid: message.jid, fromMe: true})}
  else if(!response.data.status){ return await message.client.sendMessage(message.jid,Lang.E_URL, MessageType.text, { quoted: message.data });

  }
 })});
Aqua.addCommand({ pattern: 'insta ?(.*)', fromMe: wk, desc:Lang.I_DESC, deleteCommand: false }, async (message, match) => {
  const iglink = match[1]
  if (!iglink) return await message.client.sendMessage(message.jid,Lang.N_USER, MessageType.text, { quoted: message.data });
  const user = iglink.replace("https://www.instagram.com/","")
  var load= await message.client.sendMessage(message.jid,Lang.D_USER, MessageType.text, { quoted: message.data });
  await axios.get(`https://sanuw-api.herokuapp.com/docs/other/igstalk?username=${user}&apikey=sanuwa`).then(async (response) => {
    if(!response.data.status) {
    return await message.client.sendMessage(message.jid,Lang.E_USER, MessageType.text, { quoted: message.data });
       }
  else {
    const msg = '┌───[🐋𝙰𝚀𝚄𝙰𝙱𝙾𝚃🐋]\n\n  *✨ INSTAGRAM STALK*\n\n│👨‍💻ᴜsᴇʀɴᴀᴍᴇ: ' + response.data.result.Username + '\n\n│👨‍🦰ғᴜʟʟɴᴀᴍᴇ: '+ response.data.result.Fullname + '\n\n│ 👥ғᴏʟʟᴏᴡᴇʀs: '+ response.data.result.Followers + '\n\n│👤ғᴏʟʟᴏᴡɪɴɢ: '+ response.data.result.Following + '\n\n│🗳️ᴘᴏsᴛs: ' + response.data.result.Posts +'\n\n│💬ʙɪᴏ: '+ response.data.result.Biography + '\n\n└───────────◉'
     const photodata = await axios.get(response.data.result.Profile_Pic, { responseType: 'arraybuffer'}); 
    await message.sendMessage(Buffer.from(photodata.data), MessageType.image, {mimetype: Mimetype.jpg, caption: msg, quoted: message.data}); 
    await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true}) ;
  }
    })})
