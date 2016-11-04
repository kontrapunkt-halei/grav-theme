'use strict';

import path from 'path';
import pngquant from 'imagemin-pngquant';

export default (gulp, plugins, config, dirs) => {
  gulp.task('images', () => {
    return gulp.src([
      path.join(dirs.source, dirs.images, '**/*.{jpg,jpeg,gif,svg,png}')
    ])
    .pipe(plugins.imagemin({
      progressive: true,
      svgoPlugins: [
        {removeViewBox: false},
        { removeUselessDefs: false },
        { cleanupIDs: false }
      ],
      use: [pngquant({speed: 10})]
    }))
    .pipe(gulp.dest('images'));
  });
}
