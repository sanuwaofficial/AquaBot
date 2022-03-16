const Aqua = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const axios = require('axios');
const Config = require('../config');

if (Config.WORKTYPE == 'public') {

    Aqua.addCommand({pattern: 'anveet',fromMe: false, desc: 'random rashmika images'}, (async (message, match) => {

    var r_text = new Array ();

r_text[0] = "https://telegra.ph/file/75becba38b73b5720ac9d.jpg";
r_text[1] = "https://telegra.ph/file/cf279d98ea8f1d364c753.jpg";
r_text[2] = "https://telegra.ph/file/1a83a47bfc7556b12bf67.jpg";
r_text[3] = "https://telegra.ph/file/f98f267960e06117b7827.jpg";
r_text[4] = "https://telegra.ph/file/37a33c015a118035b6ef1.jpg";
r_text[5] = "https://telegra.ph/file/68533976f1961be8cb691.jpg";
r_text[6] = "https://telegra.ph/file/c76b225a86f80749f4133.jpg";
r_text[7] = "https://telegra.ph/file/b8060fdbc86108728332a.jpg";
r_text[8] = "https://telegra.ph/file/2c04c5b3fd1a58e7fbf65.jpg";
r_text[9] = "https://telegra.ph/file/4c8828f0670c2c73dd87b.jpg";
r_text[10] = "https://telegra.ph/file/ef252472ee08dfa4b06aa.jpg";
r_text[11] = "https://telegra.ph/file/14ec06bade2a955872590.jpg";
r_text[12] = "https://telegra.ph/file/65a28d4561305901cd630.jpg";
r_text[13] = "https://telegra.ph/file/fe5145f4a63c7b312917c.jpg";
r_text[14] = "https://telegra.ph/file/2f5a08c55357d985cba04.jpg";
r_text[15] = "https://telegra.ph/file/c8b0b3ad30a4ad055ba45.jpg";
r_text[16] = "https://telegra.ph/file/404fd1110bad3197d46ac.jpg";
r_text[17] = "https://telegra.ph/file/6177864f05c4163035c7f.jpg";
r_text[18] = "https://telegra.ph/file/6a335ce180d8f47f92ea4.jpg";
r_text[19] = "https://telegra.ph/file/2496c8c8e4e50c53d3b8c.jpg";
r_text[20] = "https://telegra.ph/file/cd926fc0791af85f2c4cb.jpg";
r_text[21] = "https://telegra.ph/file/ec89a00ee571e15ca00e2.jpg";
r_text[22] = "https://telegra.ph/file/7abc052afc7bfba19bcbd.jpg";
r_text[23] = "https://telegra.ph/file/694a912d7696b1d31a14d.jpg";
r_text[24] = "https://telegra.ph/file/be00fbd7e44f10e2b9d1b.jpg";
r_text[25] = "https://telegra.ph/file/e7f9f059e08a4326c5da0.jpg";
r_text[26] = "https://telegra.ph/file/0c02849881175f01cd1ae.jpg";
r_text[27] = "https://telegra.ph/file/66f4b22d0100765014c0e.jpg";
r_text[28] = "https://telegra.ph/file/3b342d05a7de6a1fb51f4.jpg";
r_text[29] = "https://telegra.ph/file/08503e8a2730b31af17aa.jpg";
r_text[30] = "https://telegra.ph/file/e98a5c211ceb011706c70.jpg";
r_text[31] = "https://telegra.ph/file/1aeffa455b7cc23e4e294.jpg";
r_text[32] = "https://telegra.ph/file/df59c0deab043e538f931.jpg";
r_text[33] = "https://telegra.ph/file/35fe50282849a4e954b8d.jpg";
r_text[34] = "https://telegra.ph/file/5163bcbd4f308e96cc1f0.jpg";
r_text[35] = "https://telegra.ph/file/623ccd6f687acf1ce20ce.jpg";
r_text[36] = "https://telegra.ph/file/4909f5d5d6438623b2895.jpg";
r_text[37] = "https://telegra.ph/file/f111368935eeb9172cee0.jpg";
r_text[38] = "https://telegra.ph/file/56070980ca84439983a5f.jpg";
r_text[39] = "https://telegra.ph/file/200e5f1dc8f5db1852a38.jpg";

var i = Math.floor(40*Math.random())

    var respoimage = await axios.get(`${r_text[i]}`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer(respoimage.data), MessageType.image, {mimetype: Mimetype.png, caption:' *© DOWNLOAD BY MR NIMA  🐼* '})

    }));
}
