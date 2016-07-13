var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var browserifyBuild = require('ionic-gulp-browserify-es2015');

var paths = {
  es6: ['./src/es6/*.js'],
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['build', 'sass']);

const browserifyOptions = {
    src: ['./src/es6/app.js', './src/es6/services.js', './src/es6/controllers.js','./src/es6/dateHelper.js'],
    outputPath: './www/js',
    //browserifyOptions: { debug: false } //if you want to disable sourcemaps
};

gulp.task('build', function(){
  return  browserifyBuild(browserifyOptions)
});
 
gulp.task('buildWatch', function(){
  return browserifyBuild(
    Object.assign({}, 
    browserifyOptions, 
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
