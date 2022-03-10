const chalk = require('chalk');
const {WAConnection, MessageOptions, MessageType, Mimetype} = require('@adiwajshing/baileys');
const {StringSession} = require('./sanuwabot/');
const fs = require('fs');

async function botsanuwa () {
    const conn = new WAConnection();
    const Session = new StringSession();  
    conn.version = [3, 3234, 9]
    conn.logger.level = 'warn';
    conn.regenerateQRIntervalMs = 50000;

    conn.on('connecting', async () => {
        console.log(`${chalk.green.bold('Whats')}${chalk.blue.bold('Asena')}
${chalk.white.italic('Botsanuwa Sting session')}
${chalk.blue.italic('ℹ️  Connecting to Whatsapp... Please Wait.')}`);
    });
    conn.on('open', async () => {
        var st = Session.createStringSession(conn.base64EncodedAuthInfo());
        console.log(
            chalk.green.bold(conn.user.jid.startsWith('90') || conn.user.jid.startsWith('94') ? 'Session ekata danna one code eka: ' : 'String Code: '), st
        );

        if (!fs.existsSync('config.env')) {
            fs.writeFileSync('config.env', `BOTSANUWA_SESSION="${st}"`);
        }
        console.log(conn.user.jid.startsWith('90') || conn.user.jid.startsWith('94') ? 'meka katawath denna epa ' + conn.user.name : 'Dont Share This Code to Anyone ' + conn.user.name)
        process.exit(0);
    });
    await conn.connect();
}
botsanuwa()
