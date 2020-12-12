'use strict';

const USER_ARGV_INDEX = 2;
const DEFAULT_GENERATE_COUNT = 1;
const FILE_MOCK_PATH = `mocks.json`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const MAX_MOCK_ITEMS = 1000;
const DAY_MS = 1000 * 60 * 60 * 24;
const DATE_INTERVAL = 91;

const SentencesRestrict = {
  MIN: 1,
  MAX: 5,
};

const CliCommand = {
  HELP: `--help`,
  VERSION: `--version`,
  GENERATE: `--generate`
};

const ExitCode = {
  FATAL_EXCEPTION: 1
};

const DEFAULT_CLI_COMMAND = CliCommand.HELP;

module.exports = {
  USER_ARGV_INDEX,
  DEFAULT_CLI_COMMAND,
  DEFAULT_GENERATE_COUNT,
  FILE_MOCK_PATH,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  MAX_MOCK_ITEMS,
  DAY_MS,
  DATE_INTERVAL,
  SentencesRestrict,
  CliCommand,
  ExitCode
};
