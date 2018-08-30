var gulp = require('gulp');
var pug = require('gulp-pug');
var del = require('del');
 
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
})

gulp.task('default', ['html', 'css']);