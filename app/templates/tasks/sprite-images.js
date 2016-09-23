import gulp from 'gulp';
import spritesmith from 'gulp.spritesmith';
import plumber from 'gulp-plumber';
import config from './gulp.config.js';

let options = {
  imgName: 'sprites.png',
  cssName: 'sprite-vars.<%= extPreprocessor %>',
  imgPath: '../imgs/sprites/sprites.png',
  algorithm: 'binary-tree',
  engine: 'pngsmith',
  cssVarMap: sprite => sprite.name = `sprite-${sprite.name}`,
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
