const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');

// Serve static files from the public folder
app.use(express.static('public'));

app.get('/weather', async (req, res) => {
  try {
    const url = 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EC%82%BC%EC%84%B1%EB%9D%BC%EC%9D%B4%EC%98%A8%EC%A6%88%ED%8C%8C%ED%81%AC+%EB%82%A0%EC%94%A8';
    const response = await axios.get(url, { 
        headers: { 'User-Agent': 'Mozilla/5.0' } 
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // Initialize an array to hold weather information
    const weatherData = [];

    // Select the weather data for the next 8 hours
    $('div.graph_inner._hourly_weather ul').children().each((i, elem) => {
        // Extract time
        const time = $(elem).find('span.cell_time').text().trim();

        // Extract temperature
        const temp = $(elem).find('span.cell_temperature').text().trim();

        // Extract weather icon
        const weatherIconClass = $(elem).find('span.cell_weather').attr('class');
        let icon = 'cloud.png'; // default

        if (weatherIconClass.includes('ico_sun')) {
            icon = 'sun.png';
        } else if (weatherIconClass.includes('ico_cloud')) {
            icon = 'cloud.png';
        } else if (weatherIconClass.includes('ico_rain')) {
            icon = 'rain.png';
        }

        // Push the weather data for the current hour
        weatherData.push({
            time,
            temp,
            icon
        });

        // Only capture the next 8 hours
        if (i >= 7) return false;
    });

    res.json(weatherData);
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