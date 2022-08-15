// import generateUUID from "../utils/generateUUID";
const { default: generateUUID } = require("../utils/generateUUID");
console.log("async c");
export function sayHello() {
  console.log(" Hello async C", generateUUID());
}

export function sayBye() {
  console.log(" Bye async C");
}
