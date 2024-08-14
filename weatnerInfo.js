const axios = require('axios');
const cheerio = require('cheerio');

// 서울 날씨 크롤링
async function weatherInfo() {
    try {
        const url = 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EC%82%BC%EC%84%B1%EB%9D%BC%EC%9D%B4%EC%98%A8%EC%A6%88%ED%8C%8C%ED%81%AC+%EB%82%A0%EC%94%A8';
        const response = await axios.get(url, { 
            headers: { 'User-Agent': 'Mozilla/5.0' } 
        });

        const html = response.data;
        const $ = cheerio.load(html);
        
        const temps = $('div.graph_inner._hourly_weather').text().trim();
        let result = "";

        let startIndex = 0;
        for (let i = 0; i < 8; i++) {
            const weather = temps.substring(startIndex, startIndex + 16);
            startIndex += 23;
            result += weather + "\n";
        }

        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

weatherInfo();
