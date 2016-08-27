const services = require('./services');

module.exports = function configureEnv(config) {
  if (!config.service) {
    return false;
  }

  var service = services[config.service];
  if (!service) {
    throw new Error('Invalid service: "' + config.service + '"; ' +
                    'expected one of: ' + Object.keys(services).join(', '));
  }

  for (var key in service) {
    if (!config[key]) {
      config[key] = service[key];
    }
  }

  if (!config.user || !config.key) {
    console.warn('Using "' + config.service + '" service, but got empty "' +
                 (config.user ? 'key' : 'user') + '" key; this may not work.');
  }
  return true;
};

