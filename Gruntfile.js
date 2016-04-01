/*jslint node: true */
module.exports = function ( grunt ) {
	"use strict";

	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),
		compass: {
			dev: {
				options: {
					cssDir: 'public/css',
					debugInfo: true,
					environment: 'development',
					sassDir: 'public/scss',
					trace: true
				}
			},
			prod: {
				options: {
					cssDir: 'public/css',
					environment: 'production',
					sassDir: 'public/scss',
					outputStyle: 'compressed'
				}
			}
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				jshintignore: '.jshintignore',
				reporter: require( 'jshint-stylish' )
			},
			ignore_warning: {
				options: {
					'-W015': true
				},
				src: 'public/javascripts/**',
				filter: 'isFile'
			}
		},
		uglify: {
			all: {
				files: {
					'public/js/min/main.min.js': [
						'public/javascripts/angularApp.js'
					]
				}
			},
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			}
		},
		watch: {
			compass: {
				files: [ 'public/scss/**/*.{scss,sass}' ],
				tasks: [ 'compass:dev' ]
			},
			js: {
				files: [ 'public/js/**/*.js' ],
				tasks: [ 'uglify' ]
			}
		}
	} );

	grunt.loadNpmTasks( 'grunt-contrib-compass' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-nodeunit' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-env' );

	// grunt.registerTask( 'dev', [ 'env:dev', 'lint', 'server', 'watch' ] );
	// grunt.registerTask( 'build', [ 'env:build', 'lint', 'other:build:tasks' ] );
	// Default task(s).
	// grunt.registerTask( 'sass', [ 'concat', 'sass' ] );
	// grunt.registerTask( 'default', [ 'env:dev', 'sass', 'jshint', 'uglify' ] );
	// grunt.registerTask( 'default', [ 'sass', 'jshint', 'uglify' ] );
	grunt.registerTask( 'default', [ 'compass:dev', 'jshint', 'uglify', 'watch' ] );
	grunt.registerTask( 'prod', [ 'compass:dev', 'jshint' ] );

};

