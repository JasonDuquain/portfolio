/* AUTOPREFIXER MUST BE JUST BEFORE THE sourcemaps.write() call to fix the issue of erroring out with inline comments in sass files*/

var gulp = require('gulp');
var sass = require('gulp-sass'); 
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
//var gcmq = require('gulp-group-css-media-queries');
 

gulp.task('styles', function() {
    return gulp.src('scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'

    }).on('error', sass.logError))
        .pipe(autoprefixer({
                browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'));
});

gulp.task('watch', ['styles'], function () {
    gulp.watch('scss/**/*.scss', ['styles']);
});


/********* MANUAL TASK TO RUN AT END *********/
gulp.task('combinemq', function () {
    gulp.src('css/styles.css')
        .pipe(gcmq())
        .pipe(gulp.dest('./css'));
});
/****************************************/


gulp.task('default', ['watch']);








