const Aqua = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');
const Config = require('../config');
let wk = Config.WORKTYPE == 'public' ? false : true
const request = require('request');
const got = require("got");
const QR_DESC = 'Convert your text to a Qr Code.'
const NEED_T = 'You must enter a Text to make a Qr Code.'


Aqua.addCommand({pattern: 'qr ?(.*)', fromMe: wk, desc: QR_DESC, deleteCommand: false}, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(NEED_T);

    var qrcode = await axios.get(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${match[1].replace(/#/g, '\n')} `, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(qrcode.data), MessageType.image, {mimetype: Mimetype.jpg, caption: Config.CAPTION , quoted: message.data })

}));
