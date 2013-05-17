/*
 * grunt-modulate
 * https://github.com/FiNGAHOLiC/grunt-modulate
 *
 * Copyright (c) 2013 FiNGAHOLiC
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt){

	var path = require('path');

	var linefeed = grunt.util.linefeed;

	var Modulate = function(file, options){
		this.file = file;
		this.options = options;
		this.contents = null;
	};

	Modulate.cached = {};

	Modulate.prototype = {
		execute: function(){
			this.getContents();
			this.loadModule();
			this.convertToRelativePath();
			this.save();
		},
		getContents: function(){
			this.contents = this.file.src.filter(function(src){
				if(!grunt.file.exists(src)){
					this.log('Source file not found:', src, true);
					return false;
				}else{
					return true;
				};
			}).map(grunt.file.read).join(linefeed);
		},
		loadModule: function(){
			var c = Modulate, o = this.options, src, mod;
			this.contents = this.contents.replace(
				o.template,
				function(all, ind, cmnt, to, src, cnt, tc){
					src = this.file.orig.cwd + src;
					if(!grunt.file.exists(src)){
						this.log('Module file not found:', src, true);
						return (ind + to + tc);
					}else{
						mod = c.cached[src] ? c.cached[src] : (c.cached[src] = grunt.file.read(src));
						return (''
							+ ind + to + linefeed
							+ ind + (mod.replace(new RegExp(linefeed ,'gm'), linefeed + ind))
							+ tc
						);
					};
				}.bind(this)
			);
		},
		isExcluded: function(link){
			var o = this.options, i = 0, l = o.exclude.length;
			for(; i < l; i++){
				if(o.exclude[i].test(link)){
					return true;
				};
			};
			return false;
		},
		getRelativePath: function(from, to){
			var bt, rp;
			bt = path.basename(to),
			rp = path.relative(path.dirname(from), path.dirname(to));
			return ((rp !== '') ? (rp + '/' + bt) : bt);
		},
		convertToRelativePath: function(){
			var o = this.options, rp;
			if(!o.relativate) return;
			this.contents = this.contents.replace(
				o.tagslink,
				function(all, attr, qo, link, qc){
					if(!this.isExcluded(link)){
						rp = this.getRelativePath(this.file.src[0], this.file.orig.cwd + link);
						return (attr + qo + rp + qc);
					}else{
						return all;
					};
				}.bind(this)
			);
		},
		save: function(){
			var dest = this.file.dest;
			grunt.file.write(dest, this.contents);
			this.log('File modulated:', dest, false);
		},
		log: function(message, file, error){
			grunt.log[error ? 'warn' : 'writeln'](message, file);
		}
	};

	return Modulate;

};
