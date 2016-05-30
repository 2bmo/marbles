var gulp = require('gulp'),
    sass = require('gulp-sass'),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    autoprefixer = require('gulp-autoprefixer'),
    runSequence = require('run-sequence');

gulp.task('sass', function() {
    return gulp.src('scss/**/*.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest('res'))
});
gulp.task('watch', function () {
    gulp.watch('scss/**/*.scss', ['sass']);
});
gulp.task('useref', function(){
    return gulp.src('res/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('res'))
});
gulp.task('auto', function () {
    return gulp.src('res/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('res'));
});
gulp.task('default', function (callback) {
    runSequence(['sass', 'auto', 'useref', 'watch'],
        callback
    )
});