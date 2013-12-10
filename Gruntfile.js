module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    simplemocha: {
      all:  {
        src: ['test/*.js']
      }
    },
    mocha: {
      all: ['test/test.html'],
      options: {
        run: true
      }
    },
    jshint: {
      files: ['streetsweeper.js', 'test/test.js']
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %>.js - v<%= pkg.version %>\n' +
                '(c) 2013 Casey Thomas, MIT License *!/\n'
      },
      dist: {
        files: {
          'streetsweeper.min.js': ['<banner>', 'streetsweeper.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('all', ['simplemocha', 'mocha', 'jshint', 'uglify']);
  grunt.registerTask('default', ['simplemocha', 'jshint', 'uglify']);
};