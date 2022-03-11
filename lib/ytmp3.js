const cheerio = require("cheerio")
const axios = require("axios")

async function ytmp3(link) {
const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
		if (ytIdRegex.test(link)) {
		let url =  ytIdRegex.exec(link)
		let config = {
			'url': 'https://www.youtube.be/' + url,
			'q_auto': 0,
			'ajax': 1
		}
		let headerss = 	{
			"sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
			"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
			"Cookie": 'PHPSESSID=6jo2ggb63g5mjvgj45f612ogt7; _ga=GA1.2.405896420.1625200423; _gid=GA1.2.2135261581.1625200423; _PN_SBSCRBR_FALLBACK_DENIED=1625200785624; MarketGidStorage={"0":{},"C702514":{"page":5,"time":1625200846733}}'
		}

const res =	await axios('https://www.y2mate.com/mates/en68/analyze/ajax',{
			method: 'POST',
			data: new URLSearchParams(Object.entries(config)),
			headers: headerss
		}) 
   const $ = cheerio.load(res.data.result)
   let title = $('div.thumbnail.cover > div > b').text();
   let size = $('#audio > table > tbody > tr:nth-child(1) > td:nth-child(2)').text()
	 let id = /var k__id = "(.*?)"/.exec(res.data.result)[1]
    
    
   let configs = {
    type: 'youtube',
    _id: id,
    v_id: url[1],
    ajax: '1',
    token: '',
    ftype: 'mp3',
    fquality: 128
  }
   
   const res2 =	await axios('https://www.y2mate.com/mates/en68/convert',{
		                         method: 'POST',
		                         data: new URLSearchParams(Object.entries(configs)),
		                         headers: headerss }) 
   
    const $2 = cheerio.load(res2.data.result)
		let audio = $2('div > a').attr('href')
		let final = {
			title: title,
			size: size,
      mp3: audio
                 }
	return final;
		}else{
        let final = 'error'
        return final
        }}

module.exports = ytmp3 ;
