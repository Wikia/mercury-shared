const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

function build(sourceDir, sourceFiles) {
	return gulp.src(sourceFiles, {
		cwd: `src/${sourceDir}`
	})
		.pipe(concat(`${sourceDir}.js`))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist'))
}

gulp.task('build:body-bottom', () => {
	build('body-bottom', [
		'cookie.js',
		'simple-extend.js',
		'tracking-internal.js',
		'tracking-ua.js'
	])
});

gulp.task('build:head', () => {
	build('head', [
		'globals.js',
		'get-from-shoebox.js',
		'geo-cookie.js',
		'load-script.js'
	])
});

gulp.task('build:head-tracking', () => {
	build('head-tracking', [
		'tracking-quantcast.js',
		'tracking-comscore.js',
		'tracking-ua-init.js'
	])
});

gulp.task('default', [
	'build:body-bottom',
	'build:head',
	'build:head-tracking',
]);
