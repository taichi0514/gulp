const gulp = require("gulp"),
  gsass = require("gulp-sass"),
  sassGlob = require("gulp-sass-glob"),
  plumber = require("gulp-plumber"),
  browserSync = require("browser-sync"),
  changed = require("gulp-changed"),
  cache = require("gulp-cached"),
  progeny = require("gulp-progeny"),
  rename = require("gulp-rename"),
  htmlmin = require("gulp-htmlmin"),
  cssmin = require("gulp-cssmin"),
  uglify = require("gulp-uglify"),
  sourcemaps = require("gulp-sourcemaps"),
  postcss = require("gulp-postcss"),
  assets = require("postcss-assets"),
  imagemin = require("gulp-imagemin"),
  pngquant = require("imagemin-pngquant"),
  autoprefixer = require("autoprefixer"),
  minimist = require("minimist");
let argv = minimist(process.argv.slice(2));
const dir = {
  src: "./htdocs/", // _srcフォルダ置き換え
  dist: "../sample/dist" // destフォルダ置き換え
};

const watch_reload = [
  "./public/**/*.html",
  "./public/**/*.js",
  "fuel/app/**/*.php",
  "!fuel/app/logs/**/*.php"
];

// ファイル監視
gulp.task("w", () => {
  gulp.watch(watch_reload, ["reload"]);
  gulp.watch(dir.src + "/scss/**/*.scss", ["postcss"]);
});

gulp.task("sass", () => {
  gulp.watch(dir.src + "/scss/**/*.scss", ["postcss"]);
});

// ローカルサーバ起動
gulp.task("server", function() {
  let proxy = "localhost";
  if (argv.proxy !== void 0) {
    proxy = argv.proxy;
  }

  browserSync({
    notify: false,
    proxy: proxy
  });
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
    .pipe(gsass({ outputStyle: "compressed" }).on("error", gsass.logError))
    .pipe(
      postcss([
        autoprefixer({
          // メインブラウザの最新2バージョン、ie9以上、iOS 9以上、Android 5以上
          browsers: ["last 2 version", "iOS >= 8.1", "Android >= 4.4"],
          cascade: false
        }),
        assets({
          loadPaths: [dir.src + "img/"], //対象ディレクトリ
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
  gulp
    .src([dir.src + "/img/**/*"])
    .pipe(
      imagemin([
        pngquant({
          quality: "65-80",
          speed: 1
        })
      ])
    )
    .pipe(imagemin()) // ←追加
    .pipe(gulp.dest(dir.dist + "img"));
});

gulp.task("minify-html", () => {
  //html
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
  //css
  return gulp
    .src(dir.src + "/**/*.css")
    .pipe(sourcemaps.init())
    .pipe(cssmin())
    .pipe(sourcemaps.write("map"))
    .pipe(gulp.dest(dir.dist + "css"));
});

gulp.task("minify-js", () => {
  //jsgul
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
    .pipe(gulp.dest(dir.dist + "js"));
});

//webpack
gulp.task("webpack", () => {
  webpackStream(webpackConfig, webpack)
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
gulp.task("default", ["w", "server"]);
//minify コマンド
gulp.task("minify", ["minify-html", "minify-css", "minify-js", "imagemin"]);
