import a from './js/a';
async function render(template, data) {
  const b = await import(
    './js/b'
    /* webpackChunkName: "my-chunk-name" */
  );
  console.log(b);
  b.default();
  a();
  const tokens = [];
  // /\{\{(\w+)\}\}/g
  // /^\{\{#\w+\}\}(\w+)\{\{\/\w+\}\}$/g,
  const result = template.replace(
    /(\{\{(\w+)\}\})|(\{\{\#\w+\}\})([\s\S]*)(\{\{\/\w+\}\})/g,
    // /\{\{(\w+)\}\}/g,
    // /(\{\{\#\w+\}\})([\s\S]*)(\{\{\/\w+\}\})/g,
    (
      findStr, // 正则匹配到的
      $1,
      captureStr, // 正则捕获"()"内的，如果没有"()"直接跳过，如果有多个"()"，则依次捕获，使用$1、$2...
      ind, // 正则匹配到内容的起始下标
      originStr // 原字符串
    ) => {
      console.log('findStr：' + findStr);
      console.log('$1:' + $1);
      console.log('captureStr：' + captureStr);
      console.log('ind：' + ind);
      console.log('originStr：' + originStr);
      if (findStr) {
        if (!tokens.length) {
          const text = originStr.slice(0, ind);
          if (text.length) {
            tokens.push(['text', text, 0, ind]);
          }
          tokens.push([findStr, captureStr, ind, ind + findStr.length]);
        } else {
          const prev = tokens[tokens.length - 1], // 获取上一个元素
            prevInd = prev[prev.length - 1]; // 获取上一个元素的下标
          const text = originStr.slice(prevInd, ind);
          if (text.length) {
            tokens.push(['text', text, prevInd, prevInd + text.length]);
          }
          tokens.push([findStr, captureStr, ind, ind + findStr.length]);
        }
      }
      return data[captureStr];
    }
  );
  console.log(tokens);
  return result;
}
const data = {
  name: '张三',
  thing: '讲课',
  arr: ['游泳', '跑步', '打篮球']
};
const template = `<div>{{name}}喜欢{{thing}}</div>`;
const template2 = `{{name}}喜欢{{thing}}`;
const template3 = `{{name}}{{thing}}`;

const templateFor = `
${template}
<div>
${template2}
</div>
        <ul>
          {{#arr}}
            <li>{{.}}</li>
          {{/arr}}
        </ul>
${template3}
`;
// console.log(template.split(/\{\{(\w+)\}\}/g));
// console.log(template.match(/\{\{(\w+)\}\}/g, true));

// render(template, data);
/* console.log(template.match(/\{\{(\w+)\}\}/g)); */

// console.log(/\{\{\#\w+\}\}([\s\S]*)\{\{\/\w+\}\}/.test(templateFor));
// console.log(/\{\{\#\w+\}\}(.*)\{\{\/\w+\}\}/g.test(templateFor));
// console.log(/^\{\{\#\w+\}\}(.*)\{\{\/\w+\}\}$/g.test(templateFor));
