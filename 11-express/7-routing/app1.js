import express from 'express';

const app = express();

app.use(express.json());

// 하나하나 나열
// 반복된 경로 존재
app.get('/posts', (req, res) => {
  res.status(201).send('GET: /posts');
});

app.post('/posts', (req, res) => {
  res.status(201).send('POST: /posts');
});

app.put('/posts/:id', (req, res) => {
  res.status(201).send('PUT: /posts/:id');
});

app.delete('/posts/:id', (req, res) => {
  res.status(201).send('DELETE: /posts/:id');
});

app.listen(8080);
