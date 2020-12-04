'use strict';

const packageJsonFile = require(`../../../package.json`);
const {CliCommand} = require(`../../constans`);

const getVersion = () => {
  return packageJsonFile.version;
};

module.exports = {
  name: CliCommand.VERSION,
  run() {
    const currentVersion = getVersion();
    console.info(currentVersion);
  }
};
