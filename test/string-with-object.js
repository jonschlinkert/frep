var path = require('path');
var expect = require('chai').expect;
var frep = require('../');


describe('when an object of replacement patterns is passed', function () {
  it('should replace the first match.', function () {

    var pattern = 'ABC'
    var replacements = {
      'A': 'AAA',
      'B': 'BBB',
      'C': 'CCC',
      'D': 'DDD',
      'E': 'EEE',
      'F': 'FFF'
    };
    var actual = frep.strWithObj(pattern, replacements);
    expect(actual).to.eql('AAABBBCCC');
  });
});
