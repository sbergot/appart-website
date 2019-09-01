var gulp = require('gulp');
var pug = require('gulp-pug');
var del = require('del');
var gm = require('gulp-gm'); 
var using = require('gulp-using');

var dist_folder = "dist/appartement-puteaux"

function html() {
  return gulp.src(['pages/*.pug', '!pages/_*.pug'])
  .pipe(pug())
  .pipe(gulp.dest(dist_folder));
}

function css() {
  return gulp.src('./*.css')
  .pipe(gulp.dest(dist_folder));
}

function clean() {
  return del(dist_folder);
}

function resizeImages(size, folder) {
  return () => gulp.src('raw_images/*.jpg')
    .pipe(using({prefix: `Resizing file to ${size}`, filesize: true}))
    .pipe(gm(function (gmFile) {
      return gmFile.resize(size, size).autoOrient();
    }))
    .pipe(gulp.dest(`images/${folder}`));
}

var resize_images = gulp.parallel(
  resizeImages(800, 'photos'),
  resizeImages(300, 'photos-medium'),
  resizeImages(100, 'thumbnails'));

function copy_images() {
  return gulp.src('images/**/*.jpg')
    .pipe(gulp.dest(dist_folder));
}

var build_full = gulp.series(html, css, copy_images);

var build = gulp.series(html, css);

function watch() {
  gulp.watch('./*.css', ['css']);
  gulp.watch(['pages/*.pug'], ['html']);
}

exports.html = html;
exports.css = css;
exports.clean = clean;
exports.resize_images = resize_images;
exports.copy_images = copy_images;
exports.build_full = build_full;
exports.default = build;
exports.watch = watch;
