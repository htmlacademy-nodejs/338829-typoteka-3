'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;

const {
  CliCommand,
  DEFAULT_GENERATE_COUNT,
  FILE_MOCK_PATH,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  MAX_MOCK_ITEMS,
  DAY_MS,
  DATE_INTERVAL,
  SentencesRestrict,
  ExitCode
} = require(`../../constants`);

const {
  getRandomInt,
  shuffle,
  formatDate,
  checkNumParam
} = require(`../../utils`);

const getRandomDate = () => {
  const endDate = Math.round(Date.now());
  const startDate = endDate - (DAY_MS * DATE_INTERVAL);
  const randomMs = startDate + getRandomInt(0, endDate - startDate);
  return formatDate(randomMs);
};

const generatePost = ({count, titles, sentences, categories}) => {
  return Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffle(sentences).slice(0, SentencesRestrict.MAX).join(` `),
    fullText: shuffle(sentences).slice(0, getRandomInt(SentencesRestrict.MIN, sentences.length - 1)).join(` `),
    createdDate: getRandomDate(),
    сategory: shuffle(categories).slice(getRandomInt(0, categories.length - 1))
  }));
};

const whitePost = async (posts) => {
  try {
    await fs.writeFile(FILE_MOCK_PATH, JSON.stringify(posts));
    console.info(chalk.green(`Данные в количестве [${posts.length}] успешно сформированы в файл ${FILE_MOCK_PATH}`));
  } catch (error) {
    console.info(chalk.red(`Ошибка при создании данных`));
    process.exit(ExitCode.FATAL_EXCEPTION);
  }
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf-8`);
    return content.trim().split(`\n`);
  } catch (error) {
    console.info(chalk.red(error));
    return [];
  }
};

module.exports = {
  name: CliCommand.GENERATE,
  async run(args = []) {
    const [userCount] = args;
    const countPosts = checkNumParam(userCount, DEFAULT_GENERATE_COUNT);

    if (countPosts > MAX_MOCK_ITEMS) {
      console.info(chalk.red(`Не больше ${MAX_MOCK_ITEMS} объявлений`));
      return;
    }

    const [categories, sentences, titles] = await Promise.all([
      readContent(FILE_CATEGORIES_PATH),
      readContent(FILE_SENTENCES_PATH),
      readContent(FILE_TITLES_PATH),
    ]);

    const posts = generatePost({
      count: countPosts,
      categories,
      sentences,
      titles
    });

    whitePost(posts);
  }
};
