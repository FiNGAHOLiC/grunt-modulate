/*
 * grunt-modulate
 * https://github.com/FiNGAHOLiC/grunt-modulate
 *
 * Copyright (c) 2013 FiNGAHOLiC
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt){

	grunt.initConfig({
		modulate: {
			modules: {
				options: {
					relativate: true
				},
				files: [
					{
						expand: true,
						cwd: 'test',
						src: ['**/*.html', '!**/_src/*.html'],
						dest: 'test'
					}
				]
			}
		}
	});

	grunt.loadTasks('tasks');

	grunt.registerTask('default', ['modulate']);

};
