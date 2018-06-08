const gulp = require("gulp");
const gsass = require("gulp-sass");
const sassGlob = require("gulp-sass-glob");
const plumber = require("gulp-plumber");
const browserSync = require("browser-sync").create();
const cache = require("gulp-cached");
const progeny = require("gulp-progeny");
const htmlmin = require("gulp-htmlmin");
const cssmin = require("gulp-cssmin");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const assets = require("postcss-assets");
const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const webpackConfig = require("./webpack.config");
const minimist = require("minimist");

let argv = minimist(process.argv.slice(2));

const dir = {
  src: "./htdocs/", // _srcフォルダ置き換え
  dist: "./dist/htdocs",
  distCss: "./dist/htdocs/css",
  distJs: "./dist/htdocs/js",
  distImg: "./dist/htdocs/img/"
};

const watch_reload = [
  "./htdocs/**/*.html",
  "./htdocs/**/*.js",
  "fuel/app/**/*.php",
  "!fuel/app/logs/**/*.php"
];

// ファイル監視
gulp.task("w", () => {
  gulp.watch(watch_reload, gulp.series("reload"));
  gulp.watch(dir.src + "scss/**/*.scss", gulp.series("postcss"));
});

gulp.task("sass", () => {
  return gulp.watch(dir.src + "scss/**/*.scss", gulp.series("postcss"));
});

// ローカルサーバ起動
gulp.task("server", function() {
  let proxy = "";
  if (argv.proxy !== void 0) {
    proxy = argv.proxy;
    browserSync.init({
      proxy: proxy
    });
  } else {
    browserSync.init({
      server: {
        baseDir: dir.src,
        index: "index.html"
      }
    });
  }
});

// ブラウザリロード
gulp.task("reload", () => {
  browserSync.reload();
});

// postcssを使用してSCSSを変換
gulp.task("postcss", () => {
  return gulp
    .src(dir.src + "/scss/**/*.scss")
    .pipe(cache("postcss"))
    .pipe(progeny())
    .pipe(
      plumber({
        errorHandler: function(err) {
          console.log(err.messageFormatted);
          this.emit("end");
        }
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(gsass())
    .pipe(
      postcss([
        autoprefixer({
          // メインブラウザの最新2バージョン、ie11以上、iOS 9以上、Android 5以上
          browsers: ["last 2 version", "iOS >= 10", "Android >= 5.0"],
          cascade: false
        }),
        assets({
          loadPaths: [dir.src + "img/"], // 対象ディレクトリ
          relative: true // 相対パス
          // basePath: dir.src, // ルート相対パス
        })
      ])
    )
    .pipe(sourcemaps.write("map"))
    .pipe(gulp.dest(dir.src + "css"))
    .pipe(browserSync.stream());
});

// 画像圧縮処理
gulp.task("imagemin", () => {
  return gulp
    .src([dir.src + "/img**/*.{jpg,jpeg,png,gif,svg}"])
    .pipe(
      imagemin([
        pngquant({
          quality: "65-80",
          speed: 1
        })
      ])
    )
    .pipe(imagemin()) // ←追加
    .pipe(gulp.dest(dir.distImg));
});

gulp.task("minify-html", () => {
  // html
  return gulp
    .src(dir.src + "/**/*.html")
    .pipe(sourcemaps.init())
    .pipe(
      htmlmin({
        collapseWhitespace: true
      })
    )
    .pipe(sourcemaps.write("map"))
    .pipe(gulp.dest(dir.dist));
});

gulp.task("minify-css", () => {
  // css
  return gulp
    .src(dir.src + "/**/*.css")
    .pipe(sourcemaps.init())
    .pipe(cssmin())
    .pipe(sourcemaps.write("map"))
    .pipe(gulp.dest(dir.distCss));
});

gulp.task("minify-js", () => {
  // jsgul
  return gulp
    .src(dir.src + "/**/*.js")
    .pipe(
      plumber({
        errorHandler: function(err) {
          console.log(err.messageFormatted);
          this.emit("end");
        }
      })
    )
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write("map"))
    .pipe(gulp.dest(dir.distJs));
});

// webpack
gulp.task("webpack", () => {
  return webpackStream(webpackConfig, webpack)
    .pipe(
      plumber({
        errorHandler: function(err) {
          console.log(err.messageFormatted);
          this.emit("end");
        }
      })
    )
    .pipe(gulp.dest(dir.src + "js"));
});

// 実行
gulp.task("default", gulp.series(gulp.parallel("w", "server")));
// minify コマンド
gulp.task(
  "minify",
  gulp.series(
    gulp.parallel("minify-html", "minify-css", "minify-js", "imagemin")
  )
);
