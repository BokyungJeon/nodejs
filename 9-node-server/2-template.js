const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
// const http2 = require('http2); // https

const name = "Ellie";
const courses = [
  { name: "HTML" },
  { name: "CSS" },
  { name: "Javascript" },
  { name: "Nodejs" },
  { name: "Frontend" },
];
const server = http.createServer((req, res) => {
  const url = req.url;
  res.setHeader("Content-Type", "text/html");
  if (url === "/") {
    ejs
      .renderFile("./template/index.ejs", { name }) // name: name
      .then((data) => res.end(data));
  } else if (url === "/courses") {
    ejs
      .renderFile("./template/courses.ejs", { courses }) // name: name
      .then((data) => res.end(data));
  } else {
    ejs
      .renderFile("./template/not-found.ejs", { name }) // name: name
      .then((data) => res.end(data));
  }
});

server.listen(8080);
