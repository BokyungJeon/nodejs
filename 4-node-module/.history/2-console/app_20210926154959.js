console.log("logging....");
console.clear();

// log level
console.log("log"); // 개발
console.info("info"); // 정보
console.warn("warn"); // 경보
console.error("error"); // 에러, 사용자 에러, 시스템 에러

// assert - 값이 false일때만 출력
console.assert(2 === 3, "not same!");
console.assert(2 === 2, "same!");

// print object - 다양한 모양으로 출력 가능
const student = { name: "ellie", age: 20, company: { name: "AC" } };
console.log(student);
console.table(student);
console.dir(student, { showHidden: true, colors: false, depth: 0 });

// measuring time - 시간 측정 가능
console.time("for loop");
for (let i = 0; i < 10; i++) {
  i++;
}
console.timeEnd("for loop");

// counting - 횟수 측정 가능
function a() {
  console.count("a function");
}
a();
console.countReset("a function");
a();

// trace - 호출 순서 추적 가능
function f1() {
  f2();
}
function f2() {
  f3();
}
function f3() {
  console.log("f3");
  console.trace();
}
f1();
