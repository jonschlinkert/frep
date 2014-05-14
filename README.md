# frep [![NPM version](https://badge.fury.io/js/frep.png)](http://badge.fury.io/js/frep)

> Find, replace and string tranformation utility for node.js. Modify strings by passing an array or object of RegExp or string replacement patterns. Patterns can be strings, arrays of strings or regex, replacements can be strings or functions.

## Quickstart
Install with [npm](npmjs.org):

```bash
npm i frep --save-dev
```

Usage:

```js
var replace = require('frep');

// Patterns can be strings, regex or arrays.
// Replacements can be strings or functions.
var replacements = [
  {
    pattern: 'a',
    replacement: 'x'
  },
  {
    pattern: /b/,
    replacement: 'y'
  },
  {
    pattern: /c[\S]+/,
    replacement: function(match) {
      return match.toUpperCase();
    }
  }
];

console.log(replace.strWithArr('abcdefg', replacements));
//=> 'xyCDEFG'
```

## API
```js
// Transform a string with an array of replacement patterns
replace.strWithArr(String, replacements);
// Transform an array of strings with an array of replacement patterns
replace.arrWithArr(Array,  replacements);
// Transform a string with an object of replacement patterns
replace.strWithObj(String, replacements);
// Transform an array of strings with an object of replacement patterns
replace.arrWithObj(Array,  replacements);
```

### .strWithArr( string, array )
Transform a string with an array of replacement patterns.

Parameters:

* `String`: The string to modify with the given replacement patterns.
* `Array`: Array of objects containing the replacement patterns, each including a `pattern` property (which can be a string or a RegExp), and a `replacement` property (which can be a string or a function to be called for each match).
* A new string is returned with some or all matches replaced by the given replacement patterns.

**Example 1**

Given the following:

```js
var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
var patterns = [
  {
    pattern: /[ABC]/g,
    replacement: '###'
  },
  {
    pattern: /[XYZ]/g,
    replacement: '$$$'
  },
  ...
];

replace.strWithArr(str, patterns));
// => #########DEFGHIJKLMNOPQRSTUVW$$$$$$$$$
```

### patterns as arrays
Patterns may also be arrays. When replacement patterns are formatted as arrays Frep will first transform the array into a corresponding RegExp group:

**Example 2**

```js
['[ABC]', '[XYZ]']
```
gets converted to:

```js
 /([ABC]|[XYZ])/gi
 ```

**Example 3**

So the following will produce a similar result to **Example 1**, except `###` is used to replace all patterns:

```js
var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
var patterns = [
  {
    pattern: ['[ABC]', '[XYZ]'],
    replacement: '###'
  }
];

replace.strWithArr(str, patterns));
// => #########DEFGHIJKLMNOPQRSTUVW#########
```

### .arrWithArr( array, array )
Transform an array of strings with an array of replacement patterns

Parameters:

* `Array`: The string to modify with the given replacement patterns.
* `Array`: Same as `replacStr`, this is an an array of objects containing the replacement patterns, each including a `pattern` property, which can be a string or a RegExp, and a `replacement` property, which can be a string or a function to be called for each match.
* A new array of strings is returned with some or all matches replaced by the given replacement patterns.

Given the following:

**Example 4**

```js
var arr = [
  'Jon Schlinkert',
  'Brian Woodward'
];

var patterns = [
  {
    pattern: /(B|S)/g,
    replacement: '###'
  },
  {
    pattern: /(J|W)/g,
    replacement: '$$$'
  },
  ...
];

replace.arrWithArr(arr, patterns));
// => ["$$$on ###chlinkert", "###rian $$$oodward"]
```

An array of new strings is returned, with some or all matches in each string replaced by the given replacement strings.



### .strWithObj( string, object )
Transform a string with an object of replacement patterns

Parameters:

* `String`: The string to modify with the given replacement patterns.
* `Object`: Object of replacement patterns, where each key is a string or a RegExp `pattern`, and each value is the `replacement` string or function to be called for each match.
* A new string is returned with some or all matches replaced by the given replacement patterns.

**Example 5**

Given the following:

```js
var str = 'ABC'
var replacements = {
  'A': 'AAA',
  'B': 'BBB',
  'C': 'CCC',
  'D': 'DDD',
  'E': 'EEE',
  'F': 'FFF'
};

replace.strWithObj(str, replacements));
// => AAABBBCCC
```


### .arrWithObj( array, object )
Transform an array of strings with an object of replacement patterns

Parameters:

* `Array`: The array of strings to modify with the given replacement patterns.
* `Object`: Object of replacement patterns, where each key is a string or a RegExp `pattern`, and each value is the `replacement` string or function to be called for each match.
* A new array of strings is returned with some or all matches replaced by the given replacement patterns.

**Example 6**

Given the following:

```js
var arr = ['ABC', 'DEF'];
var replacements = {
  'A': 'AAA',
  'B': 'BBB',
  'C': 'CCC',
  'D': 'DDD',
  'E': 'EEE',
  'F': 'FFF'
};

replace.arrWithObj(arr, replacements));
// => ['AAABBBCCC', 'DDDEEEFFF']
```

## Usage example
### replace.strWithArray( string, array )

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

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License
Copyright (c) 2014 Jon Schlinkert, contributors.
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on May 14, 2014._