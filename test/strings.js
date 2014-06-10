const path = require('path');
const expect = require('chai').expect;
const frep = require('../');



describe('when a string is passed as a replacement pattern', function () {
  it('should replace the first match.', function () {

    var template = 'a<comment><![CDATA[inner]]></comment>b';
    var replacements = [
      {
        pattern: '<comment><![CDATA[inner]]></comment>',
        replacement: ''
      }
    ];
    var actual = frep.strWithArr(template, replacements);
    expect(actual).to.eql('ab');
  });
});