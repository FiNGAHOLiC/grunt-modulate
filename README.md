# grunt-modulate

> Templating HTML module.

## Getting Started

This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-modulate --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-modulate');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-contrib-less/tree/grunt-0.3-stable).*

## Modulate task

### Overview

_Run this task with the `grunt modulate` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### relativate
Type: `Boolean`
Default value: `false`

Convert to **document-root relative path**, or not.

#### template
Type: `RegExp`
Default value: `/([\t\ ]*?)((<!--\s#module\s"(.*?)"\s-->)([\S\s]*?)(<!--\s\/#module\s-->))/g`

Regular expression for validating template tags.

#### tagslink
Type: `RegExp`
Default value: `/(href=|src=)("|')(.*?)("|')/g`

Regular expression for validating url type and url.

#### exclude
Type: `Array`
Default value: `[/^#/, /^mailto:/, /^(\/|http|https|ftp):\/\//]`

Regular expression list for validating null link (hash link), mail link, absolute path.

### Usage Examples

#### Directory tree

```shell
.
├── Gruntfile.js
├── node_modules
├── package.json
└── test
    ├── 1
    │   ├── sub
    │   │   ├── test1.html
    │   │   └── test2.html
    │   ├── test1.html
    │   └── test2.html
    ├── 2
    │   ├── sub
    │   │   ├── test1.html
    │   │   └── test2.html
    │   ├── test1.html
    │   └── test2.html
    └── assets
        ├── html
        │   └── modules
        │       └── _src
        │           ├── _mod-bar.html
        │           ├── _mod-baz.html
        │           └── _mod-foo.html
        └── img
            └── img.gif
```

#### Gruntfile.js

```js
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
```

#### Module file

e.g. test/assets/html/module/_src/_mod-foo.html

If you want to convert to **document-root relative path**, href attribute value must be **site-root relative path**.

```html
<div class="mod-foo">
	<ul>
		<li><a href="#">Null Link</a></li>
		<li><a href="#foo">Hash Link</a></li>
		<li><a href="http://google.com">Internal Link</a></li>
		<li><a href="https://google.com">Internal Link</a></li>
		<li><a href="mailto:hoge@gmail.com">Mail Link</a></li>
		<li><a href="/1/test1.html">/1/test1.html"</a></li>
		<li><a href="/1/test2.html">/1/test2.html"</a></li>
		<li><a href="/1/sub/test1.html">/1/sub/test1.html</a></li>
		<li><a href="/1/sub/test2.html">/1/sub/test2.html</a></li>
		<li><a href="/2/test1.html">/2/test1.html</a></li>
		<li><a href="/2/test2.html">/2/test2.html</a></li>
		<li><a href="/2/sub/test1.html">/2/sub/test1.html</a></li>
		<li><a href="/2/sub/test2.html">/2/sub/test2.html</a></li>
	</ul>
</div>
```

#### Target file (before running task)

e.g. test/1/sub/test1.html

Module path must be **site-root relative path**.

```html
<!-- #module "/assets/html/modules/_src/_mod-foo.html" --><!-- /#module -->
```

#### Target file (after running task)

```html
<!-- #module "/assets/html/modules/_src/_mod-foo.html" -->
<div class="mod-foo">
	<ul>
		<li><a href="#">Null Link</a></li>
		<li><a href="#foo">Hash Link</a></li>
		<li><a href="http://google.com">Internal Link</a></li>
		<li><a href="https://google.com">Internal Link</a></li>
		<li><a href="mailto:hoge@gmail.com">Mail Link</a></li>
		<li><a href="../test1.html">/1/test1.html"</a></li>
		<li><a href="../test2.html">/1/test2.html"</a></li>
		<li><a href="test1.html">/1/sub/test1.html</a></li>
		<li><a href="test2.html">/1/sub/test2.html</a></li>
		<li><a href="../../2/test1.html">/2/test1.html</a></li>
		<li><a href="../../2/test2.html">/2/test2.html</a></li>
		<li><a href="../../2/sub/test1.html">/2/sub/test1.html</a></li>
		<li><a href="../../2/sub/test2.html">/2/sub/test2.html</a></li>
	</ul>
</div>
<!-- /#module -->
```

## Inspired by

[Modullatte](https://github.com/mach3/modullatte) by mach3

## Release History

* 2013-05-17 v0.1.0 Work in progress, not yet officially released.
