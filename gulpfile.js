const gulp  = require('gulp');
const mocha = require('gulp-mocha');
const pm2   = require('pm2');
var shell = require('gulp-shell');

gulp.task('test', async () => {
  gulp.src('test/test_*.js', {read: false})
  .pipe(mocha({reporter: 'nyan'}))
});

gulp.task('start', async () => {
  pm2.connect(true, async () => {
    pm2.start({
      name: 'Porra',
      script: 'lib/index.js',
      exec_mode: 'cluster',
      instances: 4
    }, async () => {
         console.log('Arranca porra');
       });
  });
});

gulp.task('stop', async () => {
  pm2.connect(true, async () => {
    pm2.stop( "Porra", ( err, proc ) => {
      console.log("Parando la porra");
    });
  });
});
