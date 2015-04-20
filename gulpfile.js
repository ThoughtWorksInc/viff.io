var gulp       = require('gulp');
var sass       = require('gulp-sass');
var livereload = require('gulp-livereload');
var uglify     = require('gulp-uglify');
var concat     = require('gulp-concat');
var minifyCSS  = require('gulp-minify-css');
var connect    = require('gulp-connect');
var browserify = require('browserify');
var babelify   = require('babelify');
var source     = require('vinyl-source-stream');

var vendor = {
  css: [
    'node_modules/normalize.css/normalize.css',
    'node_modules/font-awesome/css/font-awesome.css'
  ],
  fonts: [
    'node_modules/font-awesome/fonts/*.*'
  ],
  imgs: []
} 

gulp.task('sass', function() {
  gulp.src('scss/main.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest('css/'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch(['js/**/*.js'], ['browserify']);
  gulp.watch(['index.html']).on('change', function() {
    livereload.reload();
  });
});

gulp.task('browserify', function() {
  browserify(['./js/app.js'])
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('bundle/'))
    .pipe(livereload());
});

gulp.task('vendor', function() {
  gulp.src(vendor.css)
    .pipe(minifyCSS())
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('css'));

  gulp.src(vendor.fonts)
    .pipe(gulp.dest('fonts'));

});

gulp.task('connect', function() {
  connect.server({
    root: [__dirname],
    port: 8000,
    livereload: true
  });
});

gulp.task('default', ['sass', 'browserify', 'vendor']);

gulp.task('dev', ['default', 'connect', 'watch']);