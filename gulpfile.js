var gulp = require('gulp'),
    watch = require('gulp-watch'),
    exec = require('child_process').exec;


gulp.task('watch', function () {
    gulp.watch('./client/**/*', ['androidBuild']);
});

gulp.task('androidBuild', function (cb) {
    exec('npm run build && cordova run android', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});