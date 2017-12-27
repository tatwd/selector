const gulp        = require('gulp');
const sass        = require('gulp-sass');
const cleanCss    = require('gulp-clean-css');
const uglify      = require('gulp-uglify');
const babel       = require('gulp-babel');
const browserSync = require('browser-sync').create();
const rename      = require('gulp-rename');

let reload = browserSync.reload;

// serve task
gulp.task('serve', ['babel'], () => {
    browserSync.init({
        server: {
            baseDir: './',
            index: 'index.html'
        }
    });

    // gulp.watch('src/scss/*.scss', ['sass']);
    // gulp.watch("*.html").on('change', reload);
});

// sass task
gulp.task('sass', () => {
    return gulp.src('src/scss/*.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('Error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

// minify css task
gulp.task('minify-css', () => {
    return gulp.src('dist/css/selector.css')
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCss({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('dist/css'));
});

// babel task
gulp.task('babel', () => {
    return gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

// uglify task
gulp.task('uglify', () => {
    return gulp.src('dist/js/selector.js')
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// watch task
gulp.task('watch', () => {
    gulp.watch('src/scss/*.scss', ['minify-css', 'sass']);
    gulp.watch('src/js/*.js', ['uglify','babel']);
    gulp.watch("*.html").on('change', reload);
});

// default task
gulp.task('default', ['serve', 'watch']);
