/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var gutil = require('gulp-util');

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e',
  mockapi: 'mockapi',
  env: 'environment',
  bower_components: 'bower_components'
};

/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
  exclude: [/bootstrap\.js/,/AdminLTE\.less/],
  directory: 'bower_components',
  overrides: {
    'jquery-ui': {
      main: ['ui/core.js', 'ui/widget.js', 'ui/datepicker.js']
    },
    'angular-formly-templates-bootstrap': {
      main: ['dist/angular-formly-templates-bootstrap.min.js']
    },    
    'admin-lte': {
      main: ['dist/css/AdminLTE.css','dist/css/skins/_all-skins.min.css','dist/css/skins/skin-red.css']
    },
    'font-awesome': {
      main: ['less/font-awesome.less','fonts/fontawesome-webfont.svg','fonts/fontawesome-webfont.woff']
    }    
  }
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};
