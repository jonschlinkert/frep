# frep [![NPM version](https://badge.fury.io/js/frep.png)](http://badge.fury.io/js/frep)

> A find and replace utility. Modify strings by passing an array of RegExp or string replacement patterns


## Quickstart

```bash
npm i frep --save
```

```js
var frep = require('frep');

frep.replaceStr(String, ArrayOfPatterns));
frep.replaceArray(ArrayOfStrings, ArrayOfPatterns));
```

## Methods

### replaceStr

`replaceStr(String, Array)`

Parameters:

* `String`: The string to modify with the given replacement patterns.
* `Array`: Array of objects containing the replacement patterns, each including a `pattern` property (which can be a string or a RegExp), and a `replacement` property (which can be a string or a function to be called for each match).

Given the following:

```js
var frep = require('frep');

var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
var patterns = [
  {
    pattern: /(A|B|C)/g,
    replacement: '###'
  },
  {
    pattern: /(X|Y|Z)/g,
    replacement: '$$$'
  },
  ...
];

frep.replaceStr(str, patterns));
```

A new string is returned with some or all matches replaced by the given replacement strings.

```
#########DEFGHIJKLMNOPQRSTUVW$$$$$$$$$
```

### replaceArray

`replaceArray(Array, Array)`

Parameters:

* `Array`: The string to modify with the given replacement patterns.
* `Array`: Same as `replacStr`, this is an an array of objects containing the replacement patterns, each including a `pattern` property, which can be a string or a RegExp, and a `replacement` property, which can be a string or a function to be called for each match.

Given the following:

```js
var frep = require('frep');

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

frep.replaceArray(arr, patterns));
```

An array of new strings is returned, with some or all matches in each string replaced by the given replacement strings.

```json
["$$$on ###chlinkert", "###rian $$$oodward"]
```


## Author

+ [github/jonschlinkert](http://github/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)


## License
Copyright (c) 2013 Jon Schlinkert
Licensed under the [MIT license](LICENSE-MIT).

***

Project created by [Jon Schlinkert](https://github.com/jonschlinkert).

_This file was generated on Wed Sep 18 2013 00:03:54._
