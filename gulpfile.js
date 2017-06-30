var gulp = require('gulp'),
	livereload = require('gulp-livereload'),
    uglify = require('gulp-uglifyjs'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    jsPath = './js',
    sassPath = './sass';

/*gulp.task('uglify', function () {
    gulp.src(jsPath + '/lib/*.js')
        .pipe(uglify('View.js'))
        .pipe(gulp.dest(jsPath));
});*/

gulp.task('compress', function () {
    gulp.src(jsPath + '/lib/*.js')
        .pipe(uglify({
            mangle: false
        }))
        .pipe(rename('main.js'))
        .pipe(gulp.dest(jsPath));
});

gulp.task('sass', function () {
    gulp.src(sassPath + '/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        })
        .on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
	var pathsToListen = [
        jsPath + '/lib/*.js',
        sassPath + '/**/*.scss',
        './*.html'
	];
	
	livereload.listen();

    gulp.watch(sassPath + '/**/*.scss', ['sass']);
	//gulp.watch(jsPath + '/lib/*.js', ['uglify']);
    gulp.watch(jsPath + '/lib/*.js', ['compress']);
	gulp.watch(pathsToListen, function (files) {
		livereload.changed(files);
	});
});