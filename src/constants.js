'use strict';

const USER_ARGV_INDEX = 2;
const DEFAULT_GENERATE_COUNT = 1;
const DEFAULT_PORT = 3000;
const DEFAULT_EXPRESS_PORT = 8080;
const EXPRESS_PUBLIC_DIR = `public`;
const EXPRESS_UPLOAD_DIR = `upload`;

const FILE_MOCK_PATH = `mocks.json`;
const FILE_SQL_PATH = `fill-db.sql`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;
const FILE_API_LOG_PATH = `./src/service/logs/api.log`;

const MAX_MOCK_ITEMS = 1000;
const MAX_ID_LENGTH = 6;

const DAY_MS = 1000 * 60 * 60 * 24;
const DATE_INTERVAL = 91;

const API_PREFIX = `/api`;
const API_TIMEOUT = 1000;

const LIMIT_PER_PAGE = 8;

const JWT_ACCESS_SECRET = `nesecretjwt`;
const JWT_REFRESH_SECRET = `nesecretrefreshjwt`;
const BCRYPT_SALT_ROUNDS = 10;

const SentencesRestrict = {
  MIN: 1,
  MAX: 5,
};

const CommentsRestrict = {
  MIN: 1,
  MAX: 4,
};

const CommentsCount = {
  MIN: 2,
  MAX: 8,
};

const CategoriesCount = {
  MIN: 1,
  MAX: 4,
};

const CliCommand = {
  HELP: `--help`,
  VERSION: `--version`,
  GENERATE: `--generate`,
  SERVER: `--server`,
  FILL: `--fill`,
  FILL_DB: `--filldb`
};

const ExitCode = {
  FATAL_EXCEPTION: 1
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

const LogLevel = {
  INFO: `info`,
  ERROR: `error`,
  DEBUG: `debug`
};

const NodeEnv = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};

const ArticleSchema = {
  TITLE: {
    MIN: 30,
    MAX: 250
  },
  ANNOUNCE: {
    MIN: 30,
    MAX: 250
  },
  FULL_TEXT: {
    MAX: 1000
  },
  CATEGORIES: {
    MIN: 1
  }
};

const CommentSchema = {
  TEXT: {
    MIN: 50
  }
};

const UserSchema = {
  PASSWORD: {
    MIN: 6
  }
};

const RegisterMessage = {
  USER_ALREADY_REGISTER: `Пользователь с таким email уже зарегистрирован`,
  WRONG_EMAIL: `Неправильный email`,
  REQUIRED_FIELD: `Поле обязательно для заполнения`,
  MIN_PASSWORD_LENGTH: `Пароль должен быть не меньше 6 символов`,
  PASSWORDS_NOT_EQUALS: `Пароли не совпадают`,
  EMPTY_VALUE: `Не указано значение`
};

const LoginMessage = {
  USER_NOT_EXISTS: `Пользователь с таким email не зарегистрирован`,
  WRONG_PASSWORD: `Неправильно введён логин или пароль`,
  WRONG_EMAIL: `Неправильный email`,
  REQUIRED_FIELD: `Поле обязательно для заполнения`,
};

const CommentMessage = {
  EMPTY_VALUE: `Сообщение не может быть пустым, напишите что-нибудь!`,
  MIN_LENGTH: `Комментарий должен быть не меньше 50 символов`,
};

const DEFAULT_CLI_COMMAND = CliCommand.HELP;

module.exports = {
  USER_ARGV_INDEX,
  DEFAULT_CLI_COMMAND,
  DEFAULT_GENERATE_COUNT,
  DEFAULT_PORT,
  DEFAULT_EXPRESS_PORT,
  EXPRESS_PUBLIC_DIR,
  EXPRESS_UPLOAD_DIR,
  FILE_MOCK_PATH,
  FILE_SQL_PATH,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  FILE_COMMENTS_PATH,
  FILE_API_LOG_PATH,
  MAX_MOCK_ITEMS,
  MAX_ID_LENGTH,
  DAY_MS,
  DATE_INTERVAL,
  API_PREFIX,
  API_TIMEOUT,
  LIMIT_PER_PAGE,
  BCRYPT_SALT_ROUNDS,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  SentencesRestrict,
  CommentsRestrict,
  CommentsCount,
  CategoriesCount,
  CliCommand,
  ExitCode,
  HttpCode,
  LogLevel,
  NodeEnv,
  ArticleSchema,
  CommentSchema,
  UserSchema,
  RegisterMessage,
  LoginMessage,
  CommentMessage
};
