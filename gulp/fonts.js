'use strict';

import path from 'path';

export default (gulp, plugins, config, dirs) => {
  gulp.task('fonts', () => {
    return gulp.src([
      path.join(dirs.source, dirs.fonts, '*')
    ])
    .pipe(plugins.rename(function(filepath){
      filepath.dirname = filepath.dirname.replace(filepath.dirname, '').replace('_', '');
    }))
    .pipe(gulp.dest('fonts'));
  });
}
