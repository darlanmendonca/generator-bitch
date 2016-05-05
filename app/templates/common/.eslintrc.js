'use strict';

let optional = 1;
let required = 2;

module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true
  },
  globals: {
    angular: true,
    ENV: true,
    describe: true,
    it: true
  },<% if (appFramework === 'angular') { %>
  plugins: [
    'angular'
  ],<% } %>
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
    // 'newline-per-chained-call': required,
    'keyword-spacing': required,
    'key-spacing': [required, {afterColon: true}],
    'space-unary-ops': required,<% if (appFramework === 'angular') { %>

    'angular/module-getter': required,
    'angular/module-setter': required,
    'angular/no-private-call': required,
    'angular/component-limit': required,
    'angular/controller-as-route': required,
    'angular/controller-as': required,
    'angular/controller-name': required, // need improve regex
    // 'angular/file-name': required // need other options, like dot syntax intead camelcase
    'angular/di': [required, 'function'],
    'angular/function-type': [required, 'named'],
    'angular/angularelement': [required],
    'angular/definedundefined': [required],
    'angular/typecheck-array': required,
    'angular/typecheck-date': required,
    'angular/typecheck-function': required,
    'angular/typecheck-number': required,
    'angular/typecheck-object': required,
    'angular/typecheck-string': required<% } %>
  }
};
