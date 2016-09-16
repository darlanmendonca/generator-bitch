'use strict';

let optional = 1;
let required = 2;

module.exports = {
  env: {
    node: true,
    es6: true,
    mocha: true,
    protractor: true,
  },
  globals: {
    expect: true,
  },
  rules: {
    semi: [required, 'always'],
    'comma-dangle': [required, 'always-multiline'],
    'comma-style': [required, 'last'],
    indent: [required, 2],
    curly: [required, 'all'],
    'brace-style': [required, '1tbs'],
    quotes: [required, 'single'],
    'object-curly-spacing': [required, 'never'],
    'array-bracket-spacing': [required, 'never'],
    'space-infix-ops': [required, {int32Hint: false}],
    'no-var': required,
    strict: required,
    'no-undef': required,
    'no-unused-vars': [required, {vars: 'all', args: 'after-used'}],
    'block-scoped-var': required,
    camelcase: required,
    'eol-last': required,
    eqeqeq: [required, 'smart'],
    'max-depth': [optional, 3],
    'max-len': [optional, 120],
    'max-statements': [optional, 15],
    'new-cap': optional,
    'no-extend-native': required,
    'no-mixed-spaces-and-tabs': required,
    'no-trailing-spaces': required,
    'no-multiple-empty-lines': [required, {max: 1, maxBOF: 0}],
    'block-spacing': [required, 'never'],
    'newline-per-chained-call': required,
    'keyword-spacing': required,
    'key-spacing': [required, {afterColon: true}],
    'space-unary-ops': required,
  }
};
