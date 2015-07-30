A simple generator to scaffolding web apps. Server, client, or both.

#![yo bitch](https://s-media-cache-ak0.pinimg.com/736x/8e/92/49/8e92494fa649c20fea2cd27de1f4d254.jpg)

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

After install node dependencies (and bower, if you use client too), running your project using default task on Gulp, running:

```sh
gulp
```

If you use client too, your can pass a flag to gulp, to open automatically on your Google Chrome (editable on gulpfile), running:

```sh
gulp --open
```

### This generator, offer as:

#### Task runner:
Gulp (because it's fast! Thanks to the node streams.)
- lint scripts (using jshint)
- dependency injection
- compile (and/or validate) template views
- compile preprocessors
- sourcemaps to preprocessors
- livereload (with Browsersync)
- sprite images from png's (with spritesmith and pngsmith)
- concatenation and minification (styles and scripts)
- restart automatically server (with nodemon)
- watch files, to running all tasks automatically

#### Client

Views
- Jade
- EJS

Styles
  - Sass (using libsass from node-sass)
  - Less

Scripts
- Javascript
- CoffeeScript (soon)


<!-- Tools and frameworks:
- jQuery (2x)
- Angular.js
- Bootstrap
- Foundation -->


#### Backend:

Server
- Node.js
- Express 4x
- MVC
- Config (with environments)
- ORM's

Databases
- MongoDB
- Redis (soon)
- MySQL (soon)

