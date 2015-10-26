var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var zip = require('gulp-zip');

var theme = 'gruvbox-dark';

gulp.task('less-stable', function() {
  return gulp.src('less/build-stable.less')
    .pipe(less())
    .pipe(gulp.dest('theme-extension/stable.css'));
});

gulp.task('less-canary', function() {
  return gulp.src('less/build-canary.less')
    .pipe(less())
    .pipe(gulp.dest('theme-extension/canary.css'));
});

gulp.task('build-stable', function() {
  return gulp.src('less/build-stable.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/' + theme + '/theme-extension/stable.css'));
});

gulp.task('build-canary', function() {
  return gulp.src('less/build-canary.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/' + theme + '/theme-extension/canary.css'));
});

gulp.task('compress', function() {
  return gulp.src('dist/' + theme + '/theme-extension/*')
    .pipe(zip('theme-extension.zip'))
    .pipe(gulp.dest('dist/' + theme));
});

gulp.task('default', ['less-stable', 'less-canary']);
gulp.task('build', ['build-stable', 'build-canary', 'compress']);

gulp.task('watch', function() {
    gulp.watch(['less/*.less', 'themes/*.less'], ['default']);
});
