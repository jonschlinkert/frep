var replace = require('./');

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