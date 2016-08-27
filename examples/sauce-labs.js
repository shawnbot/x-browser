/**
 * In order to run this example, you'll need to set the
 * `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY` environment variables to
 * your Sauce Labs username and access key, which you can find here:
 *
 * <https://saucelabs.com/beta/user-settings>
 */

module.exports = {
  test: function() {
    return navigator.appName;
  },
  browser: 'ie@8..10',
  service: 'saucelabs'
};
