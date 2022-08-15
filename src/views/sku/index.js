/* import generateUUID from "./utils/generateUUID";
console.log(generateUUID());
 */
import generateUUID from "../../utils/unique";
console.log(generateUUID());
console.log(456789)
// setTimeout(async () => {
//   const { default: generateUUID } = await import(
//     /* webpackChunkName: "my-chunk-name2" */
//    "./utils/generateUUID");
//   console.log(generateUUID());
// }, 3000)