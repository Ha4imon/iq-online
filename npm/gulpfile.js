var gulp = require("gulp");
var server = require("browser-sync").create();
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var run = require("run-sequence");
var del = require("del");


gulp.task("style", function () {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
      }),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("source/css"))
    .pipe(server.reload({
      stream: true
    }));
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,gif}")
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("symbols", function () {
  return gulp.src("source/img/*.svg")
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("source/img/svg"))
    .pipe(gulp.dest("build/img/svg"));
});

gulp.task("serve", ["style"], function () {
  server.init({
    server: "source"
  });
  gulp.watch("source/sass/**/*.scss", ["style"]);
  gulp.watch("source/*.html")
    .on("change", server.reload);
});

gulp.task("build", function (fn) {
  run("clean", "copy", "style", "images", "symbols", fn);
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2,eot,svg,ttf,otf}",
    "source/fonts/**/*.css",
    "source/img/**",
    "source/css/**",
    "source/js/**",
    "source/*.html",
    "source/video/**"
  ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});
