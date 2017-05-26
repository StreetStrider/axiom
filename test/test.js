
var tmpdir = require('os').tmpdir
var randomstring = require('randomstring').generate

var rootpath = require('rootpath')(__dirname, '..')
var rootpath_tmp = require('rootpath')(tmpdir(), 'axiom', randomstring(8))

var read  = require('fs-sync').read
var write = require('fs-sync').write

var compare = require('dir-compare').compareSync

var less = (...args) => require('less').render(...args)

var filename = rootpath('test/case/index.less')
var contents = read(filename)


console.log(rootpath_tmp())

less(contents, { filename })
.then(it => it.css)
.then(result =>
{
	write(rootpath_tmp('index.css'), result)

	var tmp = rootpath_tmp()
	var fix = rootpath('fixture')

	var delta = compare(tmp, fix,
	{
		compareSize: true,
		compareContent: true,
	})

	if (! delta.same)
	{
		console.warn('result differs', '\n')
		console.log(`meld ${tmp} ${fix}`, '\n')

		throw new Error('result_differs')
	}
})
.catch(error =>
{
	console.error(error)

	process.exit(1)
})
