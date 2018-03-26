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
			presets: ['env']
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
		'get-from-head-data-store.js',
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

gulp.task('build:individual', () => {
	return gulp.src('src/*.js')
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist'))
});

gulp.task('default', [
	'build:body-bottom',
	'build:head',
	'build:head-tracking',
	'build:individual'
]);
