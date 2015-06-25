'use strict';

var gulp = require('gulp'),
    
    livereload = require('gulp-livereload'),
    csso = require('gulp-csso'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    cleanhtml = require("gulp-cleanhtml");

gulp.task('default', function () {
    gulp.start('build');
});

gulp.task('test', function () {

});



gulp.task('styles', ['accecss'], function () {
    
    gulp.src('app/css/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('accecss', function () {
    
   gulp.src('app/css/accecss.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('accecss.css'))
        .pipe(gulp.dest('dist/css/'));
});


gulp.task('pages', function () {
    return gulp.src('app/*.html')
        .pipe(cleanhtml())
        .pipe(gulp.dest('dist'));
});

gulp.task('build', [, , 'pages']);

gulp.task('server', function () {
    var connect = require('connect'),
        server = connect();
    server.use(connect.static('dist')).listen(process.env.PORT || 9122);
    require('opn')('http://localhost:' + (process.env.PORT || 9122));
});

gulp.task('watch', ['server'], function () {
    gulp.start('build');

    
    
    gulp.watch('app/*.html', ['pages']);
    gulp.watch('app/css/**/*.scss', ['styles']);

    var server = livereload();
    gulp.watch('dist/**').on('change', function (file) {
        server.changed(file.path);
    });
     gulp.watch('app/**').on('change', function (file) {
        server.changed(file.path);
    });
});