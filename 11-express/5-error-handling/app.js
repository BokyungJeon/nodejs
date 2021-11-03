import express from 'express';
import fs from 'fs';
import fsAsync from 'fs/promises';

const app = express();

app.use(express.json());
// 서버는 에러가 나서 멈춰버리면 모든 사람이 이용이 불가능하므로 에러를 잘 처리해줘야 한다.
// 에러를 잘 처리한다는 뜻은
// 1.클라이언트가 요청한 리퀘스트가 처리가 안됐을 때 적절한 에러 메세지(충분한 에러 내용)를 클라이언트로 보낸다.
// 2. 시스템 내부적으로 큰 문제 발생해도 서버가 죽지 않고 문제 상황에서 빠르게 복귀될 수 있도록 에러처리를 잘 한다.


// 각각의 미들웨어에서 에러가 발생했을 때 사용자에게 적절한 메세지를 보내줘야한다.
app.get('/file1', (req, res) => {
  // 1. fs.readFileSync는 동기적이므로 함수가 다 실행되어야 다음으로 넘어간다.
  // 동기함수에서는 에러가 나면 에러가 던져지므로 try catch로 에러를 잡거나
  // 실수로 에러처리를 하지 않으면 마지막 안전망인 app.use((error,..)=>{}) 미들웨어가 에러를 포착하므로 여기서 처리된다.
  // try {
  //   const data = fs.readFileSync('/file1.txt');
  // } catch (error) {
  //   res.sendStatus(404);
  // }

  // 2. 그러나 fs.readFile은 비동기적이어서 에러가 나도 콜백함수 내부에서만 나고 에러가 밖으로 나오지 않는다.
  // 콜백함수 외부에 try, catch나 app.use(err)같은 처리를 해도 에러가 콜백함수 안에서 발생하면 콜백함수 밖(원래함수)으로 나오지 않으므로 밖은 계속 대기상태로 돌고있다.
  // try {
  //   fs.readFile('/file1.txt', (err, data) => {
  //     if (err) {
  //
  //     }
  //   });
  // } catch(error) {
  //   res.sendStatus(404).send('File not found');
  // }

  // 그러니 비동기를 사용할 때는 콜백함수 내부에서 에러처리를 해주어야한다.
  fs.readFile('/file1.txt', (err, data) => {
    if (err) {
      res.sendStatus(404).send('File not found');
    }
  });
});

// 3. 마찬가지로 Promise도 비동기로 콜백함수대신 .then()을 사용하고 .catch()로 에러를 처리한다.
// 내부에서 에러가 발생하므로 코드 밖에 try, catch를 작성해도 에러가 잡히지 않는다
// .catch(next)로 프로미스에서 발생한 에러를 잡아서 다음 미들웨어로 던져 마지막 에러처리 안전망(app.use(error))에서 처리하거나( = .catch((error) => {next(error)} )
// 아래처럼 내부적으로 에러를 처리해 사용자에게 에러메세지를 응답으로 던져준다.
app.get('/file2', (req, res) => {
  fsAsync
    .readFile('/file2.txt') //
    .catch((error) => {
      res.sendStatus(404).send('File not found');
    });
});

// 4. async, await을 사용하면 코드 실행 과정은 동기적으로 실행되지만 async가 붙은 함수 자체는 Promise로 감싸진(Promise를 리턴하는 = 블록안이 Promise인) 비동기함수이다.
// 따라서 error는 Promise 내부에서 발생하는것이므로 에러를 처리하지 않은 경우 외부에서 만든 안전망(app.use(error))에 포착되지 않는다.
// async함수 내부에서 try, catch(error)를 사용해 에러를 잡아주어야 한다.
app.get('/file3', async (req, res) => {
  try {
    const data = await fsAsync.readFile('/file2.txt');
  } catch {
    res.sendStatus(404).send('File not found');
  }
});

// 원래는 마지막 안전망에 걸리지 않는 Promise의 에러를 마지막 안전망에서 잡을 수 있도록 만듦.
// 1. Express 버전5 이하에서
// require('express-async-errors');           - CommonJS module(package.json => "type": "common",)
// 혹은 import {} from 'express-async-error';  - 최신 ES module(package.json => "type": "module",)
// Promise를 리턴하는 경우에만 에러를 감지해서 마지막에 포착할 수 있으므로 미들웨어 안에서 꼭 리턴을 해주어야 한다.
// app.get('/file2', (req, res, next) => {
//   return fsAsync.readFile('/file.txt');
// });

// 2. Express 5 alpha버전부터는 모듈을 따로 사용하지 않고 next(error)로 express 내부적으로 에러를 던지는 것이 가능해짐
// 즉 Promise를 사용해도 따로 에러 처리하지 않았을 시 마지막 안전망에서 에러 처리 가능

// 에러는 마지막까지 미루지 말고 각각 해당하는 미들웨어에서 처리해주는 것이 가장 좋다.
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong' });
});

app.listen(8080);
