module.exports = {
  saucelabs: {
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    host: 'ondemand.saucelabs.com',
    port: 80
  },
  browserstack: {
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    host: 'hub.browserstack.com',
  },
  testingbot: {
    user: process.env.TESTINGBOT_KEY,
    key: process.env.TESTINGBOT_SECRET,
    host: 'hub.testingbot.com',
    port: 80
  }
};
