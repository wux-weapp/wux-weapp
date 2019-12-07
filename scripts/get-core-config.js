/* eslint global-require: "off" */
/* eslint no-console: ["error", { allow: ["log"] }] */

const path = require('path');
let config = require('./config.json');
let logged = false;

function getConfig() {
  const args = process.argv;
  let configArgIndex;
  let configPath;
  args.forEach((arg, argIndex) => {
    if (arg === '--config') configArgIndex = argIndex;
  });
  if (configArgIndex && args[configArgIndex + 1]) {
    configPath = path.resolve(args[configArgIndex + 1]);
  }
  if (configPath) {
    config = require(configPath); // eslint-disable-line
    if (!logged) {
      console.log(`Building using custom config from ${configPath}`);
    }
    logged = true;
  }
  return config;
}

module.exports = getConfig;
