'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var browserSync = require('browser-sync').create();

var $ = require('gulp-load-plugins')();
var path = require('path');

var conf = require('./conf');

gulp.task('build-project', ['inject', 'html', 'font'], function () {
  var assets = $.useref.assets();
  return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    .pipe(assets)
    .pipe($.sourcemaps.init())
    .pipe(gulpif('*.js', $.uglify()))
    .pipe(gulpif('*.css', $.minifyCss()))
    .pipe($.sourcemaps.write())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest(conf.paths.dist));
});

gulp.task('font', function(){
  return gulp.src(['bower_components/bootstrap/dist/fonts/*.*'])
    .pipe($.filter('*.{eot,ttf,woff,woff2}'))
    .pipe($.iconfont({
      fontName: 'myfont',
      appendUnicode: true,
      formats: ['eot','ttf','woff','woff2']
    }))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('html', function() {
  return gulp.src(path.join(conf.paths.src, '/app/**/*.html'))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/app')));
});

gulp.task('server', ['build-project'], function() {
  browserSync.init({
    port: 3000,
    open: true,
    server: {
      baseDir: conf.paths.dist
    },
    files: path.join(conf.paths.dist, '/**')
  });
});


