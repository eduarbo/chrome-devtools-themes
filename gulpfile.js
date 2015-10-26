var theme = 'gruvbox-dark';

var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var zip = require('gulp-zip');
var rename = require("gulp-rename");
var lessOptions = {
    modifyVars: {
        theme: theme
    }
};

function compileLess(fileName) {
    return gulp.src('less/' + fileName)
        .pipe(less(lessOptions))
        .pipe(gulp.dest('theme-extension'));
}

gulp.task('less-stable', function () {
    return compileLess('stable.less');
});

gulp.task('less-canary', function (destPrefix) {
    return compileLess('canary.less');
});

gulp.task('build-stable', function () {
    return compileLess('stable.less')
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/' + theme + '/theme-extension'));
});

gulp.task('build-canary', function () {
    return compileLess('canary.less')
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/' + theme + '/theme-extension'));
});

gulp.task('compress', function () {
    return gulp.src('dist/' + theme + '/theme-extension/*')
        .pipe(zip('theme-extension.zip'))
        .pipe(gulp.dest('dist/' + theme));
});

gulp.task('default', ['less-stable', 'less-canary']);
gulp.task('build', ['build-stable', 'build-canary', 'compress']);

gulp.task('watch', function () {
    gulp.watch(['less/*.less', 'themes/*.less'], ['default']);
});
