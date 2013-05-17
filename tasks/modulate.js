/*
 * grunt-modulate
 * https://github.com/FiNGAHOLiC/grunt-modulate
 *
 * Copyright (c) 2013 FiNGAHOLiC
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt){

	var Modulate = require('./lib/modulate')(grunt);

	grunt.registerMultiTask('modulate', 'Templating HTML module.', function(){

		var options = this.options({
			relativate: false,
			template: /([\t\ ]*?)((<!--\s#module\s"(.*?)"\s-->)([\S\s]*?)(<!--\s\/#module\s-->))/g,
			tagslink: /(href=|src=)("|')(.*?)("|')/g,
			exclude: [
				/^#/, 
				/^mailto:/,
				/^(\/|http|https|ftp):\/\//
			]
		});

		this.files.forEach(function(file){
			var modulate = (
				new Modulate(file, options)
			).execute();
		});

	});

};
