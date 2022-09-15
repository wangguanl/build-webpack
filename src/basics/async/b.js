// import generateUUID from "../utils/generateUUID";
const { default: generateUUID } = require('../utils/generateUUID');
console.log('async b');
export default function sayHelloB() {
  console.log(' Hello async B ', generateUUID());
}
