module.exports = function ( grunt ) {
	"use strict";

	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),
		compass: {
			dist: {
				options: {
					sassDir: 'public/scss',
					cssDir: 'public/css',
					environment: 'development',
					outputStyle: 'compressed'
				}
			}
		},
		concat: {
			// dist: {
			// 	src: [
			// 		'public/js/modules/module1.js',
			// 		'public/js/modules/module2.js'
			// 	],
			// 	dest: 'public/js/main.js'
			// },
			dist: {
				src: [
					'public/scss/*.scss'
				],
				dest: 'public/css/main.css'
			},
			options: {
				separator: 'rn'
			}
		},
		env: {
			options: {
				//Shared Options Hash
			},
			dev: {
				NODE_ENV: 'development',
				DEST: 'temp'
			},
			build: {
				NODE_ENV: 'production',
				DEST: 'dist',
				concat: {
					PATH: {
						'value': 'node_modules/.bin',
						'delimiter': ':'
					}
				}
			},
			functions: {
				BY_FUNCTION: function () {
					var value = '123';

					grunt.log.writeln( 'setting BY_FUNCTION to ' + value );

					return value;
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
		sass: {
			options: {
				check: true,
				style: "compact",
				lineNumbers: true
			},
			dist: {
				files: [ {
					expand: true, // Enable dynamic expansion.
					cwd: 'public/', // Src matches are relative to this path.
					src: [ '**/*.scss' ], // Actual pattern(s) to match.
					dest: 'public/css/', // Destination path prefix.
					ext: '.css', // Dest filepaths will have this extension.
					extDot: 'first' // Extensions in filenames begin after the first dot
				} ]
				// files: {
				// 	// 'destination': 'source'
				// 	// main styles
				// 	'public/css/main.css': 'public/scss/main.scss',
				// 	// page styles
				// 	'public/css/admin.css': 'public/scss/pages/_admin.scss',
				// 	'public/css/home.css': 'public/scss/pages/_home.scss'
				// }
			}
		},
		watch: {
			css: {
				files: '**/*.scss',
				tasks: [ 'sass' ]
			}
		},
		uglify: {
			dynamic_mappings: {
				// Grunt will search for "**/*.js" under "lib/" when the "uglify" task
				// runs and build the appropriate src-dest file mappings then, so you
				// don't need to update the Gruntfile when files are added or removed.
				files: [ {
					expand: true, // Enable dynamic expansion.
					cwd: 'public/javascripts/', // Src matches are relative to this path.
					src: [ '**/*.js' ], // Actual pattern(s) to match.
					dest: 'public/js/', // Destination path prefix.
					ext: '.min.js', // Dest filepaths will have this extension.
					extDot: 'first' // Extensions in filenames begin after the first dot
				} ]
			},
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
					//},
					//build: {
					// src: 'public/javascripts/<%= pkg.name %>.js',
					// dest: 'public/js/<%= pkg.name %>.min.js'
					//	src: 'public/javascripts/angularApp.js',
					//	dest: 'public/js/angularApp.min.js'
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
	grunt.registerTask( 'default', [ 'env:dev', 'sass', 'jshint', 'uglify' ] );

};

