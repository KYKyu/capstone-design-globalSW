// index.js
const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');


// 정적 파일을 제공하기 위해 public 폴더를 사용합니다.
app.use(express.static('public'));
const spawn = require('child_process').spawn;

app.get('/weather', async (req, res) => {
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

      res.send(result);
  } catch (error) {
      res.status(500).send('Error occurred while fetching weather data: ' + error.message);
  }
});

// 기본 경로에서 index.html 파일을 렌더링합니다.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

app.get('/event', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'event.html'));
});

app.get('/food', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'food.html'));
});

app.get('/lineup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'lineup.html'));
});

// 서버를 포트 3000에서 실행합니다.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});