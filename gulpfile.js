const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('default', () =>
	gulp.src('./src/**/*.js')
		.pipe(concat('mercury-shared.js'))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist'))
);
