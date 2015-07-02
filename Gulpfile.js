'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var shell = require('gulp-shell');

var paths = {
  indexjs: './index.js',
  indexES5js: '.'
};

gulp.task('es5ify', function() {
  return gulp.src(paths.indexjs)
    .pipe(babel())
    .pipe(rename('indexES5.js'))
    .pipe(gulp.dest(paths.indexES5js));
});

gulp.task('run_app', shell.task(['node indexES5.js']));

gulp.task('watch', function() {
  gulp.watch([paths.indexjs], ['es5ify', 'run_app']);
});

gulp.task('default', ['es5ify', 'run_app', 'watch']);
