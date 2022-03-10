const Aqua = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');
const translatte = require('translatte');
const config = require('../config');
const Language = require('../language');
const Lang = Language.getString('scrapers');
let wk = config.WORKTYPE == 'public' ? false : true
Aqua.addCommand({pattern: 'trt(?: |$)(\\S*) ?(\\S*)', desc: Lang.TRANSLATE_DESC, usage: Lang.TRANSLATE_USAGE, fromMe: wk, deleteCommand: false}, (async (message, match) => {

        if (!message.reply_message) {
            return await message.client.sendMessage(message.jid,Lang.NEED_REPLY,MessageType.text);
        }

        ceviri = await translatte(message.reply_message.message, {from: match[1] === '' ? 'auto' : match[1], to: match[2] === '' ? config.LANG : match[2]});
        if ('text' in ceviri) {
            return await message.reply('*▶️ ' + Lang.LANG + ':* ```' + (match[1] === '' ? 'auto' : match[1]) + '```\n'
            + '*◀️ ' + Lang.FROM + '*: ```' + (match[2] === '' ? config.LANG : match[2]) + '```\n'
            + '*🔎 ' + Lang.RESULT + ':* ```' + ceviri.text + '```');
        } else {
            return await message.client.sendMessage(message.jid,Lang.TRANSLATE_ERROR,MessageType.text)
        }
    }));
