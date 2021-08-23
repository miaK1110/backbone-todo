import { src, dest, watch, series } from 'gulp';
import webpackConfig from './webpack.config.js';
import webpack from 'webpack-stream';
import browserSync from 'browser-sync';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';

const srcPath = {
  js: 'src/js/**/**.js',
};

const destPath = {
  js: 'dist/js/',
};

function jsTask() {
  return src(srcPath.js)
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: 'Error...',
          message: '<%= error.message %>',
        }),
      })
    )
    .pipe(webpack(webpackConfig))
    .pipe(dest(destPath.js))
    .pipe(browserSync.stream());
}

function watchTask() {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html',
    },
  });

  watch('./*.html').on('change', browserSync.reload);
  watch('./dist/*/*.+(js|css)').on('change', browserSync.reload);
  watch('./dist/*/*/*.+(js|css)').on('change', browserSync.reload);

  watch(srcPath.js, jsTask);
}

exports.default = series(jsTask, watchTask);
