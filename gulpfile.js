var gulp = require('gulp');
var pug = require('gulp-pug');
var del = require('del');
var gm = require('gulp-gm'); 

gulp.task('html', function buildHTML() {
  return gulp.src(['pages/*.pug', '!pages/_*.pug'])
  .pipe(pug({
    // Your options in here.
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

gulp.task('images', function copyImages() {
  return gulp.src('images/*')
  .pipe(gm(function (gmFile) {
    return gmFile.resize(800).autoOrient();
  }))
  .pipe(gulp.dest('dist'));
});

gulp.task('default', ['html', 'css']);