module.exports = function (grunt) {

    checkConfig();

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ngconstant: {
            options: {
                dest: 'web/js/config.js',
                name: 'config'
            },
            dist: {
                constants: 'config.json'
            }
        },
        jshint: {
            all: ['index.js', 'web/js/**/*.js']
        },
        watch: {
            express: {
                files: ['web/**/*', 'config.json'],
                tasks: ['ngconstant', 'concat', 'copy', 'express:dev'],
                options: {
                    spawn: false,
                },
            },
        },
        express: {
            dev: {
                options: {
                    script: 'index.js'
                }
            },
        },
        concat: {
            'dist/<%= pkg.name %>.css': [
                'node_modules/bootstrap/dist/css/bootstrap.min.css',
                'node_modules/jquery-ui-dist/jquery-ui.min.css',
                'web/css/*.css'
            ],
            'dist/<%= pkg.name %>.js': [
                'node_modules/jquery/dist/jquery.min.js',
                'web/vendor/highcharts.js',
                'web/vendor/highcharts-more.js',
                'web/vendor/exporting.js',
                'node_modules/angular/angular.min.js',
                'node_modules/angular-animate/angular-animate.min.js',
                'node_modules/jquery-ui-dist/jquery-ui.min.js',
                'node_modules/bootstrap/dist/js/bootstrap.min.js',
                'node_modules/d3/build/d3.min.js',
                'web/js/**/*.js'
            ]
        },
        copy: {
            html: {
                files: [
                    {
                        src: 'web/index.html',
                        dest: 'dist/index.html'
                    },
                    {
                        expand: true,
                        cwd: 'web/img',
                        src: '*',
                        dest: 'dist/img'
                    }
                ]
            }
        }
    });

    function checkConfig() {
        if (!grunt.file.exists('config.json')) {
            grunt.fail.warn('The file `config.json` was not found. Unable to build app.');
        }

        var config = grunt.file.readJSON('config.json');

        if (!grunt.file.exists('_config.json')) {
            grunt.log.warn('The file `_config.json` was not found. Unable to verify configuration.');
        } else {
            var _config = grunt.file.readJSON('_config.json');
            var message = 'The file `config.json` is not valid. Here is an example for reference:\n' +
                JSON.stringify(_config, null, '\t');
            for (var key in _config) {
                if (!config.hasOwnProperty(key)) {
                    grunt.fail.warn(message);
                }
            }
        }
    }

    grunt.loadNpmTasks('grunt-ng-constant');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-express-server');

    // Default task(s).
    grunt.registerTask('build', ['ngconstant', 'concat', 'copy']);
    grunt.registerTask('dist', ['ngconstant', 'concat', 'copy', 'watch']);

    grunt.registerTask('default', ['jshint']);

};
