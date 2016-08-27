const descap = require('descap');

module.exports = function upgradeCapabilities(caps) {
  return caps.reduce(function(caps, cap) {
    if (typeof cap === 'object') {
      caps.push(cap);
      return caps;
    } else {
      return caps.concat(descap(cap));
    }
  }, []);
};
