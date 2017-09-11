"use strict";

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var log = require('log');

gulp.task('sass', function(){
    gulp.src('app/scss/*.scss')
    .pipe(sass())
    .on('error', log)
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
});

gulp.task('server', ['sass'], function(){
    browserSync.init({
        notify: false,
        port: 9000,
        server: {
            baseDir: 'app'
        }
    })
});

gulp.task('watch', function(){
    gulp.watch('app/scss/*.scss', ['sass']);
    gulp.watch([
        'app/**/*.html',
        'app/js/**/*.js'
    ]).on('change', browserSync.reload);
    gulp.watch([
        'app/css/**/*.css'
    ]).on('change', browserSync.reload);
});

gulp.task('default', ['server', 'watch']);