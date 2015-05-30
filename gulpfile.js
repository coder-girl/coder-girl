var gulp = require('gulp');
var browserify = require('browserify');
var concat = require('gulp-concat');
var sass = require('gulp-sass') ;
var shell = require('gulp-shell');
var rename = require('gulp-rename');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

// file path structure
var paths = {
  scripts: ['public/**/*.js'],
  workers: ['public/js/testWorker.js'],
  tests: ['public/js/tests/*.js'],
  html: ['public/**/*.html'],
  server: ['appServer/**/*.js'],
  test: ['specs/**/*.js'],
  sass: ['public/styles/style.scss'],
  foundationSass: ['dist/bower_components/foundation-apps/scss']
};

// convert sass to css and store it in /dist
gulp.task('sass', function(done) {
  return gulp.src(paths.sass)
    .pipe(sass({
      includePaths: [paths.foundationSass],
      sourcemap: true
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('copy', function() {
  gulp.src(paths.html)
    .pipe(gulp.dest('dist/'));
  gulp.src(paths.workers)
    .pipe(gulp.dest('./dist/js/'))
  gulp.src(paths.tests)
    .pipe(gulp.dest('./dist/js/tests'))
});

gulp.task('copy2', function() {
  return gulp.src('public/styles/asset/*.mp4')
    .pipe(gulp.dest('dist/'));
});

gulp.task('lint', function() {
  return gulp.src('./public/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// on every new build, wipe previous build files
gulp.task('clean', function() {
  return gulp.src(['dist/js', 'dist/index.html'], {
    read: false
  })
    .pipe(clean());
});

gulp.task('compile', function() {
  var b = browserify();
  b.transform(reactify);
  b.add('./public/js/main.js');
  return b.bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dist/js'));

});

gulp.task('compress', function() {
  gulp.src('./dist/js/*.js')
    .pipe(uglify('main.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('run', shell.task([ 
  'cd server && nodemon server.js'
]));

// gulp.task('testScript', shell.task([ 
//  'npm test'
// ]));

gulp.task('build', function(callback) {
  runSequence('lint', 'clean', 'compile', 'copy', 'copy2', 'sass', callback);
});

gulp.task('default', ['build', 'watch', 'run']);

gulp.task('watch', function() {
  gulp.watch('public/**/*.*', ['build']);
});
