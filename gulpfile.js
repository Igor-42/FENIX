const { src, dest, watch, parallel, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const rename = require('gulp-rename')
const uglify = require('gulp-uglify-es').default
const browserSync = require('browser-sync').create()
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');

// SCSS → CSS
function styles() {
  console.log('SCSS змінено')
  return src(['app/scss/style.scss'])
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'] }))
    .pipe(rename('style.min.css'))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

// JS → min.js
function scripts() {
  console.log('JS змінено')
  return src([
    'node_modules/swiper/swiper-bundle.js',
    'app/js/main.js'
  ])
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

// Watcher
function watching() {
  watch(['app/scss/**/*.scss'], styles)
  watch(['app/js/main.js'], scripts)
  watch(['app/*.html']).on('change', browserSync.reload)
}

// BrowserSync
function browsersync() {
  browserSync.init({
    server: { baseDir: "app/" }
  })
}

// Очистка docs
function cleanDocs() {
  return src('docs', { read: false, allowEmpty: true }).pipe(clean())
}

// Збірка у docs (основний варіант для GitHub Pages)
function buildDocs() {
  return src([
    'app/**/*.html',
    'app/css/**/*.css',
    'app/js/**/*.js',
    'app/images/**/*',
    'app/fonts/**/*'
  ], {
    base: 'app',
    allowEmpty: true,
    encoding: false
  })
    .pipe(dest('docs'))
}

// Експорти для docs
exports.styles = styles
exports.scripts = scripts
exports.watch = watching
exports.browsersync = browsersync

exports.build = series(
  cleanDocs,
  styles,
  scripts,
  buildDocs
)

exports.default = series(
  styles,
  scripts,
  parallel(browsersync, watching)
)

/* ===========================================================
   👉 Альтернативний варіант для dist (закоментований)
   Просто розкоментуй нижче, якщо потрібно збирати у dist
=========================================================== */

// function cleanDist() {
//   return src('dist', { read: false, allowEmpty: true }).pipe(clean())
// }

// function buildDist() {
//   return src([
//     'app/**/*.html',
//     'app/css/**/*.css',
//     'app/js/**/*.js',
//     'app/images/**/*',
//     'app/fonts/**/*'
//   ], { base: 'app', allowEmpty: true })
//     .pipe(dest('dist'))
// }

// exports.build = series(
//   cleanDist,
//   styles,
//   scripts,
//   buildDist
// )
