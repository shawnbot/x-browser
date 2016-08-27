var xbrowser = require('../');
var assert = require('assert');
var assign = require('object-assign');

describe('basic', function() {

  const basicTest = function(x) {
    return document.body.nodeName === 'BODY';
  };

  this.timeout(60000);

  it('tests phantomjs latest by default', function() {
    return xbrowser(basicTest, function(error, results) {
      assert.ok(!error, error);
      assert.equal(results[0].browserName, 'phantomjs');
      assert.equal(results[0].result, true);
    });
  });

  it('can test with chrome', function() {
    return xbrowser({
      test: basicTest,
      browser: 'chrome'
    }, function(error, results) {
      assert.ok(!error);
      assert.equal(results[0].browserName, 'chrome');
      assert.equal(results[0].result, true);
    });
  });

  it('can test with Sauce Labs', function() {
    return xbrowser({
      test: basicTest,
      service: 'saucelabs',
      browser: {
        browserName: 'chrome',
        version: 48
      }
    }, function(error, results) {
      assert.ok(!error, error);
      assert.equal(results[0].result, true);
    });
  });

  it('can run IE8 on Sauce Labs', function() {
    return xbrowser({
      test: basicTest,
      service: 'saucelabs',
      browser: {
        browserName: 'Internet Explorer',
        version: 8
      }
    }, function(error, results) {
      assert.ok(!error, error);
      assert.equal(results[0].result, true);
    });

  });

});
