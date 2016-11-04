import path from 'path';
import del from 'del';


/*------------------------
Clean task
------------------------*/
export default function(gulp, plugins, config, dirs) {

  gulp.task('clean', del.bind(null, [
    'css',
    'templates-test',
    'js',
    'images',
    'fonts'
  ]));

}
