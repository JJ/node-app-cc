const gulp  = require('gulp');
const mocha = require('gulp-mocha');
const pm2   = require('pm2');

gulp.task('test', () => (
    gulp.src('test/porra.js', {read: false})
        // `gulp-mocha` needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'nyan'}))
));

gulp.task('start', function () {
  pm2.connect(true, function () {
    pm2.start({
      name: 'Porra',
      script: 'index.js',
      exec_mode: 'cluster',
      instances: 4
    }, function () {
         console.log('Arranca porra');
         pm2.streamLogs('all', 0);
       });
  });
});