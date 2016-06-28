var gulp = require('gulp'),
    sass = require('gulp-sass'),
    useref = require('gulp-useref'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    runSequence = require('run-sequence');

gulp.task('sass', function() {
    return gulp.src('scss/**/*.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest('res/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});
gulp.task('watch', ['browserSync', 'sass'], function () {
    gulp.watch('scss/**/*.scss', ['sass']);
});
gulp.task('useref', function(){
    return gulp.src('res/*.html')
        .pipe(useref())
        .pipe(gulp.dest('res'))
});
gulp.task('auto', function () {
    return gulp.src('scss/css/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('res/css'));
});
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'res'
        },
    })
})
gulp.task('default', function (callback) {
    runSequence(['sass', 'auto', 'useref', 'watch'],
        callback
    )
});