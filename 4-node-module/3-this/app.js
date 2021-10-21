function hello() {
  // function안에서의 this는 global이다.
  console.log(this); // global내용 길게나옴
  console.log(this === global); // true
}
hello();

class A {
  // class안에서의 this는 class 자신이다.
  constructor(num) {
    this.num = num;
  }
  memberFunction() {
    console.log("----- class -----");
    console.log(this); // A { num: 1 }
    console.log(this === global); // false
  }
}
const a = new A(1);
a.memberFunction();

// nodejs에서 동작하는 javascript와 brower에서 동작하는 javascript의 다른점
// browser에서 밖에서 쓴 this는 window라는 글로벌이다.
console.log("--- global scope ---"); // global에서 this는 module.exports이다.
console.log(this); // {}
console.log(this === module.exports); // true
