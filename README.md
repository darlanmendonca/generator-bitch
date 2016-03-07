[![Build Status](https://travis-ci.org/darlanmendonca/generator-bitch.svg)](https://travis-ci.org/darlanmendonca/generator-bitch) 
[![Coverage Status](https://coveralls.io/repos/darlanmendonca/generator-bitch/badge.svg?branch=master&service=github)](https://coveralls.io/github/darlanmendonca/generator-bitch?branch=master)
[![npm version](https://badge.fury.io/js/generator-bitch.svg)](https://badge.fury.io/js/generator-bitch)

A simple generator (for Yeoman) to scaffolding web applications, just frontend stack.

Writed in Ecma Script 6 (but you choose how you want your application, in Ecma Scrit 6, or 5).

# ![yo bitch](https://s-media-cache-ak0.pinimg.com/736x/8e/92/49/8e92494fa649c20fea2cd27de1f4d254.jpg)

### This generator, offer as:

#### Task runner
[Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) (because it's fast! Thanks to the node streams.)
- lint scripts (using [jshint](http://jshint.com/about))
- dependency injection
- compile (and/or validate) template views
- [autoprefixer](https://github.com/postcss/autoprefixer-core) css properties
- compile preprocessors
- [sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) to preprocessors and scripts
- livereload (with [Browsersync](http://www.browsersync.io))
- sprite images from png's (with [spritesmith](https://github.com/Ensighten/spritesmith) and pngsmith)
- concatenation and minification (styles and scripts)
- watch files, to running all tasks automatically
- compile es6 client scripts to es5  with [Babel](https://babeljs.io/) (if you choose es5 has script type)
- [ngAnnotate](https://github.com/olov/ng-annotate) (to Angular)

Views
- [Jade](https://github.com/jadejs/jade)
- [EJS](https://github.com/tj/ejs)

Frontend Frameworks
- [Angular.js](https://angularjs.org)

Styles
  - [Sass](http://sass-lang.com/guide) (using [libsass](https://github.com/sass/libsass) from [node-sass](https://www.npmjs.com/package/node-sass))
  - [Less](http://lesscss.org/features/)
  - [Stylus](https://learnboost.github.io/stylus/)

Scripts
- Javascript
  - Ecma 6
  - Ecma 5


<!-- Tools and frameworks:
- jQuery (2x)
- Angular.js
- Bootstrap
- Foundation -->


#### Tests
At moment, I added test specs to api controllers (integration tests), and Angular controllers (unit tests):

- [Mocha](http://mochajs.org/) as test framework
- [Karma](http://karma-runner.github.io/) Angular Unit Tests
- [Chai](http://chaijs.com) (to make assertions)

And soon, I will add e2e with Protractor. I want cover the entire application with tests.

### Requirements
This generator, is a yeoman generator, and require following modules:

- yo
- gulp
- bower

To install these:
```sh
npm i -g yo gulp bower
```

### Install and use

First install this module as global
```sh
npm i -g generator-bitch
```

And to use, go to a empty folder, where you want generate project, and run:
```sh
yo bitch
```
or
```sh
yo bitch nameProject
```

After install dependencies (with npm and/or bower), running your project using default task on Gulp, running:

```sh
gulp
```

If you use client too, you can pass a flag to gulp, to open automatically on your Google Chrome (editable on gulpfile), running:

```sh
gulp --open
```


#### License

The MIT License (MIT)

Copyright (c) 2016 Darlan Mendonça
