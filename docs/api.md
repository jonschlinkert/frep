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

## .strWithArr( string, array )
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

## patterns as arrays
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

## .arrWithArr( array, array )
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



## .strWithObj( string, object )
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


## .arrWithObj( array, object )
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