#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const assign = require('object-assign');
const streamify = require('stream-array');
const tito = require('tito').formats;

const yargs = require('yargs')
  .usage('$0 [options] test.js(on)?')
  .describe('browser', 'A browser override string, e.g. "ie@8..9"')
  .describe('format', 'Output format: "csv", "tsv", "json", etc.')
  .default('format', 'ndjson')
  .alias('b', 'browsers');

const argv = yargs.argv;
const argc = argv._;

if (argv.help) {
  return yargs.showHelp();
}

const xbrowser = require('./');
const resolve = require('./lib/resolve');
const loadFile = require('./lib/load-file');

var config;
if (argc.length) {
  var configPath = resolve(argc[0], process.cwd());
  config = loadFile(configPath);
  if (typeof config === 'function') {
    config = {test: config};
  }
} else {
  config = JSON.parse(fs.readFileSync('/dev/stdin', 'utf8').toString());
}

delete argv._;
delete argv.$0;
assign(config, argv);

if (typeof config.test === 'string' && config.test.match(/\.js$/)) {
  var testPath = resolve(config.test, process.cwd());
  config.test = require(testPath);
}

console.warn('running tests...');

xbrowser(config, function(error, results) {
  if (error) {
    console.error(error);
    return process.exit(1);
  }
  streamify(results)
    .pipe(tito.createWriteStream(argv.format))
    .pipe(process.stdout);
});
