/* eslint-disable prettier/prettier */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    "type-enum": [
      2,
      'always',
      ['build', 'ci', 'perf', 'feat', 'fix', 'docs', 'style', 'refactor', 'test', 'revert', 'chore']
    ],
  }
};
