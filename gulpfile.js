var
  gulp = require('gulp'),
  plumber = require('gulp-plumber'), // Prevent pipe breaking caused by errors from gulp plugins.
  uglify = require('gulp-uglify'), // Minify JavaScript with UglifyJS.
  concat = require('gulp-concat'), // It concats files to a single file.
  sourcemaps = require('gulp-sourcemaps'), // Inline maps are embedded in the source file.
  jade = require('gulp-jade'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  sass = require('gulp-sass');

var paths = {
  ui: [
    './src/ui/init.js',
    './src/ui/lib/**/*.js',
    './src/ui/end.js'
  ],
  sass: './sass/**/*.sass',
  jade: {
    compile: './jade/index.jade',
    watch: './jade/**/*.jade'
  }
};

gulp.task('ui', function() {
  return gulp.src(paths.ui)
    .pipe(concat('ui.js'))
    .pipe(gulp.dest('./www/js/'))
    .pipe(reload({stream: true}));
});

gulp.task('compile_3pjs', function () {
  gulp.src([
      './bower_components/angular/angular.js',
      './bower_components/angular-animate/angular-animate.js'
    ])
    .pipe(plumber())
    .pipe(concat('3p.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./www/js/'))
    .pipe(reload({stream: true}));
});

gulp.task('sass', function () {
  gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./www/css'))
    .pipe(reload({stream: true}));
});

gulp.task('jade', function() {
  var YOUR_LOCALS = {};

  gulp.src(paths.jade.compile)
    .pipe(jade({
      pretty: true,
      locals: {
        greeting: 'Hi'
      }
    }))
    .pipe(gulp.dest('./www'))
    .pipe(reload({stream: true}));
});

gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: 'www/'
    }
  });
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.jade.watch, ['jade']);
  gulp.watch(paths.ui, ['ui']);
});
