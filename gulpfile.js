var gulp = require('gulp');
var pug = require('gulp-pug');
 
gulp.task('html', function buildHTML() {
  return gulp.src('pages/*.pug')
  .pipe(pug({
    // Your options in here.
  }))
  .pipe(gulp.dest('dist'));
});

gulp.task('css', function buildCss() {
  return gulp.src('./*.css')
  .pipe(gulp.dest('dist'));
});

gulp.task('default', ['html', 'css']);