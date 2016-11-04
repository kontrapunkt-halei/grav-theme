// Module to require whole directories

import path               from 'path';
import gulp               from 'gulp';
import gulpLoadPlugins    from 'gulp-load-plugins';
import browserSyncLib     from 'browser-sync';
import pjson              from './package.json';
import minimist           from 'minimist';
import requireDir         from 'require-dir';
import wrench             from 'wrench';
import sequence           from 'run-sequence';


const plugins = gulpLoadPlugins();

let browserSync = browserSyncLib.create();
let config = pjson.config;
let dirs = config.directories;

// setting up browsersync, need to move to task file
gulp.task('browserSync', () => {

  var files = [
    './src/_styles/**/*.scss',
    './src/_styles/*.scss'
  ];

  browserSync.init(files, {
    // Proxy address
    proxy: config.proxy.URL,
    // Port #
    port: config.proxy.PORT
  });
});

// Pulling in all tasks from the tasks folder
wrench.readdirSyncRecursive('./gulp').filter((file) => {
  return (/\.(js)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file).default(gulp, plugins, config, dirs, browserSync);
});

// Build task
// Runs copy then runs sass & javascript in parallel
gulp.task('build', ['clean'], (done) => {
  sequence([
    'styles',
    'browserify',
    'fonts',
    'images',
    // 'templates', this should be fixed, should we use jade to twig?
    'watch'],
    done);
});

/*------------------------
default task and watch
------------------------*/
// Run build task and watch for file changes
gulp.task('default', ['build', 'browserSync'], () => {});
