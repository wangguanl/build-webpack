module.exports = {
  // 可选类型
  types: [
    { value: 'feat', name: '新功能' },
    { value: 'fix', name: '修复' },
    { value: 'docs', name: '文档变更' },
    { value: 'style', name: '代码格式(不影响代码运行的变动)' },
    {
      value: 'refactor',
      name: '重构(既不是增加feature，也不是修复bug)'
    },
    { value: 'perf', name: '性能优化' },
    { value: 'test', name: '增加测试' },
    { value: 'chore', name: '构建过程或辅助工具的变动' },
    { value: 'revert', name: '回退' },
    { value: 'build', name: '打包' }
  ],
  // 消息步骤
  messages: {
    type: '请选择提交类型:',
    customScope: '请输入修改范围(可选):',
    subject: '请简要描述提交(必填):',
    body: '请输入详细描述(可选):',
    footer: '请输入要关闭的issue(可选):',
    confirmCommit: '确认使用以上信息提交？(y/n/e/h)'
  },
  // 跳过问题
  skipQuestions: ['body', 'footer'],
  // subject文字长度默认是72
  subjectLimit: 72
};
