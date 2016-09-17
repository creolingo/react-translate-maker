import gulp from 'gulp';
import babel from 'gulp-babel';
import jsxCoverage from 'gulp-jsx-coverage';
import path from 'path';
import coveralls from 'gulp-coveralls';

gulp.task('build', () => {
  return gulp.src('./src/**/*.{js,jsx}')
    .pipe(babel())
    .pipe(gulp.dest('./dist'));
});

gulp.task('coveralls', () => {
  if (!process.env.CI) {
    return void 0;
  }

  return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
    .pipe(coveralls());
});
