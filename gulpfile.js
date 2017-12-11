var gulp  = require('gulp'),
	babel = require('gulp-babel');

gulp.task('compile', function() {
	return gulp.src('./api/src/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('./api/dist'));
});

gulp.task('watch', function() {
	gulp.watch('./api/src/**/*.js', ['compile']);
});