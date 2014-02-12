const expect = require('chai').expect;
const frep = require('../');
const _str = require('underscore.string');
const _   = require('lodash');


describe('frep', function () {
  it('should replace "foo" with "SUCCESS".', function () {
    var patterns = [{pattern: /:foo/g, replacement: 'SUCCESS'}];
    var actual = frep.strWithArr(':foo/:bar/:baz', patterns);
    var expected = 'SUCCESS/:bar/:baz';
    expect(actual).to.eql(expected);
  });

  it('should replace the given strings with the given replacements.', function () {
    var patterns = [
      {
        pattern: /[ABC]/g,
        replacement: '###'
      },
      {
        pattern: /[XYZ]/g,
        replacement: '$$$'
      }
    ];
    var actual = frep.strWithArr('ABCDEFGHIJKLMNOPQRSTUVWXYZ', patterns);
    var expected = '#########DEFGHIJKLMNOPQRSTUVW$$$$$$';
    expect(actual).to.eql(expected);
  });
});