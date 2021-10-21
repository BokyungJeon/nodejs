// 계획
// 1. 사용자가 정리를 원하는 폴더의 이름을 받아온다.(실행 시 nodemon app.js 폴더명 으로argv로 전달함)
// 2. 그 폴더 안에 video, captured, duplicated 폴더를 만든다.
// 3. 폴더 안에 있는 파일들을 다 돌면서 해당하는 mp4|mov, png|aae, IMG_1234 (IMB_E1234)

const path = require("path");
const os = require("os");
const fs = require("fs");

// 1. 사용자가 원하는 폴더의 이름을 받아온다.
// console.log(process.argv);
const folder = process.argv[2]; // 사용자가 전달한 폴더명을 받아
const workingDir = path.join(os.homedir(), "Pictures", folder); // 작업할 디렉토리를 풀디렉토리명으로 만든다

if (!folder || !fs.existsSync(workingDir)) {
  // 폴더명을 전달받지 못했거나 해당 디렉토리가 존재하지 않으면 에러
  console.error("Please enter folder name in Pictures");
  return;
}

// console.log(workingDir);

// 2. 그 폴더 안에 video, captured, duplicated 폴더를 만든다.
const videoDir = path.join(workingDir, "video");
const capturedDir = path.join(workingDir, "captured");
const duplicatedDir = path.join(workingDir, "duplicated");

!fs.existsSync(videoDir) && fs.mkdirSync(videoDir); // 같은 이름이 없으면 디렉토리를 만들고 있으면 넘어간다.
!fs.existsSync(capturedDir) && fs.mkdirSync(capturedDir);
!fs.existsSync(duplicatedDir) && fs.mkdirSync(duplicatedDir);

// 3. 폴더 안에 있는 파일들을 다 돌면서 해당하는 mp4|mov, png|aae, IMG_1234 (IMB_E1234)
fs.promises
  .readdir(workingDir) //
  .then(processFiles) // (file) => {processFiles(file)} 전달하는 인자와 콜백함수가 받는 인자가 같으면 생략 가능
  .catch(console.log);

function processFiles(files) {
  files.forEach((file) => {
    if (isVideoFile(file)) {
      move(file, videoDir);
    } else if (isCapturedFile(file)) {
      move(file, capturedDir);
    } else if (isDuplicatedFile(files, file)) {
      move(file, duplicatedDir);
    }
  });
}

function isVideoFile(file) {
  const regExp = /(mp4|mov)$/gm;
  const match = file.match(regExp);
  //   console.log(match);
  return !!match; // 배열을 boolean으로 바꾸기위해 앞에 !!
}

function isCapturedFile(file) {
  const regExp = /(png|aae)$/gm;
  const match = file.match(regExp);
  return !!match;
}

function isDuplicatedFile(files, file) {
  if (!file.startsWith("IMG_") || file.startsWith("IMG_E")) {
    return false;
  }

  const edited = `IMG_E${file.split("_")[1]}`;
  const found = files.find((f) => f.includes(edited));
  return !!found;
  return true;
}

function move(file, targetDir) {
  console.info(`move ${file} to ${path.basename(targetDir)}`);
  const oldPath = path.join(workingDir, file);
  const newPath = path.join(targetDir, file);
  fs.promises //
    .rename(oldPath, newPath)
    .catch(console.error);
}
