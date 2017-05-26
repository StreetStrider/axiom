
var rootpath = require('rootpath')(__dirname, '..')

var read  = require('fs-sync').read
var write = require('fs-sync').write

var less = (...args) => require('less').render(...args)

var filename = rootpath('axiom/index.less')
var contents = read(filename)

less(contents, { filename })
.then(it => it.css)
.then(result =>
{
	console.log(result)
}
, console.error)
