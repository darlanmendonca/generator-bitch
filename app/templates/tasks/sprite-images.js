'use strict';

let gulp = require('gulp');
let spritesmith = require('gulp.spritesmith');
let plumber = require('gulp-plumber');
let gulpConfig = require('./gulp.config.js');

let options = {
	imgName: 'sprites.png',
	cssName: 'sprite-vars.<%= extPreprocessor %>',
	imgPath: '../imgs/sprites/sprites.png',
	algorithm: 'binary-tree',
	engine: 'pngsmith',
	cssVarMap: function (sprite) {
		sprite.name = 'sprite-'+sprite.name;
	}
};

gulp.task('sprites', spritesTask);

function spritesTask() {
  let sprite = gulp.src(gulpConfig.sprites.src)
    .pipe(plumber())
    .pipe(spritesmith(options));

  sprite.img.pipe(gulp.dest(gulpConfig.sprites.dest));
  sprite.css.pipe(gulp.dest('./client/styles/components/'));
}
