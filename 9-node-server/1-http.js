const http = require("http");
const fs = require("fs");
// const http2 = require('http2); // https

// console.log(http.STATUS_CODES);
// console.log(http.METHODS);
const server = http.createServer((req, res) => {
  console.log("incoming...");
  console.log(req.headers);
  console.log(req.httpVersion);
  console.log(req.method);
  console.log(req.url);
  const url = req.url;
  res.setHeader("Content-Type", "text/html");
  if (url === "/") {
    const read = fs.createReadStream("./html/index.html"); // 터미널에서 실행하는 경로 기준으로 경로작성
    read.pipe(res);
    // res.write("<html>");
    // res.write("<head><title>Academy</title></head>");
    // res.write("<body><h1>Welcome!</h1></body>");
    // res.write("</html>");
  } else if (url === "/courses") {
    fs.createReadStream("./html/courses.html").pipe(res);
  } else {
    fs.createReadStream("./html/not-found.html").pipe(res);
  }
  //   res.end();
  // pipe는 비동기함수로 호출해놓고 작업끝나길 안기다리고 다음 코드라인으로 넘어가므로 pipe되는 중간에 res.end()를 호출하게되면 파이핑이 멈춤.
  // pipe가 끝나면 자동으로 end()처리가 되므로 호출할 필요없다.
});

server.listen(8080);
