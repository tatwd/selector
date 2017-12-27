const gulp        = require('gulp');
const sass        = require('gulp-sass');
const babel       = require('gulp-babel');
const browserSync = require('browser-sync').create();

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

// babel task
gulp.task('babel', ['sass'], () => {
    return gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

// watch task
gulp.task('watch', () => {
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['babel']);
    gulp.watch("*.html").on('change', reload);
});

// default task
gulp.task('default', ['serve', 'watch']);
