import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";

const app = express();

// 많이 사용되는 미들웨어들
// cors
// cookie-parser
// morgan
// helmet
// http://expressjs.com/en/resources/middleware/morgan.html

// cookie-parser
// Postman을 사용해 get요청에 Header에 다음과 같이 쿠키 설정
// key: Cookie, value: yummy_cookie=choco; tasty_cookie=strawberry

const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200, // for options request
  credentials: true, // Access-Control-Allow-Credentials: true
};

app.use(express.json()); // req.body를 보기위해 사용
app.use(cookieParser()); // req에 있는 쿠키를 보기위해 사용
app.use(cors(corsOptions));
app.use(morgan("common")); // 사용자에게서 요청을 받을때마다 어떤요청인지, 얼마나걸렸는지 로그남기는 것을 자동으로 해줌.
//기본옵션 morgan('combined'), 옵션 'common', 'tiny'등등.. git에서 확인 가능
app.use(helmet()); // 공통적으로 보안에 필요한 헤더들을 자동으로 추가해줌 gitio에서 확인가능

app.get("/", (req, res) => {
  console.log(req.cookies); // cookie-parser를 사용하지 않으면 undefined로 나옴
  console.log(req.cookies.yummy_cookie);
  res.send("Welsome!");
});

app.listen(8080);
