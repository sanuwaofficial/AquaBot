const Aqua = require('../events');
const { MessageType, Mimetype } = require('@adiwajshing/baileys');
const axios = require('axios');
const Config = require('../config');
let wk = Config.WORKTYPE == 'public' ? false : true
const Language = require('../language');
const Lang = Language.getString('facebook');
const SLang = Language.getString('scrapers');
const FormData = require('form-data');
const { fetchJson, getBuffer } = require('./fetcher')

var NEED = ''
if (Config.LANG == 'EN') NEED = '*⛔Please give a valid spotify link.*'
if (Config.LANG == 'SI') NEED = '*⛔කරුණාකර වලංගු spotify සබැදියක් ඇතුළත් කරන්න.⛔*'

var DESC = ''
if (Config.LANG == 'EN') DESC = 'Downloads songs from spotify'
if (Config.LANG == 'SI') DESC = 'Spotify වෙතින් ගීත බාගත කරයි'

var n_song = ''
if (Config.LANG == 'EN') nsong = '*⛔Please type the song name after the command.*'
if (Config.LANG == 'SI') nsong = '*⛔කරුණාකර විධානයට පසුව ගීතයේ නම ටයිප් කරන්න.*'

var SDESC = ''
if (Config.LANG == 'EN')  SDESC = 'It searchs on YouTube.'
if (Config.LANG == 'SI')  SDESC = 'එය spotify  හි සර්ච් කරයි.'


Aqua.addCommand({ pattern: 'getspo ?(.*)', fromMe: wk, desc:SDESC, deleteCommand: false }, async (message, match) => {
  if (match[1] === '') return await message.client.sendMessage(message.jid,n_song,MessageType.text, {quoted: message.data});    
  var load = await message.client.sendMessage(message.jid,SLang.SEARCHING,MessageType.text, {quoted: message.data});
  
  const data = await axios.get(`https://zekais-api.herokuapp.com/spotifysr?query=${match[1]}`)
  if (!data.data.status){
  return await message.client.sendMessage(message.jid,'*Servar error*',MessageType.text, {quoted: message.data});  
  } 
  else{
  get_result = await fetchJson(`https://zekais-api.herokuapp.com/spotifysr?query=${match[1]}`)
  
   get_result = get_result.result
    ini_txt = ""
        for (var x of get_result) {
        ini_txt += `🎞️  Title : ${x.title}\n`
        ini_txt += `👨‍🎤  Artists : ${x.artists}\n`
        ini_txt += `📌  Link : ${x.url}\n`
        ini_txt += `─────────────────\n\n`
        }

  await message.client.sendMessage(message.jid, '╔═══════════════╗\n║  *🎧 AQUA Spotify Search 🎧*  ║\n╚═══════════════╝\n\n─────────────────\n\n' + ini_txt,MessageType.text, {quoted: message.data});
  return await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true})
  }
  })


Aqua.addCommand({ pattern: 'spotify ?(.*)', fromMe: wk, desc:DESC, deleteCommand: false }, async (message, match) => {
  if (match[1] === '') return await message.client.sendMessage(message.jid,n_song,MessageType.text, {quoted: message.data}); 
  if (!match[1].includes('open.spotify.com')) return await message.client.sendMessage(message.jid,NEED,MessageType.text, {quoted: message.data});
  
  var load = await message.client.sendMessage(message.jid,Config.SONG_DOWN, MessageType.text, { quoted: message.data });
  const spo = await axios.get(`https://megayaa.herokuapp.com/api/spotifydl?url=${match[1]}`)
  if(Config.DETAILS == 'true'){
  if (!spo.data.status){
    
    const spo2 = await axios.get(`https://megayaa.herokuapp.com/api/spotifydl?url=${match[1]}`)
  if (!spo2.data.status){
    return await message.client.sendMessage(message.jid,Lang.E_FB, MessageType.text, { quoted: message.data });
  }else {
  var up = await message.client.sendMessage(message.jid,Config.SONG_UP, MessageType.text, { quoted: message.data });
  await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true}) ; 
    
    const msg = '┌───[🐋𝙰𝚀𝚄𝙰𝙱𝙾𝚃🐋]\n\n  *📥SPOTIFY DOWNLOADER*\n\n│🎧sᴏɴɢ: ' + spo2.data.data.title + '\n\n│👩‍🎤ᴀʀᴛɪsᴛ: ' + spo2.data.data.artists + '\n\n│🖇️ᴜʀʟ::' +spo2.data.data.original_url + '\n\n└───────────◉' 
    const img = await axios.get(spo2.data.data.thumbnail, { responseType: 'arraybuffer'});
    const song = await axios.get(spo2.data.data.result, { responseType: 'arraybuffer'}); 
    
       await message.sendMessage(Buffer.from(img.data), MessageType.image, {mimetype: Mimetype.jpg, caption: msg, quoted: message.data});
       await message.sendMessage(Buffer.from(song.data), MessageType.document,  {filename: spo2.data.data.title + '.mp3', mimetype: 'audio/mpeg', quoted: message.data});
return await message.client.deleteMessage(message.jid, {id: up.key.id, remoteJid: message.jid, fromMe: true})
  }} else {
    
  var up = await message.client.sendMessage(message.jid,Config.SONG_UP, MessageType.text, { quoted: message.data });
  await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true}) ; 
    
    const msg = '┌───[🐋𝙰𝚀𝚄𝙰𝙱𝙾𝚃🐋]\n\n  *📥SPOTIFY DOWNLOADER*\n\n│🎧sᴏɴɢ: ' + spo.data.data.title + '\n\n│👩‍🎤ᴀʀᴛɪsᴛ: ' + spo.data.data.artists + '\n\n│🖇️ᴜʀʟ::' +spo.data.data.original_url + '\n\n└───────────◉' 
    const img = await axios.get(spo.data.data.thumbnail, { responseType: 'arraybuffer'});
    const song = await axios.get(spo.data.data.result, { responseType: 'arraybuffer'}); 
    
       await message.sendMessage(Buffer.from(img.data), MessageType.image, {mimetype: Mimetype.jpg, caption: msg, quoted: message.data});
       await message.sendMessage(Buffer.from(song.data), MessageType.document,  {filename: spo.data.data.title + '.mp3', mimetype: 'audio/mpeg', quoted: message.data});
return await message.client.deleteMessage(message.jid, {id: up.key.id, remoteJid: message.jid, fromMe: true})
  }
  }else
     if(Config.DETAILS == 'false'){
     if (!spo.data.status){
    
    const spo2 = await axios.get(`https://megayaa.herokuapp.com/api/spotifydl?url=${match[1]}`)
  if (!spo2.data.status){
    return await message.client.sendMessage(message.jid,Lang.E_FB, MessageType.text, { quoted: message.data });
  }else {
  var up = await message.client.sendMessage(message.jid,Config.SONG_UP, MessageType.text, { quoted: message.data });
  await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true}) ; 
    
    const song = await axios.get(spo2.data.data.result, { responseType: 'arraybuffer'}); 
    
   
       await message.sendMessage(Buffer.from(song.data), MessageType.document,  {filename: spo2.data.data.title + '.mp3', mimetype: 'audio/mpeg', quoted: message.data});
return await message.client.deleteMessage(message.jid, {id: up.key.id, remoteJid: message.jid, fromMe: true})
  }} else {
    
  var up = await message.client.sendMessage(message.jid,Config.SONG_UP, MessageType.text, { quoted: message.data });
  await message.client.deleteMessage(message.jid, {id: load.key.id, remoteJid: message.jid, fromMe: true}) ; 
    
  
    const song = await axios.get(spo.data.data.result, { responseType: 'arraybuffer'}); 
    
 
       await message.sendMessage(Buffer.from(song.data), MessageType.document,  {filename: spo.data.data.title + '.mp3', mimetype: 'audio/mpeg', quoted: message.data});
return await message.client.deleteMessage(message.jid, {id: up.key.id, remoteJid: message.jid, fromMe: true})
     
     }
     }})
  
