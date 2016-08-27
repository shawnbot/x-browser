const path = require('path');

module.exports = function resolve(filename, to) {
  if (filename.match(/^[\.\/]/)) {
    return filename;
  }
  return path.join(to, filename);
};
