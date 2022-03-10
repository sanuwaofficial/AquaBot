const Aqua = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');
const config = require('../config');
const Heroku = require('heroku-client');
const heroku = new Heroku({
    token: config.HEROKU.API_KEY
});

let baseURI = '/apps/' + config.HEROKU.APP_NAME;
var l_dsc = ''
    var alr_on = ''
    var alr_off = ''
    var succ_on = ''
    var succ_off = ''
    if (config.LANG == 'SI') {
        l_dsc = 'AntiLink මෙවලම සක්‍රිය කරයි.'
        alr_on = 'AntiLink දැනටමත් ස්ක්‍රිය කර ඇත.'
        alr_off = 'AntiLink දැනට අක්‍රිය කර ඇත!'
        succ_on = 'AntiLink සාර්ථකව ස්ක්‍රිය විය!'
        succ_off = 'AntiLink සාර්ථකව අක්‍රිය විය!'
    }
    if (config.LANG == 'EN') {
        l_dsc = 'Activates the Antilink tool.'
        alr_on = 'Antilink is already open!'
        alr_off = 'Antilink is currently closed!'
        succ_on = 'Antilink Opened Successfully!'
        succ_off = 'Antilink Closed Successfully!'
    }
 Aqua.addCommand({pattern: 'antilink ?(.*)', fromMe: true, desc: l_dsc, usage: '.antilink on / off' }, (async (message, match) => {
        const anti_status = `${config.ANTİLİNK}`
        if (match[1] == 'on') {
            if (anti_status == 'true') {
                return await message.client.sendMessage(message.jid, '*' + alr_on + '*', MessageType.text)
            }
            else {
                await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['ANTİ_LİNK']: 'true'
                    } 
                });
                await message.client.sendMessage(message.jid, '*' + succ_on + '*', MessageType.text)
            }
        }
        else if (match[1] == 'off') {
            if (!anti_status == 'true') {
                return await message.client.sendMessage(message.jid, '*' + alr_off + '*', MessageType.text)
            }
            else {
                await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['ANTİ_LİNK']: 'false'
                    } 
                });
                await message.client.sendMessage(message.jid, '*' + succ_off + '*', MessageType.text)
            }
        }
    }));
    var auto_dsc = ''
    var alr_on_bio = ''
    var alr_off_bio = ''
    var succ_on_bio = ''
    var succ_off_bio = ''
    if (config.LANG == 'SI') {
        auto_dsc = 'ඔබේ About (bio) එකට වෙලාව සහ දිනය එකතු කරයි'
        alr_on_bio = 'AutoBio දැනටමත් සක්‍රියයි!'
        alr_off_bio = 'AutoBio දැනට අක්‍රියයි!'
        succ_on_bio = 'AutoBio සාර්ථකව සක්‍රිය විය!'
        succ_off_bio = 'AutoBio සාර්ථකව අක්‍රිය විය!'
    }
    if (config.LANG == 'EN') {
        auto_dsc = 'Add live clock to your bio!'
        alr_on_bio = 'Autobio is already open!'
        alr_off_bio = 'Autobio is currently closed!'
        succ_on_bio = 'Autobio Opened Successfully!'
        succ_off_bio = 'Autobio Closed Successfully!'
    }
    
    Aqua.addCommand({pattern: 'autobio ?(.*)', fromMe: true, desc: auto_dsc, usage: '.autobio on / off' }, (async (message, match) => {
        const bio_status = `${config.AUTOBİO}`
        if (match[1] == 'on') {
            if (bio_status == 'true') {
                return await message.client.sendMessage(message.jid, '*' + alr_on_bio + '*', MessageType.text)
            }
            else {
                await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['AUTO_BİO']: 'true'
                    } 
                });
                await message.client.sendMessage(message.jid, '*' + succ_on_bio + '*', MessageType.text)
            }
        }
        else if (match[1] == 'off') {
            if (bio_status !== 'true') {
                return await message.client.sendMessage(message.jid, '*' + alr_off_bio + '*', MessageType.text)
            }
            else {
                await heroku.patch(baseURI + '/config-vars', { 
                    body: { 
                        ['AUTO_BİO']: 'false'
                    } 
                });
                await message.client.sendMessage(message.jid, '*' + succ_off_bio + '*', MessageType.text)
            }
        }
    }));
