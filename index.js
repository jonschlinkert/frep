/**!
 * frep <http://github.com/jonsclhinkert/frep>
 * Copyright (c) 2014, Jon Schlinkert, contributors
 * Licensed under the MIT license.
 */

const utils = require('./lib/utils');
const replace = module.exports = {};



replace.patternArray = function(str, patterns) {
  return patterns.reduce(function(content, pairings) {
    return content.replace(pairings[0], pairings[1]);
  }, str);
};


/**
 * Transform a string with an array of RegExp or
 * string replacement patterns
 * @param  {String} str          The string to modify.
 * @param  {Array}  replacements Array of replacement patterns.
 * @return {String}              The new string.
 */

replace.strWithArr = function(str, replacements) {
  return replace.patternArray(str, replacements.map(function(match) {
    if (match.auto) {
      var flags = match.flags ? match.flags : 'g';
      match.pattern = utils.buildRegexGroup(match.pattern, flags);
    }
    return [match.pattern, match.replacement];
  }));
};


/**
 * Transform an array of strings with an array of
 * RegExp or string replacement patterns
 * @param  {Array}  arr          The array of strings to modify.
 * @param  {Array}  replacements Array of replacement patterns.
 * @return {String}              The new string.
 */

replace.arrWithArr = function(arr, replacements) {
  return arr.map(function(match) {
    return replace.strWithArr(match, replacements);
  });
};


/**
 * Transform a string with an object of RegExp or
 * string replacement patterns
 * @param  {String} str       The string to modify.
 * @param  {Object} patterns  Array of replacement patterns.
 * @return {String}           The new string.
 */

replace.strWithObj = function(str, replacements) {
  var re = new RegExp(Object.keys(replacements).join('|'), 'g');
  return str.replace(re, function(match) {
    return replacements[match];
  });
};


/**
 * Transform an array of strings with an array of
 * objects of RegExp or string replacement patterns
 * @param  {Array}  arr          The array of strings to modify.
 * @param  {Array}  replacements Array of replacement patterns.
 * @return {String}              The new string.
 */

replace.arrWithObj = function(arr, replacements) {
  return arr.map(function(match) {
    return replace.strWithObj(match, replacements);
  });
};


// Aliases
replace.replaceStr = replace.strWithArr;
replace.replaceArr = replace.arrWithArr;
replace.replaceObj = replace.strWithObj;
replace.replaceObjArr = replace.arrWithObj;