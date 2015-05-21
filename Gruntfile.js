'use strict';

module.exports = function(grunt) {

  // show elapsed time at the end
  require('time-grunt')(grunt);

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

    grunt.initConfig({
      clean: {
        dev: '.tmp',
        dist: 'dist'
      },
      browserify: {
        options: {
          transform: [require('grunt-react').browserify]
        },
        dev: {
          src: ['src/main.js'],
          dest: '.tmp/main.js',
          options: {
            debug: true
          }
        },
        dist: {
          src: ['src/main.js'],
          dest: '.tmp/main.js',
          options: {
            debug: false
          }
        }
      }
    });

    grunt.registerTask('build:dev', [
      'clean:dev',
      'browserify:dev'
    ]);
    grunt.registerTask('build:dist', [
      'clean:dist',
      'browserify:dist'
    ]);
}
