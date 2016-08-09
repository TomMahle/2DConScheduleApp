var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var sass = require('gulp-sass');
var minifyCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var browserifyBuild = require('ionic-gulp-browserify-es2015');
var runSeq = require('run-sequence');
var glob = require('glob');
var mocha = require('gulp-mocha');

gulp.task('heroku:production', function(){
  runSeq('build')
});

var paths = {
  es6: ['./src/es6/*.js'],
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['buildWatch']);

const srcFiles = glob.sync(
    './src/**/*.js',
    {
      ignore:['./src/**/*.spec.js']
    }
  );
const testFiles = glob.sync('./src/**/*.spec.js');

const browserifySrcOptions = {
    src: srcFiles,
    outputPath: './www/js',
    //browserifyOptions: { debug: false } //if you want to disable sourcemaps... This should have some production flag on it.
};

const browserifyTestOptions = {
    src: testFiles,
    outputPath: './bundledTests',
    browserifyOptions: { debug: false } //if you want to disable sourcemaps... This should have some production flag on it.
};

gulp.task('build', function(){
  return  browserifyBuild(browserifySrcOptions)
});

gulp.task('buildTests', function(){
  return  browserifyBuild(browserifyTestOptions)
});

gulp.task('runTests', ['buildTests'], function(){
  return gulp
    .src('./bundledTests/app.bundle.js', {read:false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('test', ['buildTests', 'runTests']);

gulp.task('tdd', ['test'], function() {
  gulp.watch(paths.es6, ['buildTests', 'runTests'])
});
 
gulp.task('buildWatch', function(){
  return browserifyBuild(
    Object.assign({}, 
    browserifySrcOptions, 
    {watch: true}));
});

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.es6, ['build']);
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
