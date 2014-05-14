const path = require('path');
const expect = require('chai').expect;
const utils = require('../lib/utils');


describe('utils', function () {
  describe('buildRegexGroup()', function () {
    it('should create a regex group when more than one pattern is passed', function () {
      var actual = utils.buildRegexGroup(['a', 'b']);

      expect(actual).to.eql(new RegExp('(a|b)'));
      expect(actual).to.eql(/(a|b)/);
    });

    it('should create a regex group when more than one pattern is passed', function () {
      var actual = utils.buildRegexGroup(['a', 'b', 'c']);

      expect(actual).to.eql(new RegExp('(a|b|c)'));
      expect(actual).to.eql(/(a|b|c)/);
    });

    it('should not create a regex group when one pattern is passed', function () {
      var actual = utils.buildRegexGroup('a');

      expect(actual).to.eql(new RegExp('a'));
      expect(actual).to.eql(/a/);
    });

    it('should add flags when passed as a second parameter', function () {
      var actual = utils.buildRegexGroup('a', 'gi');

      expect(actual).to.eql(new RegExp('a', 'gi'));
      expect(actual).to.eql(/a/gi);
    });
  });
});
