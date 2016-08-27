const resolve = require('./resolve');

module.exports = function loadFile(filename, relativeTo) {
  if (relativeTo) {
    filename = resolve(filename, relativeTo);
  }
  return require(filename);
};
