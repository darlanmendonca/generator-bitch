A simple generator (for Yeoman) to scaffolding web apps. Server, client, or both.

# ![yo bitch](https://s-media-cache-ak0.pinimg.com/736x/8e/92/49/8e92494fa649c20fea2cd27de1f4d254.jpg)

### Install and use
First install this module as global
```sh
npm i -g generator-bitch
```

And to use, run:
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

### This generator, offer as:

#### Task runner
[Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md){:target="_blank"} (because it's fast! Thanks to the node streams.)
- lint scripts (using [jshint](http://jshint.com/about){:target="_blank"})
- dependency injection
- compile (and/or validate) template views
- [autoprefixer](https://github.com/postcss/autoprefixer-core){:target="_blank"} css properties
- compile preprocessors
- [sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps){:target="_blank"} to preprocessors and scripts
- livereload (with [Browsersync](http://www.browsersync.io){:target="_blank"})
- sprite images from png's (with [spritesmith](https://github.com/Ensighten/spritesmith){:target="_blank"} and pngsmith)
- concatenation and minification (styles and scripts)
- restart automatically server (with [nodemon](http://nodemon.io){:target="_blank"})
- watch files, to running all tasks automatically
- [ngAnnotate](https://github.com/olov/ng-annotate){:target="_blank"} (to Angular)

#### Client

Views
- [Jade](https://github.com/jadejs/jade){:target="_blank"}
- [EJS](https://github.com/tj/ejs){:target="_blank"}

Frontend Frameworks
- [Angular.js](https://angularjs.org){:target="_blank"}

Styles
  - [Sass](http://sass-lang.com/guide){:target="_blank"} (using libsass from node-sass)
  - [Less](http://lesscss.org/features/){:target="_blank"}
  - [Stylus](https://learnboost.github.io/stylus/){:target="_blank"}

Scripts
- Javascript
- [CoffeeScript](http://coffeescript.org/){:target="_blank"}


<!-- Tools and frameworks:
- jQuery (2x)
- Angular.js
- Bootstrap
- Foundation -->


#### Backend

Server
- [Node.js](https://nodejs.org/){:target="_blank"}
- [Express 4x](http://expressjs.com/4x/api.html){:target="_blank"}
- MVC
- Config (with environments)
- ORM's

Databases
- [MongoDB](https://www.mongodb.org/){:target="_blank"} (with [Mongoose](http://mongoosejs.com/){:target="_blank"})
- Redis (soon)
- MySQL (soon)

