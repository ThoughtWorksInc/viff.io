var gulp       = require('gulp');
var sass       = require('gulp-sass');
var livereload = require('gulp-livereload');
var connect    = require('gulp-connect');


gulp.task('sass', function() {
  gulp.src('scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('css/'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch(['index.html']).on('change', function() {
    livereload.reload();
  });
});

gulp.task('connect', function() {
  connect.server({
    root: [__dirname],
    port: 8000,
    livereload: true
  });
});

gulp.task('default', ['connect', 'sass', 'watch']);