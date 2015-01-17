/*
 * Generated on 2014-12-15
 * generator-assemble v0.5.0
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  //var mozjpeg = require('imagemin-mozjpeg');

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist',
    },

    bower: {
      install: {
        options: {
          copy: false,
          install: true,
          verbose: false,
          cleanBowerDir: false,
        }
      }
    },

    watch: {
      assemble: {
        files: ['<%= config.src %>/**/*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      sass: {
        files: ['<%= config.src %>/**/*.{sass,scss}'],
        tasks: ['sass', 'autoprefixer']
      },
      js: {
        files: ['<%= config.src %>/**/*.js'],
        tasks: ['dev-build']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>'],

    copy: {
      images: {
        cwd: '<%= config.src %>/assets/images',
        src: '**',
        dest: '<%= config.dist %>/assets/images',
        flatten: false,
        expand: true
      },
      js: {
        cwd: '<%= config.src %>/js',
        src: '**',
        dest: '<%= config.dist %>/js',
        flatten: false,
        expand: true
      },
      bower_components: {
        cwd: '<%= config.src %>/bower_components',
        src: '**',
        dest: '<%= config.dist %>/bower_components',
        flatten: false,
        expand: true
      },
      htaccess: {
        cwd: '<%= config.src %>',
        src: '.htaccess',
        dest: '<%= config.dist %>',
        flatte: false,
        expand: true
      }
    },

    useminPrepare: {
      options: {
        dest: '<%= config.dist %>',
        root: '<%= config.src %>'
      },
      html: {
        src: ['<%= config.src %>/templates/layouts/default.hbs']
      }
    },

    usemin: {
      options: {
          dirs: ['<%= config.dist %>'],
          assetsDirs: ['<%= config.dist %>'],
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/{,*/}*.css']
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%= config.dist %>/assets',
          layout: '<%= config.src %>/templates/layouts/default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/*.hbs',
          helpers: 'node_modules/handlebars-helpers{,*/}*.js',
        },
        files: {
          '<%= config.dist %>/index.html': ['<%= config.src %>/templates/pages/index.hbs'],
          '<%= config.dist %>/404.html': ['<%= config.src %>/templates/pages/404.hbs'],
        }
      }
    },

    sass: {
      main: {
        options: {
          bundleExec: true,
          style: 'compressed',
          loadPath: ['<%= config.src %>/bower_components', '<%= config.src %>/sass'],
          require: ['sass-globbing'],
          lineNumbers: true
        },
        files: [{
          bundleExec: true,
          expand: true,
          cwd: '<%= config.src %>/sass',
          src: ['*.sass'],
          dest: '<%= config.dist %>/assets',
          ext: '.css'
        }]
      }
    },

    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 3 versions', 'Firefox ESR']
      },

      // prefix all files
      all: {
        src: '<%= config.dist %>/assets/*.css',
      },
    },

    filerev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 8
      },
      images: {
          src: '<%= config.dist %>/assets/images/*.{jpg,jpeg,gif,png,webp}'
      },
      css: {
          src: ['<%= config.dist %>/**/*.css']
      },
      js: {
          src: '<%= config.dist %>/**/*.js'
      }
    },

  });

  grunt.loadNpmTasks('assemble');

  grunt.registerTask('server', [
    'dev-build',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('dev-build', [
    'clean',
    'bower',
    'copy:images',
    'copy:js',
    'copy:bower_components',
    'sass',
    'autoprefixer',
    'assemble',
  ]);

  grunt.registerTask('build', [
    'clean',
    'bower',
    'copy:images',
    'copy:htaccess',
    'sass',
    'autoprefixer',
    'useminPrepare',
    'concat',
    'uglify',
    'filerev',
    'assemble',
    'usemin',
  ]);

  grunt.registerTask('dev', [
    'dev-build'
  ]);

  grunt.registerTask('default', [
    'server'
  ]);

  grunt.registerTask('prod', [
    'build'
  ]);

};
