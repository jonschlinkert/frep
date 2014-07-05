var path = require('path');
var expect = require('chai').expect;
var frep = require('../');


describe('when an array of replacement patterns is passed', function () {
  it('should replace the first match.', function () {

    var patterns = ['ABC', 'DEF']
    var replacements = {
      'A': 'AAA',
      'B': 'BBB',
      'C': 'CCC',
      'D': 'DDD',
      'E': 'EEE',
      'F': 'FFF'
    };
    var actual = frep.arrWithObj(patterns, replacements);
    expect(actual).to.eql(['AAABBBCCC', 'DDDEEEFFF']);
  });
});