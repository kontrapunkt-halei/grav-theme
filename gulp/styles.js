'use strict';
import path       from 'path';
import beeper     from 'beeper';

export default (gulp, plugins, config, dirs, browserSync) => {
  // sass task
    // Minify CSS if run wtih --production flag
    // var minifycss = plugins.if(isProduction, $.minifyCss());
    gulp.task('styles', () => {
      gulp.src(path.join(dirs.source, dirs.styles, config.entries.css))
        .pipe(plugins.plumber({
          errorHandler: function (error) {
            console.log(error.message);
            beeper('***');
            this.emit('end');
        }}))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({
          errLogToConsole: true,
          includePaths:[
            './node_modules/normalize.css',
            './node_modules/foundation-sites/scss',
            path.join(dirs.source, dirs.styles)
          ],
          outputStyle: 'expanded'
        }))
        .pipe(plugins.autoprefixer({
          browsers: ['last 2 version', '> 5%', 'safari 5', 'ios 6', 'android 4']
        }))
        .pipe(plugins.sourcemaps.write('./'))
        // .pipe(plugins.minifycss)
        // .pipe(plugins.if(!isProduction, sourcemaps.write('.')))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream({match: '**/*.css'}));
    });
};
