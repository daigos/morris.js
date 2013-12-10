module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({

    watch: {
      all: {
        options: {
          livereload: 35729
        },
        files: ['lib/**/*.coffee', 'spec/lib/**/*.coffee', 'spec/support/**/*.coffee', 'less/**/*.less'],
        tasks: 'default'
      },
      dev: {
        options: {
          livereload: 35729
        },
        files: ['lib/*.coffee', 'examples/**/*.html'],
        tasks: ['concat:build/morris.coffee', 'coffee:lib']
      }
    },

    coffee: {
      lib: {
        options: { bare: false },
        files: {
          'morris.js': ['build/morris.coffee']
        }
      },
      spec: {
        options: { bare: true },
        files: {
          'build/spec.js': ['build/spec.coffee']
        }
      },
    },
    concat: {
      'build/morris.coffee': [
        'lib/morris.coffee',
        'lib/morris.grid.coffee',
        'lib/morris.hover.coffee',
        'lib/morris.line.coffee',
        'lib/morris.area.coffee',
        'lib/morris.bar.coffee',
        'lib/morris.donut.coffee'
      ],
      'build/spec.coffee': ['spec/support/**/*.coffee', 'spec/lib/**/*.coffee']
    },
    less: {
      all: {
        src: 'less/*.less',
        dest: 'morris.css',
        options: {
          compress: true
        }
      }
    },
    uglify: {
      build: {
        files: {
          'morris.min.js': 'morris.js'
        }
      }
    },
    mocha: {
      index: ['spec/specs.html'],
      options: {run: true}
    },

    shell: {
      visual_spec: {
        command: './run.sh',
        options: {
          stdout: true,
          failOnError: true,
          execOptions: {
            cwd: 'spec/viz'
          }
        }
      }
    },

    connect: {
      server: {
        options: {
          open: true,
          base: ['examples', 'third_party', '.'],
          port: 9000,
          livereload: 35729
        }
      }
    }
  });

  grunt.registerTask('dev', ['connect', 'watch:dev'])
  grunt.registerTask('default', ['concat', 'coffee', 'less', 'uglify', 'mocha', 'shell:visual_spec']);
};
