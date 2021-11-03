import express from 'express';

const app = express();

app.use(express.json());

// .route를 사용해 체이닝으로 경로 반복 제거
// 그러나 복잡한 서버는 경로가 여러개 존재하므로 app.route로 경로를 나열하는 것은 가독성, 모듈성, 유지보수성 좋지 않음
app
  .route('/posts')
  .get((req, res) => {
    res.status(201).send('GET: /posts');
  })
  .post((req, res) => {
    res.status(201).send('POST: /posts');
  });

app
  .route('/posts/:id')
  .put((req, res) => {
    res.status(201).send('PUT: /posts/:id');
  })
  .delete((req, res) => {
    res.status(201).send('DELETE: /posts/:id');
  });

app.listen(8080);
