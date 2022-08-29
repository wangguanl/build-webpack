import generateUUID from '@/utils/unique';
export default () => {
  console.log('b', generateUUID());
  console.log(Math.random());
  return 'b';
};
