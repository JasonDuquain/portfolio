/* old AUTOPREFIXER MUST BE JUST BEFORE THE sourcemaps.write() call to fix the issue of erroring out with inline comments in sass files
NOT SURE IF IT MATTERS NOW BUT TEST TEST TEST*/

/*

Replace Autoprefixer browsers option to Browserslist config.
  Use browserslist key in package.json or .browserslistrc file.

  Using browsers option cause some error. Browserslist config
  can be used for Babel, Autoprefixer, postcss-normalize and other tools.

  If you really need to use option, rename it to overrideBrowserslist.

  Learn more at:
  https://github.com/browserslist/browserslist#readme
  https://twitter.com/browserslist


*/

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps'); 
var minify = require('gulp-clean-css');
var uglify = require('gulp-uglify');


var processorsArray = [
  // snipped for brevity
  require('autoprefixer')({ grid: true, browsers: ['>1%'] })
];


gulp.task('styles', function () {
    return gulp.src('scss/**/*.scss')
		.pipe(sourcemaps.init())
        
		.pipe(sass({
            outputStyle: 'expanded'

    }).on('error', sass.logError))
        .pipe(postcss(processorsArray))
        
		.pipe(sourcemaps.write())
        .pipe(gulp.dest('css'));
		
});




/* USE/FIX BABEL LATER
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
      .pipe(babel({
            presets: ['@babel/env']
        }))
      .pipe(gulp.dest('compile'))
}); */


/** THIS WORKS FOR GULP < 4.0 **/
gulp.task('watch', ['styles'], function () {
    gulp.watch('scss/**/*.scss', ['styles']);
});


gulp.task('default', ['watch']);



gulp.task('postcss', function() {
    return gulp.src('css/*.css')
    .pipe(minify())
    .pipe(gulp.dest('dist'))
});

/* ONLY WORKS WITH ES5 - GET BABEL WORKING!!
gulp.task('postjs', function() {
    return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});
*/



