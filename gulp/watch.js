'use strict';

import path from 'path';

export default (gulp, plugins, config, dirs, browserSync) => {
  var dirs = config.directories;

  // Watch task
  gulp.task('watch', () => {
      // Styles
      gulp.watch([
        path.join(dirs.source, dirs.styles, '**/*.{scss,sass}'),
        path.join(dirs.source, dirs.styles, '*.{scss,sass}'),
      ], ['styles'])
      .on('change', browserSync.reload);

      // Jade Templates
      gulp.watch([
        path.join(dirs.source, '**/*.twade'),
        path.join(dirs.source, '*.twade'),
      ], ['templates'])
      .on('change', browserSync.reload);

      // script here
      gulp.watch([
        path.join(dirs.source, dirs.scripts, '**/*.js'),
        path.join(dirs.source, dirs.scripts, '*.js'),
      ], ['browserify'])
      .on('change', browserSync.reload);

      // Images
      gulp.watch([
        path.join(dirs.source, dirs.images, '**/*.{jpg,jpeg,gif,svg,png}')
      ], [])
      .on('change', browserSync.reload);

  });
}
