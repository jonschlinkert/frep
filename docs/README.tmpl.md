# {%= name %} {%= badge("fury") %}

> {%= description %}

## Quickstart
{%= include("install") %}

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

{%= docs("api") %}

## Usage example
{%= docs("example") %}

## Author
{%= contrib("jon") %}

## License
{%= copyright() %}
{%= license() %}

***

{%= include("footer") %}