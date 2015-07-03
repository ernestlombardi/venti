"use strict";

var gulp = require('gulp');

var del = require('del');
var browserSync = require('browser-sync');
var less = require('gulp-less');
var jshint = require('gulp-jshint');
var htmlreplace = require('gulp-html-replace');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jasmine = require('gulp-jasmine');
var karma = require('gulp-karma');

gulp.task('clean', function(){
    del(['dist/**/*.*']);
});

gulp.task('lint', function() {
    return gulp.src(['scripts/**/*.js', '!scripts/*-spec.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));
});

gulp.task('less', function () {
    gulp.src(['styles/*.less', 'bower_components/angular-material/angular-material.css'])
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('styles'))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('copy', function () {
    gulp.src('components/**/*.html')
        .pipe(gulp.dest('dist/components'));
});

gulp.task('htmlreplace', function() {
    gulp.src('index.html')
        .pipe(htmlreplace({
            'css': 'styles/style.min.css',
            'lib': 'scripts/lib.js',
            'app': 'scripts/app.js'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('lib', function() {
    return gulp.src(['bower_components/angular/angular.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-aria/angular-aria.js',
        'bower_components/angular-material/angular-material.js',
        'bower_components/angular-resource/angular-resource.js',
        'bower_components/angular-route/angular-route.js'])
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(rename('lib.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('scripts', function() {
    return gulp.src(['scripts/*.js',
        '!scripts/*-spec.js',
        'components/**/*.js',
        '!components/**/*-spec.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('browser-sync', function () {
    var files = [
        '**/*.html',
        'styles/**/*.less',
        'styles/**/*.css',
        'images/**/*.png',
        'scripts/**/*.js',
        'components/**/*.js',
        '!components/**/*-spec.js'
    ];

    browserSync.init(files, {
        server: {
            baseDir: './'
        }
    });

    gulp.watch("styles/*.less", ['less']);
});

gulp.task('test', function () {
    return gulp.src('./foobar')
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            console.log(err);
            this.emit('end'); //instead of erroring the stream, end it
        });
});

gulp.task('default',
    [
        'clean',
        'less',
        'browser-sync'
    ]);

gulp.task('build',
    [
        'lint',
        'test',
        'clean',
        'less',
        'lib',
        'scripts',
        'htmlreplace',
        'copy'
    ]);