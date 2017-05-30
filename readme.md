# axiom
Axiom is a set of axiomatic CSS mixins.

## the idea
**1**: Consider the following CSS property name and property value domains.

| key | value |
| --- | --- |
| **display** | block |
|  | flex |
|  | inline-block |
|  | inline |
| **position** | relative |
| | absolute |
| | fixed |
| **font-weight** | bold |
| **font-style** | italic |
| … etc ||

In many cases, the **value** itself is representative enough and even unique across all property domains. When you see value like `block` it is in most cases means `display: block`. So the first idea is to omit keys in cases when they are obvious. CSS does not support «boolean» or «flag» values. This is a place for a mixins, like `.block`.

**2**: We often use properties in a composition. Like when you need some special `left` value,
you often need also a `top`. Or when you specify `width` you may want to specify `height` as well in some cases. Sometimes you need block with line of text inside, so you specify both `height` and `line-height` of the same value.
Mixins, which provide adequate abstractions, like `.pos(@top; @left)` or `.wh(@width; @height)` (with a little help of reasonable defaults) may be handy.

**3**: Using axiomatic mixins allow to write short, well-composed and even poetic definitions
for elements. It is a good ground for more high-level mixins.

## install & usage
**install**:
```sh
$ npm i StreetStrider/axiom
```

**usage**:
```less
/* import whole package */
@import (reference) 'node_modules/axiom/axiom/index';

/* or pick axioms */
@import (reference) 'node_modules/axiom/axiom/display';
@import (reference) 'node_modules/axiom/axiom/flex';

.component
{
	.flex;

	& > .main
	{
		.grow;
	}
}

/* import with namespace */
#axiom
{
	@import (reference) 'node_modules/axiom/axiom/flex';
}

.component
{
	#axiom > .flex;

	& > .main
	{
		#axiom > .grow;
	}
}
```

## license
ISC, © Strider, 2017.
