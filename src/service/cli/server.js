'use strict';

const express = require(`express`);
const helmet = require(`helmet`);

const createSequelize = require(`../lib/sequelize`);
const {getLogger} = require(`../lib/logger`);
const {requestLogger} = require(`../middlewares`);
const {routes} = require(`../lib/routes`);

const {
  DEFAULT_PORT,
  API_PREFIX,
  CliCommand,
  HttpCode,
  ExitCode
} = require(`../../constants`);

const {checkNumParam} = require(`../../utils`);

const startHttpServer = (port) => {
  const logger = getLogger({name: `api`});
  const app = express();

  app.use(express.json());
  app.use(requestLogger(logger));
  app.use(API_PREFIX, routes);

  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [`'self'`],
      scriptSrc: [`'self'`],
    }
  }));
  app.use(helmet.xssFilter());

  app.use((req, res) => {
    logger.error(`Route not found: ${req.url}`);
    return res
      .status(HttpCode.NOT_FOUND)
      .send(`Not found`);
  });

  app.use((err, _req, res, _next) => {
    logger.error(`An error occurred on processing request: ${err.message}`);
    return res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .send(`Server error`);
  });

  app.listen(port, (err) => {
    if (err) {
      return logger.error(`An error occurred on server creation: ${err.message}`);
    }

    return logger.info(`Listening to connections on ${port}`);
  });
};

module.exports = {
  name: CliCommand.SERVER,
  async run(args = []) {
    const logger = getLogger({name: `db`});
    const sequelize = createSequelize();

    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
    } catch (err) {
      logger.error(`An error occured: ${err.message}`);
      process.exit(ExitCode.FATAL_EXCEPTION);
    }

    logger.info(`Connection to database established`);

    const [userPort] = args;
    const port = checkNumParam(userPort, DEFAULT_PORT);
    startHttpServer(port);
  }
};
