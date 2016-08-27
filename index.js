const webdriverio = require('webdriverio');
const upgradeCaps = require('./lib/upgrade-capabilities');
const noop = function() { };

const DEFAULT_URL = 'about:blank';
const DEFAULT_BROWSER = 'phantomjs';

const xbrowser = function(config, done) {
  if (typeof config === 'function') {
    config = {
      test: config
    };
  } else if (Array.isArray(config)) {
    return xbrowser.all(config);
  } else if (typeof config !== 'object') {
    throw new Error('expected Function, Object, or Array; got ' + (typeof config));
  }

  var test = config.test;
  var args = config.arguments || [];
  if (typeof test !== 'function' && typeof test !== 'string') {
    throw new Error('expected Function or String in config.test; got ' + (typeof config.test));
  }

  var url = config.url || DEFAULT_URL;

  var browsers = Array.isArray(config.browsers)
    ? config.browsers
    : [config.browser || config.desiredCapabilities || DEFAULT_BROWSER];

  browsers = upgradeCaps(browsers);

  var report = config.report || noop;

  var promise = Promise.all(browsers.map(function(browser) {
    config.desiredCapabilities = browser;
    return webdriverio.remote(config)
      .init()
      .url(url)
      // XXX this is ugly as hell, but there doesn't seem to be
      // a cleaner way to apply these arguments...
      .execute(test, args[0], args[1], args[2], args[3], args[4], args[5])
      .then(function(value) {
        browser.result = value.value;
        report(browser);
      })
      .end();
  }));

  if (typeof done === 'function') {
    return promise
      .catch(done)
      .then(function() {
        done(null, browsers);
      });
  }
  return promise;
};

xbrowser.all = function(configs, done) {
  var results = [];
  var promises = config.map(function(conf) {
    return xbrowser(conf).then(function(res) {
      results = results.concat(res);
    });
  });
  return Promise.all(promises)
    .then(function() {
      return done
        ? done(null, results)
        : results;
    });
};

module.exports = xbrowser;
