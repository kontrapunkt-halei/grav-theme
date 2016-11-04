'use strict';
// var config            = require('../config');
import path     from 'path';
import beeper   from 'beeper';
import prettify from 'gulp-html-prettify';

// jade task, twig and jade

export default (gulp, plugins, config, dirs, browserSync) => {

  gulp.task('templates', () => {
    return gulp.src([
      path.join(dirs.source, dirs.templates, '*.twade'),
      path.join(dirs.source, dirs.templates, '**/*.twade')
    ])
      .pipe(plugins.plumber({
        errorHandler: function (error) {
  				console.log(error.message);
  				beeper('***');
  				this.emit('end');
  		}}))
      .pipe(plugins.jade({
        pretty: true
      }))
      .pipe(prettify({
        'indent_char': ' ',
        'indent-with-tabs': true,
        'indent_size': 4,
        'preserve-newlines': true,
        'end-with-newline': true
      }))
      .pipe(plugins.rename({
        extname: ".twig"
      }))
      .pipe(gulp.dest('templates-test'))
      .pipe(browserSync.stream({match: '**/*.twig'}));
  });

}
