# x-browser
Get the return value of a JavaScript function on one or more [Selenium]-powered
browsers.

**In order to use this locally**, you'll need to install Selenium Server.
[webdriver-manager] does this for you:

```sh
npm i -g webdriver-manager
webdriver-manager update
webdriver-manager start
```

Or you can use a cloud testing service, such as [BrowserStack], [Sauce Labs],
or [TestingBot]. See the [examples](examples/) directory for usage.

## Installation

Install it with [npm][npm package]:

```sh
npm install x-browser
```

## API

### `xbrowser(config[, done])`
Run the [configuration](#configuration) and optionally call `done(error,
results)` when finished with all browsers. This function returns a promise, so
it's friendly with testing frameworks such as [Mocha].

## Configuration
For the most part, your configuration object can have any of the same
properties that [webdriverio] expects, including:

* `desiredCapabilities` (alias: `browser` or `browsers`) can either be an
  object with `browserName`, `version`, and other [Selenium]-compatible
  "desired capabilities"; or a [descap]-compatible shorthand string describing
  one or more browsers.
* `user` and `key` may be used to provide credentials to cloud services such
  as [Sauce Labs] or [BrowserStack].
* `host` and `port` may be used to specify the Selenium Server hostname and
  port. If unspecified, the default hostname and port for Selenium Server are
  used.
* `logLevel` may be `'silent'`, etc.

The following configuration properties are specific to x-browser:

* `test` should be a JavaScript function that will be run on each browser. This
  function may _only_ access its own parameters and global variables in the
  browser scope, such as `window` and `document`. It must be synchronous.
* `arguments` can be used to specify an array of up to 6 arguments to the
  `test` function. These arguments _must_ be primitives, arrays, or object
  literals that can be serialized with `JSON.stringify()`.

## CLI

The `x-browser` [npm package] installs a CLI tool, which you can learn more
about with:

```sh
x-browser --help
```


[Sauce Labs configurator]: https://wiki.saucelabs.com/display/DOCS/Platform+Configurator
[Sauce Labs]: https://saucelabs.com/
[BrowserStack]: https://www.browserstack.com/
[Selenium]: http://www.seleniumhq.org/
[descap]: https://github.com/shawnbot/descap
[webdriverio]: http://webdriver.io/
[webdriver-manager]: https://www.npmjs.com/package/webdriver-manager
[BrowserStack]: https://www.browserstack.com/
[TestingBot]: https://testingbot.com/
[Mocha]: http://mochajs.org/
[npm package]: https://npm.im/x-browser
