var gulp = require('gulp');
var htmlMinifer = require('gulp-htmlmin');
var jsMinifer = require('gulp-uglify');
var cssMinifer = require('gulp-minify-css');
var imgMinifer = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var cache = require('gulp-cached');

var paths = {
  src: 'src/**/*',
  dist: 'dist',
  html: 'src/**/*.html',
  js: 'src/**/*.js',
  css: 'src/**/*.css',
  images: ['src/**/*.png', 'src/**/*.jpg', 'src/**/*.gif']
};

gulp.task('copy', function() {
  return gulp.src(paths.src)
    .pipe(gulp.dest(paths.dist));
});

gulp.task('html', ['copy'], function() {
  return gulp.src(paths.html)
    .pipe(cache('html'))
    .pipe(htmlMinifer({
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true
      }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('js', ['copy'], function() {
  return gulp.src(paths.js)
    .pipe(cache('js'))
    .pipe(jsMinifer())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('css', ['copy'], function() {
  return gulp.src(paths.css)
    .pipe(cache('css'))
    .pipe(cssMinifer({compatibility: 'ie8'}))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('images', ['copy'], function () {
  return gulp.src(paths.images)
    .pipe(cache('images'))
    .pipe(imgMinifer({
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', function() {
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.images, ['images']);
});

gulp.task('build', ['html', 'css', 'js', 'images']);
gulp.task('default', ['watch', 'build']);