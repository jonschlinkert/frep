## replace.strWithArray( string, array )

> Slugify URL segments using frep

To run the example, first do: `npm install frep underscore.string`

```js
var replace = require('frep');

// We'll use underscore string's slugify function for the first example
var _str = require('underscore.string');

// A custom slugification function for the second
var slugger = function(str) {
  return str.replace(/( |-|\.)/g, '_').toLowerCase();
};

// And a third slugification function for the last example
var sluggifier = function(str) {
  return str.replace(/( |\.)/g, '-');
};

// This is an object of data, where each property will be used
// to build up a URL that needs to be slugified.  e.g.
// => /foo/bar/baz
// (in reality, you would probably have an array of objects like this)
var obj = {
  foo: 'This is foo.',
  bar: 'ThIs iS bAr.',
  baz: 'THIS is BAZ.',
};

// Our custom replacement patterns. These are used to
// transform the data from each property
var patterns = [
  {
    pattern: /:foo/g,
    replacement: _str.slugify(obj.foo) // underscore.string
  },
  {
    pattern: /:bar/g,
    replacement: slugger(obj.bar)  // custom function #1
  },
  {
    pattern: /:baz/g,
    replacement: sluggifier(obj.baz)  // custom function #2
  }
];

// The first argument, a string, will be our "structure",
// which will determine where the values from each property
// will be placed. Run frep to see what happens!
console.log(replace.strWithArr(':foo/:bar/:baz', patterns));
```