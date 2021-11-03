import express from "express";
import cors from "cors";

const app = express();

// CORS(Cross-origin resource sharing) policy - 브라우저만 갖고 있는 CORS 정책
// 클라이언트와 서버가 동일한 IP에서 동작하고 있다면 리소스를 별다른 제약없이 주고받을 수 있지만,
// 서버와 다른 도메인(또는 IP)에 있다면 원칙적으로는 어떤 데이터도 주고받을 수 없다. -보안상의 이유
// 클라이언트와 서버가 다를 때(프론트엔드에서 서버로 데이터를 받아오고 싶을 때) 데이터를 주고 받기위해서는
// 서버가 클라이언트에 응답을 보낼 때 header에 Access-Control-Allow-Origin을 추가해줘야한다.
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, GET, POST, PUT, DELETE"
//   );
//   next();
// });

// 위처럼 일일이 설정하는 대신 npm i cors로 cors를 사용하면 간단히 설정할 수 있다.
// 옵션을 안쓰면 app.use(cors()); 모든 ip의 접근을 허용
app.use(
  cors({
    origin: ["http://127.0.0.1:5500"], // 우리가 베포한 클라이언트만 데이터 받을 수 있도록 지정
    optionsSuccessStaus: 200, // 200으로 자동응답
    credentials: true, // Access-Control-Allow-Credentials: true와 동일. header에 토큰같은 사용자의 정보 추가하는 것을 허용
  })
);

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.listen(8080);
