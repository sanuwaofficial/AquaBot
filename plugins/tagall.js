const Aqua = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const Config = require('../config');

const Language = require('../language');
const Lang = Language.getString('tagall');
const SLang = Language.getString('scrapers');

async function checkImAdmin(message, user = message.client.user.jid) {
    var grup = await message.client.groupMetadata(message.jid);
    var sonuc = grup['participants'].map((member) => {
        if (member.jid.split('@')[0] === user.split('@')[0] && member.isAdmin) return true; else; return false;
    });
    return sonuc.includes(true);
}

Aqua.addCommand({pattern: 'tagall ?(.*)', fromMe: true, desc: Lang.TAGALL_DESC, deleteCommand: false  }, (async (message, match) => {
    var im = await checkImAdmin(message);
    if (!im) return await message.client.sendMessage(message.jid,Lang.ADMİN,MessageType.text);

    if (!message.reply_message) {
        if (match[1] !== '') {
            grup = await message.client.groupMetadata(message.jid);
            var jids = [];
            mesaj = '';
            grup['participants'].map(
                async (uye) => {
                    mesaj += '@' + uye.id.split('@')[0] + ' ';
                    jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
                }
            );
            await message.client.sendMessage(message.jid,`${match[1]}`, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
        }
        else if (match[1] == '') {
            grup = await message.client.groupMetadata(message.jid);
            var jids = [];
            mesaj = '';
            grup['participants'].map(
                async (uye) => {
                    mesaj += '🪀 @' + uye.id.split('@')[0] + '\n';
                    jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
                }
            );
            await message.client.sendMessage(message.jid,mesaj, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
        }
    }
    else if (message.reply_message) {
        grup = await message.client.groupMetadata(message.jid);
        var jids = [];
        mesaj = '';
        grup['participants'].map(
            async (uye) => {
                mesaj += '@' + uye.id.split('@')[0] + ' ';
                jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
            }
        );
        var tx = message.reply_message.text
        await message.client.sendMessage(message.jid,tx, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
    }
}));
var stag_dsc = ''
if (Config.LANG == 'SI') stag_dsc = 'කණ්ඩායමේ සියලුම සාමාජිකයින්ට මෙන්ශන් දුන් පණිවිඩය යවයි.'
if (Config.LANG == 'EN') stag_dsc = 'Sends the replied message to all members in the group.'

Aqua.addCommand({pattern: 'stam$', fromMe: true, desc: stag_dsc, deleteCommand: false  }, (async (message, match) => {
    if (!message.reply_message) return await message.client.sendMessage(message.jid,SLang.NEED_REPLY, MessageType.text)
    grup = await message.client.groupMetadata(message.jid);
    var jids = [];
    mesaj = '';
    grup['participants'].map(async (uye) => {
        await message.client.sendMessage(uye.jid, message.reply_message.text, MessageType.text)
    })
}));
