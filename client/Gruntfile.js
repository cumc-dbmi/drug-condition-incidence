module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['index.js', 'web/js/**/*.js']
        },
        watch: {
            express: {
                files: ['web/**/*'],
                tasks: ['concat', 'copy', 'express:dev'],
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

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-express-server');

    // Default task(s).
    grunt.registerTask('dist', ['concat', 'copy', 'express', 'watch']);

    grunt.registerTask('default', ['jshint']);

};
