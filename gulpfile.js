// Plugin import
const gulp = require('gulp');
const $ = require('gulp-load-plugins')({lazy: false});
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();

const del = require('del');
const path = require('path');

// Compile pug's files to public
const handlePugCompile = () => {
    return gulp
        .src('./views/*.pug')
        .pipe(pug(
            {
                pretty: true
            }
        ))
        .pipe(gulp.dest('./public'))
        .pipe(
            browserSync.reload({
                stream: true,
            }),
        );
}

// Compile sass's files to public
const handleSassCompile = () => {
    return gulp
        .src('./assets/css/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/assets/css'))
        .pipe(
            browserSync.reload({
                stream: true,
            }),
        );
}

// Compile and uglify js files to public
const handleJsUglify = () => {
    return gulp
        .src('./assets/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/assets/js'))
        .pipe(
            browserSync.reload({
                stream: true,
            }),
        );
}

// Compile images to public
const handleImages = () => {
    return gulp
        .src('./assets/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/assets/images'))
        .pipe(
            browserSync.reload({
                stream: true,
            }),
        );
}

// Compile images to public
const handleFiles = () => {
    return gulp
        .src('./assets/**/*')
        .pipe(gulp.dest('./public/assets'))
        .pipe(
            browserSync.reload({
                stream: true,
            }),
        );
}

// First clean current public path
const handleClean = () => {
    return gulp.src('./public', {
        read: false,
        allowEmpty: true,
    })
        .pipe(clean());
}

// watch files change at current path
const handleWatch = () => {
    console.log('handleWatch!!!')

    browserSync.init({
        server: {
            baseDir: './public', // 指向虛擬伺服器需存取的資料夾
        },
    });

    gulp.watch('./views/**/*.pug', handlePugCompile);
    gulp.watch('./assets/css/**/*.sass', handleSassCompile);
    gulp.watch('./assets/js/*.js', handleJsUglify);
    gulp.watch('./assets/images/**/*', handleImages);
    gulp.watch('./assets/**/*', handleFiles);
}

exports.default = gulp.series(handleClean, handlePugCompile, handleSassCompile, handleJsUglify, handleImages, handleFiles, handleWatch);
