require('es6-promise').polyfill(); // required to fix postcss-import?

var settings = {
  isLocal: true,
  assetDest: 'asset/',
  watch: {
    css: 'css/**/*.css',
    js: 'js/**/*.js'
  },
  nodeModules: 'node_modules/',
  jsLibs: [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/mustache/mustache.js',
    'node_modules/highlight.js/lib/highlight.js'
  ],
  css: 'css/',
  js: 'js/',
  media: ['media/']
};

var gulp = require('gulp');
var gutil = require('gulp-util');
var tap = require('gulp-tap');
var jscs = require('gulp-jscs');
var browserify = require('browserify');
var buffer = require('gulp-buffer');

gulp.task('watch', watch);
gulp.task('js', js);
gulp.task('jsTidy', jsTidy);

function watch() {
  gulp.watch(settings.watch.js, ['js']);
}

function js() {
  return gulp.src(settings.js + '**/*.bundle.js', {read: false})
    .pipe(tap(function(file) {
      file.contents = browserify(file.path, {debug: settings.isLocal})
        .bundle();
      gutil.log('build ' + file.path);
    }))
    .pipe(buffer())
    .pipe(gulp.dest(settings.assetDest));
};

function jsTidy() {
  return gulp.src([settings.js + '**/*.js'])
    .pipe(jscs({
      configPath: '.jsTidyGoogle.json',
      fix: true
    }))
    .pipe(gulp.dest('js'));
}
