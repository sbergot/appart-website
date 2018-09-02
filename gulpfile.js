var gulp = require('gulp');
var pug = require('gulp-pug');
var del = require('del');
var gm = require('gulp-gm'); 
var using = require('gulp-using');

gulp.task('html', function buildHTML() {
  return gulp.src(['pages/*.pug', '!pages/_*.pug'])
  .pipe(pug({
    data: {
      images: [
        'Salon',
        'Salon2',
        'Vue',
        'Cuisine',
        'Cuisine2'
      ]
    }
  }))
  .pipe(gulp.dest('dist'));
});

gulp.task('css', function buildCss() {
  return gulp.src('./*.css')
  .pipe(gulp.dest('dist'));
});

gulp.task('clean', function clean() {
  return del('dist');
});

function copyImages(size, folder) {
  return () => gulp.src('images/*')
    .pipe(using({prefix: `Resizing file to ${size}`, filesize: true}))
    .pipe(gm(function (gmFile) {
      return gmFile.resize(size, size).autoOrient();
    }))
    .pipe(gulp.dest(`dist/${folder}`));
}

gulp.task('images:big', copyImages(800, 'photos'));
gulp.task('images:medium', copyImages(300, 'photos-medium'));
gulp.task('images:thumbnails', copyImages(100, 'thumbnails'));
gulp.task('images', ['images:big', 'images:medium', 'images:thumbnails']);

gulp.task('default', ['html', 'css']);

gulp.task('watch', ['html', 'css'], function watch() {
  gulp.watch('./*.css', ['css']);
  gulp.watch(['pages/*.pug', '!pages/_*.pug'], ['html']);
});