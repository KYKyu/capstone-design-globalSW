const axios = require('axios');
const cheerio = require('cheerio');

async function weatherInfo() {
    try {
        const url = 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EC%82%BC%EC%84%B1%EB%9D%BC%EC%9D%B4%EC%98%A8%EC%A6%88%ED%8C%8C%ED%81%AC+%EB%82%A0%EC%94%A8';
        const response = await axios.get(url, { 
            headers: { 'User-Agent': 'Mozilla/5.0' } 
        });

        const html = response.data;
        const $ = cheerio.load(html);
        
        const temps = $('div.graph_inner._hourly_weather').text().trim();
        const words = temps.split(/\s+/); // 공백으로 텍스트를 나누어 단어 배열 생성
        let result = "";

        let index = 0;
        for (let i = 0; i < 8; i++) {
            const weather = words.slice(index, index + 3).join(' '); // 3 단어씩 가져오기
            index += 3;
            result += weather + "\n";
        }

        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

weatherInfo();
