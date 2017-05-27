
var ext = '.case.less';
var wait_for_all = (...args) => Promise.all(...args)

var tmpdir = require('os').tmpdir
var randomstring = require('randomstring').generate

var rootpath = require('rootpath')(__dirname, '..')
var rootpath_tmp = require('rootpath')(tmpdir(), 'axiom', randomstring(8))

var find = require('globule').find
var base = require('path').basename

var read  = require('fs-sync').read
var write = require('fs-sync').write

var compare = require('dir-compare').compareSync

var less = (...args) => require('less').render(...args)


// 
console.log(rootpath_tmp())

Promise.resolve()
.then(() =>
{
	return find(rootpath('test/case/*' + ext))
})
.then(paths =>
{
	return paths.map(path => base(path, ext))
})
.then(names =>
{
	return names.map(name =>
	{
		var filename = rootpath('test/case/', name + ext)
		var contents = read(filename)

		return less(contents, { filename })
		.then(it => it.css)
		.then(result =>
		{
			write(rootpath_tmp(name + '.css'), result)
		})
	})
})
.then(wait_for_all)
.then(it =>
{
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
