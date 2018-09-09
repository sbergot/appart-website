var gulp = require('gulp');
var pug = require('gulp-pug');
var del = require('del');
var gm = require('gulp-gm'); 
var using = require('gulp-using');

var dist_folder = "dist/appartement-puteaux"

gulp.task('html', function buildHTML() {
  return gulp.src(['pages/*.pug', '!pages/_*.pug'])
  .pipe(pug())
  .pipe(gulp.dest(dist_folder));
});

gulp.task('css', function buildCss() {
  return gulp.src('./*.css')
  .pipe(gulp.dest(dist_folder));
});

gulp.task('clean', function clean() {
  return del(dist_folder);
});

function copyImages(size, folder) {
  return () => gulp.src('raw_images/*.jpg')
    .pipe(using({prefix: `Resizing file to ${size}`, filesize: true}))
    .pipe(gm(function (gmFile) {
      return gmFile.resize(size, size).autoOrient();
    }))
    .pipe(gulp.dest(`images/${folder}`));
}

gulp.task('resize-images:big', copyImages(800, 'photos'));
gulp.task('resize-images:medium', copyImages(300, 'photos-medium'));
gulp.task('resize-images:thumbnails', copyImages(100, 'thumbnails'));
gulp.task(
  'resize-images',
  [
    'resize-images:big',
    'resize-images:medium',
    'resize-images:thumbnails'
  ]);

gulp.task('copy-images', function copyImages() {
  return gulp.src('images/**/*.jpg')
    .pipe(gulp.dest(dist_folder));
});

gulp.task('build:full', ['html', 'css', 'copy-images']);

gulp.task('default', ['html', 'css']);

gulp.task('watch', ['html', 'css'], function watch() {
  gulp.watch('./*.css', ['css']);
  gulp.watch(['pages/*.pug'], ['html']);
});