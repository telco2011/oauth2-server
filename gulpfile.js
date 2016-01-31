var gulp = require('gulp');
var shell = require('gulp-shell');
var mocha = require('gulp-mocha');

gulp.task('runOauth2Server', shell.task('nodemon --watch ./ server.js'));
gulp.task('raml2html', shell.task('./node_modules/raml2html/bin/raml2html api.raml > api.html'));
gulp.task('runApiDesigner', shell.task('node ./node_modules/api-designer/bin/api-designer.js'));
gulp.task('default', ['runOauth2Server']);

gulp.task('mocha', function() {
    return gulp.src(['test/*.js'], { read: false })
        .pipe(mocha({ reporter: 'list' }))
    		.on('end', function () {
    			process.exit();
    		});
});
