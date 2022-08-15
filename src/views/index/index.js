console.log(process.env.BASE_API)
console.log(process.env.NODE_ENV)
console.log(process.env.ENV_TYPE)
// import 'babel-polyfill';
if (process.env.ENV_TYPE !== 'prod') {
  const vConsole = require('vconsole')
  new vConsole()
}
import 'lib-flexible'
import '@/assets/css/normalize.css'
import '@/assets/css/reset.scss'
import './index.scss'
import _ from "lodash";
console.log(_)
// const data = 5555555555

class Person {
  constructor(name) {
    this.name = 123;
  }
  showName() {
    alert(this.name)
  }
}

const ZS = new Person('ZhangSan')
ZS.showName()

const arr = [1, 2, 3, 4, 5, 6];

const data = arr.map(val => val),
  data2 = arr.filter(val => val);

// import a from "./a.js";
// console.log(a);
/* function component() {
  const element = document.createElement("div");

  // lodash（目前通过一个 script 引入）对于执行这一行是必需的
  // element.innerHTML = _.join(["Hello", "webpack"], " ");
  element.innerHTML = "Hello webpack";
  return element;
} */
// import "./css/reset.css";
// import syncA from "./sync/a.js";
// import syncB from "./sync/b.js";
import generateUUID from "@/utils/unique";
// const generateUUID = () => import(/* webpackChunkName: "generateUUID" */ "./utils/unique")
import a from "../async/a";
// setTimeout(async () => {
//   const { default: generateUUID } = await import(/* webpackChunkName: "my-chunk-name" */ "./utils/unique");
//   console.log(generateUUID());
// }, 3000)
const setTimeoutConsoleA = (A, timer) => new Promise(resolve => setTimeout(() => resolve(A), timer))
document.getElementById("getB").onclick = async function () {
  let a = 123
  console.log(a)
  a = await setTimeoutConsoleA('setTimeoutConsoleA', 3000);
  console.log(a)
  // generateUUID().then(res => console.log(res))
  // const { default: generateUUID } = await import("./utils/unique");
  // console.log(132)
  // console.log(132)
  console.log(generateUUID());
  console.log(data)
  // require("./com.js");
  // require("./a");
  // const { default: sayHelloB } = await import("./async/b.js");
  // sayHelloB();
  // const { sayHello, sayBye } = await import("./async/c.js");
  // sayHello();
  // sayBye();
  // const { default: asyncB } = await import("./async/b.js");
  // asyncB();
  // syncA();
  // console.log(syncB);
  // const { sayHello: asyncC } = await import("./async/c.js");
  // asyncC();
  // const { generateUUID } = require("./a");
  // console.log(generateUUID());
  /* var setT = "";
  setTimeout(() => {
    setT = "setTimeouts";

    const a = require("./" + setT + ".js");
    console.log(a);
  }, 1000); */
};
// document.body.appendChild(component());
