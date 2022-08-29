import generateUUID from '../../utils/unique';
console.log(456789, generateUUID());
// setTimeout(async () => {
//   const { default: generateUUID } = await import(
//     /* webpackChunkName: "my-chunk-name2" */
//    "./utils/generateUUID");
//   console.log(generateUUID());
// }, 3000)
