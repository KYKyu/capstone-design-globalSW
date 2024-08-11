// index.js
const express = require('express');
const path = require('path');
const app = express();

// 정적 파일을 제공하기 위해 public 폴더를 사용합니다.
app.use(express.static('public'));

// 기본 경로에서 index.html 파일을 렌더링합니다.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 서버를 포트 3000에서 실행합니다.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
