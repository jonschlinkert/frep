/**!
 * frep
 * http://github.com/helpers/frep
 * Copyright (c) 2013, Jon Schlinkert, contributors
 * Licensed under the MIT license.
 */

var path = require('path');


'use strict';


var reduceArray = function (str, replacements) {
  return replacements.reduce(function (content, pairings) {
    return content.replace(pairings[0], pairings[1]);
  }, str);
};


/**
 * Modify the given string with an array of RegExp or string replacement patterns
 * @param  {String} str          The string to modify.
 * @param  {Array}  replacements Array of replacement patterns.
 * @return {String}              The new string.
 */
exports.replaceStr = function (str, replacements) {
  return reduceArray(str, replacements.map(function (rpl) {
    return [rpl.pattern, rpl.replacement];
  }));
};


/**
 * Modify the given array of strings with an array of RegExp or string replacement patterns
 * @param  {Array}  arr          The array of strings to modify.
 * @param  {Array}  replacements Array of replacement patterns.
 * @return {String}              The new string.
 */
exports.replaceArray = function (arr, replacements) {
  return arr.map(function (item) {
    return exports.replaceStr(item, replacements);
  })
};

