/**
 * Created by famer.me on 16-4-19.
 */

var gulp = require("gulp");
var babel = require("gulp-babel");
var ngAnnotate = require('gulp-ng-annotate');
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var ngHtml2Js = require('gulp-ng-html2js');
var minifyHtml = require('gulp-minify-html');
var plumber = require('gulp-plumber');
var karma = require('gulp-karma');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var mocha = require('gulp-mocha');
var webpack = require( "webpack-stream" );

var path = {
  js: ['./app/javascripts/**/*.js'],
  css: ['./app/stylesheets/**/*.css'],
  less: ['./app/less/**/*.less'],
  watch: ['app/**/*.*'],
  copy: ['./node_modules/ramda/dist/*.js'],
  test: {
    backend: ['test/backend/*.js'],
    frontend: ['test/frontend/*.js']
  }
};

gulp.task('js:compile', () => {
  return gulp.src(path.js)
    .pipe(plumber())
    .pipe(ngAnnotate())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/javascripts'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./public/javascripts'));
})
gulp.task('js:minifyCompile', () => {
  return gulp.src(path.js)
    .pipe(plumber())
    .pipe(ngAnnotate())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('./public/javascripts'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./public/javascripts'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/javascripts'));
})

gulp.task('css:compile', function () {
  return gulp.src(path.less)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('css:minifyCompile', function () {
  return gulp.src(path.less)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(minifyCss())
    .pipe(concat('style.min.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('copy', function () {
  return gulp.src(path.copy)
    .pipe(gulp.dest('./public/javascripts/'));
});

/**
 * Run test once and exit
 */
gulp.task('test:backend', function () {
  return gulp.src(path.test.backend)
    .pipe(mocha())
    .once('error', function () {
      process.exit(1);
    })
    .once('end', function () {
      process.exit();
    });
});

gulp.task('test:frontend', function () {
  return gulp.src(path.test.frontend)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function (err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

gulp.task('test', function () {
  gulp.start(['test:backend', 'test:frontend']);
});

gulp.task('default', function () {
  gulp.start(['js:compile', 'js:minifyCompile', 'css:compile', 'css:minifyCompile', 'copy']);
  //gulp.watch(path.watch, ['js:compile', 'js:minifyCompile', 'template:compile', 'template:minifyCompile']);
});

gulp.task('watch', function () {
  gulp.watch(path.js, ['js:compile', 'js:minifyCompile']);
  gulp.watch(path.less, ['css:compile', 'css:minifyCompile']);
  gulp.watch(path.copy, ['copy']);
});
