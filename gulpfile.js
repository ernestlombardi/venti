"use strict";

var gulp = require("gulp");
var del = require("del");
var browserSync = require("browser-sync");
var less = require("gulp-less");
var jshint = require("gulp-jshint");
var htmlreplace = require("gulp-html-replace");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var jasmine = require("gulp-jasmine");
var karma = require("gulp-karma");
var ngHtml2Js = require("gulp-ng-html2js");
var zip = require("gulp-zip");

gulp.task("clean", function(){
    del([
        'dist',
        '.tmp'
    ]);
});

gulp.task("lint", function() {
    return gulp.src(["scripts/**/*.js", "!scripts/*-spec.js", "components/**/*.js", "!components/**/*-spec.js"])
        .pipe(jshint(".jshintrc"))
        .pipe(jshint.reporter("default"));
});

gulp.task("less", function () {
    gulp.src(["styles/*.less", "bower_components/angular-material/angular-material.css"])
        .pipe(less())
        .pipe(concat("style.css"))
        .pipe(gulp.dest("styles"))
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest(".tmp/styles"));
});

gulp.task("copy", function () {
    gulp.src("components/**/*.html")
        .pipe(gulp.dest(".tmp/components"));
    gulp.src("images/**/*.*")
        .pipe(gulp.dest(".tmp/images"));
    gulp.src("styles/fonts/**/*.")
        .pipe(gulp.dest(".tmp/styles/fonts"));
});

gulp.task("htmlreplace", function() {
    gulp.src("index.html")
        .pipe(htmlreplace({
            "css": "styles/style.min.css",
            "lib": "scripts/lib.js",
            "app": "scripts/app.js"
        }))
        .pipe(gulp.dest(".tmp"));
});

gulp.task("lib", function() {
    return gulp.src(["bower_components/angular/angular.js",
        "bower_components/angular-animate/angular-animate.js",
        "bower_components/angular-aria/angular-aria.js",
        "bower_components/angular-material/angular-material.js",
        "bower_components/angular-resource/angular-resource.js",
        "bower_components/angular-route/angular-route.js"])
        .pipe(concat("lib.js"))
        .pipe(gulp.dest(".tmp/scripts"))
        .pipe(rename("lib.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest(".tmp/scripts"));
});

gulp.task("scripts", function() {
    return gulp.src(["scripts/*.js",
        "!scripts/*-spec.js",
        "components/**/*.js",
        "!components/**/*-spec.js"])
        .pipe(concat("app.js"))
        .pipe(gulp.dest(".tmp/scripts"))
        .pipe(rename("app.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest(".tmp/scripts"));
});

gulp.task("preprocessHTML", function () {
    gulp.src("components/**/*.html")
        .pipe(ngHtml2Js({
            moduleName: "templates",
            prefix: "components/"
        }))
        .pipe(concat("templates.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest(".tmp/templates"));
});

gulp.task("browser-sync", function () {
    var files = [
        "**/*.html",
        "styles/**/*.*",
        "images/**/*.png",
        "scripts/**/*.js",
        "components/**/*.js",
        "!components/**/*-spec.js"
    ];

    browserSync.init(files, {
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("styles/*.less", ["less"]);
    gulp.watch("scripts/**/*.js", ["scripts", "copy"]);
    gulp.watch("components/**/*.js", ["scripts", "copy"]);
});

gulp.task("karma", function () {
    return gulp.src("./test")
        .pipe(karma({
            configFile: "karma.conf.js",
            action: "run"
        }))
        .on("error", function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            console.log(err);
            this.emit("end"); //instead of erroring the stream, end it
        });
});

gulp.task("test", [
    "preprocessHTML",
    "karma"
]);

gulp.task("default",
    [
        "less",
        "lib",
        "scripts",
        "htmlreplace",
        "copy",
        "browser-sync"
    ]);

gulp.task("build",
    [
        "lint",
        "less",
        "lib",
        "scripts",
        "htmlreplace",
        "copy",
        "test"
    ]);

gulp.task("package", ["build"], function () {
    return gulp.src(".tmp/**/*.*")
        .pipe(zip("package.zip"))
        .pipe(gulp.dest("dist"));
});
