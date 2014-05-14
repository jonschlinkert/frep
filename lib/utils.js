/**
 * Export utils
 */

exports.arrayify = function(arr) {
  return !Array.isArray(arr) ? [arr] : arr.filter(Boolean);
};

// Build RegExp patterns for delimiters
exports.buildRegexGroup = function (re, flags) {
  // If it's already regex, return.
  if(re instanceof RegExp) {
    return re;
  }

  // If it's a string or array, continue
  re = exports.arrayify(re);

  var len = re.length;
  re = (len > 0) ? re.join('|') : re;

  if(len > 1) {
    re = '(' + re + ')';
  }
  return new RegExp(re, flags);
};
