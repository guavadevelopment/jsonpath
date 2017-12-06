module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        outputFolder: ".",

        browserify: {
            main: {
                src: ['index.js'],
                dest: '<%= outputFolder %>/<%= pkg.name %>.js',
                options: {
                    browserifyOptions: { standalone: '<%= pkg.name %>' },
                    banner: '/*! <%= pkg.name %> <%= pkg.version %> */\n',
                    alias: {
                        "jsonpath": "./index.js"
                    },
                    ignore: [
                        'file',
                        'system',
                        'source-map',
                        'estraverse',
                        'escodegen',
                        'underscore',
                        'reflect',
                        'JSONSelect'
                        //'assert' //can't remove because of lib/index.js,
                    ]
                }
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.version %> */\n'
            },
            build: {
                src: '<%= outputFolder %>/<%= pkg.name %>.js',
                dest: '<%= outputFolder %>/<%= pkg.name %>.min.js'
            }
        }

    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.registerTask('default', ['browserify', 'uglify']);

};
