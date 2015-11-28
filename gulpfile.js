import gulp from 'gulp';
import mocha from 'gulp-mocha';
import babel from 'gulp-babel';
import istanbul from 'gulp-istanbul';
import coveralls from 'gulp-coveralls';
import path from 'path';
import { Instrumenter } from 'isparta';

const babelConfig = {
  stage: 0,
};

gulp.task('pre-test', () => {
  return gulp.src(['src/**/*.js'])
    .pipe(istanbul({
      dir: './coverage',
      instrumenter: Instrumenter,
      includeUntested: true,
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], () => {
  return gulp.src('./tests/**/*.js')
    .pipe(babel(babelConfig))
    .pipe(mocha({
      timeout: 20000,
      reporter: 'spec',
    }))
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({
      thresholds: {
        global: 90,
      },
    }));
});

gulp.task('coveralls', ['test'], () => {
  if (!process.env.CI) {
    return void 0;
  }

  return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
    .pipe(coveralls());
});

gulp.task('build', () => {
  return gulp.src('./src/**/*.{js,jsx}')
    .pipe(babel(babelConfig))
    .pipe(gulp.dest('./dist'));
});

gulp.doneCallback = (err) => {
  process.exit(err ? 1 : 0);
};
