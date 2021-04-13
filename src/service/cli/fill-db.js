'use strict';

const chalk = require(`chalk`);
const {getLogger} = require(`../lib/logger`);
const createSequelize = require(`../lib/sequelize`);
const initDB = require(`../lib/init-db`);

const {
  CliCommand,
  DEFAULT_GENERATE_COUNT,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  FILE_COMMENTS_PATH,
  MAX_MOCK_ITEMS,
  SentencesRestrict,
  CommentsRestrict,
  CommentsCount,
  CategoriesCount,
  ExitCode
} = require(`../../constants`);

const {
  getRandomInt,
  shuffle,
  checkNumParam,
  readContent
} = require(`../../utils`);

const generateComments = ({count, comments, articleId}) => {
  return Array(count).fill({}).map(() => ({
    articleId,
    text: shuffle(comments).slice(0, getRandomInt(CommentsRestrict.MIN, CommentsRestrict.MAX)).join(` `),
    userId: 1
  }));
};

const generateArticles = ({count, titles, sentences, categories, comments}) => {
  const pictureNames = [`forest@1x.jpg`, `sea@1x.jpg`, `skyscraper@1x.jpg`];

  return Array(count).fill({}).map((_, index) => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    picture: shuffle(pictureNames)[getRandomInt(0, 2)],
    announce: shuffle(sentences).slice(0, SentencesRestrict.MAX).join(` `),
    fullText: shuffle(sentences).slice(0, getRandomInt(SentencesRestrict.MIN, sentences.length - 1)).join(` `),
    categories: shuffle(categories).slice(0, getRandomInt(CategoriesCount.MIN, CategoriesCount.MAX)),
    comments: generateComments({
      count: getRandomInt(CommentsCount.MIN, CommentsCount.MAX),
      comments,
      articleId: index + 1
    })
  }));
};

module.exports = {
  name: CliCommand.FILL_DB,
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

    const [userCount] = args;
    const countArticles = checkNumParam(userCount, DEFAULT_GENERATE_COUNT);

    if (countArticles > MAX_MOCK_ITEMS) {
      console.info(chalk.red(`Не больше ${MAX_MOCK_ITEMS} объявлений`));
      return;
    }

    const [categories, sentences, titles, comments] = await Promise.all([
      readContent(FILE_CATEGORIES_PATH),
      readContent(FILE_SENTENCES_PATH),
      readContent(FILE_TITLES_PATH),
      readContent(FILE_COMMENTS_PATH)
    ]);

    const articles = generateArticles({
      count: countArticles,
      categories,
      sentences,
      titles,
      comments
    });

    await initDB(sequelize, {categories, articles});
  }
};
