const path = require('path');
const expect = require('chai').expect;
const frep = require('../');


// Setup
var name = 'C:/foo/bar/baz/somefile.md';
var dirname = path.dirname(name);
var extname = path.extname(name);
var basename = path.basename(name, path.extname(name));

var p = {
  dirname: dirname,
  basename: basename,
  extname: extname
};

describe('when a string with multiple potential matches is passed in', function () {
  it('should only replace exact matches and not replace partial matches.', function () {

    var template = '%d';

    var replacements = [
      {
        pattern: /%s\b/g,
        replacement: p.dirname
      },
      {
        pattern: /%d\b/g,
        replacement: p.basename
      },
      {
        pattern: /%j\b/g,
        replacement: p.extname
      }
    ];

    var actual = frep.strWithArr(template, replacements);
    expect(actual).to.eql('somefile');
  });
});

describe('when a string with multiple potential matches is passed in', function () {
  it('should only replace exact matches and not replace partial matches.', function () {

    var template = ':d/:dir';
    var replacements = [
      {
        pattern: /:d\b/g,
        replacement: p.dirname
      },
      {
        pattern: /:b\b/g,
        replacement: p.basename
      },
      {
        pattern: /:e\b/g,
        replacement: p.extname
      }
    ];
    var actual = frep.strWithArr(template, replacements);
    expect(actual).to.eql('C:/foo/bar/baz/:dir');
  });
});

describe('frep', function () {
  it('should replace "foo" with "SUCCESS".', function () {
    var replacements = [{pattern: /:foo/g, replacement: 'SUCCESS'}];
    var actual = frep.strWithArr(':foo/:bar/:baz', replacements);
    expect(actual).to.eql('SUCCESS/:bar/:baz');
  });

  it('should replace the given strings with the given replacements.', function () {
    var replacements = [
      {
        pattern: /[ABC]/g,
        replacement: '@@@'
      },
      {
        pattern: /[XYZ]/g,
        replacement: '###'
      }
    ];
    var actual = frep.strWithArr('ABCDEFGHIJKLMNOPQRSTUVWXYZ', replacements);
    var expected = '@@@@@@@@@DEFGHIJKLMNOPQRSTUVW#########';
    expect(actual).to.eql(expected);
  });

  it('should replace the given strings with the given replacements.', function () {
    var replacements = [
      {
        pattern: /(ABC)/g,
        replacement: '###'
      },
      {
        pattern: /(XYZ)/g,
        replacement: '@@@'
      }
    ];
    var actual = frep.strWithArr('ABCDEFGHIJKLMNOPQRSTUVWXYZ', replacements);
    var expected = '###DEFGHIJKLMNOPQRSTUVW@@@';
    expect(actual).to.eql(expected);
  });

  it('should replace the given strings with the given replacements.', function () {
    var replacements = [
      {
        pattern: /[^ABC]/g,
        replacement: '#'
      },
    ];
    var actual = frep.strWithArr('ABCDEFGHIJKLMNOPQRSTUVWXYZ', replacements);
    var expected = 'ABC#######################';
    expect(actual).to.eql(expected);
  });
});

describe('when an array of replacements is given, and `auto: true` is defined', function () {

  it('should convert each pattern to regex, and transform the given string with the replacement', function () {
    var replacements = [
      {
        auto: true,
        flags: 'g',
        pattern: ['ABC', 'XYZ'],
        replacement: '@@@'
      }
    ];
    var actual = frep.strWithArr('ABCDEFGHIJKLMNOPQRSTUVWXYZ', replacements);
    var expected = '@@@DEFGHIJKLMNOPQRSTUVW@@@';
    expect(actual).to.eql(expected);
  });

  it('should replace the given strings with the given replacements.', function () {
    var replacements = [
      {
        auto: true,
        pattern: ['ABC', 'XYZ'],
        replacement: function(match) {
          return match.toLowerCase();
        }
      }
    ];
    var actual = frep.strWithArr('ABCDEFGHIJKLMNOPQRSTUVWXYZ', replacements);
    var expected = 'abcDEFGHIJKLMNOPQRSTUVWxyz';
    expect(actual).to.eql(expected);
  });
});