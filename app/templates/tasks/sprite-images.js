'use strict';

let gulp = require('gulp');
let spritesmith = require('gulp.spritesmith');
let plumber = require('gulp-plumber');
let config = require('./gulp.config.js');

let options = {
  imgName: 'sprites.png',
  cssName: 'sprite-vars.<%= extPreprocessor %>',
  imgPath: '../imgs/sprites/sprites.png',
  algorithm: 'binary-tree',
  engine: 'pngsmith',
  cssVarMap: sprite => {
    sprite.name = `sprite-${sprite.name}`;
  },
};

gulp.task('sprites', spritesTask);

function spritesTask() {
  let sprite = gulp
    .src(config.sprites.src)
    .pipe(plumber())
    .pipe(spritesmith(options));

  sprite.img.pipe(gulp.dest(config.sprites.dest));
  sprite.css.pipe(gulp.dest('./sources/styles/components/'));
}
