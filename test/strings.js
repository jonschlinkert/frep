const path = require('path');
const expect = require('chai').expect;
const frep = require('../');



describe('when a string is passed as a replacement pattern', function () {
  it('should replace the first match.', function () {

    var template = 'a[a+]b';
    var replacements = [
      {
        pattern: '[a+]',
        replacement: ''
      }
    ];
    var actual = frep.strWithArr(template, replacements);
    expect(actual).to.eql('ab');
  });
});