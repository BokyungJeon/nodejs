import express from 'express';

const app = express();

app.use(express.json()); // REST API -(parse)-> Body
app.use(express.urlencoded({ extended: false })); // HTML Form -(parse)-> Body
const options = {
  dotfiles: 'ignore', // 숨겨진 파일 무시
  etag: false,
  index: false,
  maxAge: '1d', // 얼마나 오래 캐시 가능한지
  redirect: false,
  setHeaders: function (res, path, stat) { // 필요한 데이터 헤더에 추가해서 보냄
    res.set('x-timestamp', Date.now());
  },
};
app.use(express.static('public', options));

app.post('/posts', (req, res) => {
  console.log(req.body);
  res.status(201).send('Thanks, Created');
});

app.listen(8080);
