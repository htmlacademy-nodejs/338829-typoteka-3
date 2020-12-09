'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;

const {
  CliCommand,
  DEFAULT_GENERATE_COUNT,
  MOCK_FILE_NAME,
  MOCK_TITLES,
  MOCK_SENTENCES,
  MOCK_CATEGORIES,
  MAX_MOCK_ITEMS,
  DAY_MS,
  DATE_INTERVAL,
  SentencesRestrict,
  ExitCode
} = require(`../../constans`);

const {
  getRandomInt,
  shuffle,
  formatDate
} = require(`../../utils`);

const getRandomDate = () => {
  const endDate = Math.round(Date.now());
  const startDate = endDate - (DAY_MS * DATE_INTERVAL);
  const randomMs = startDate + getRandomInt(0, endDate - startDate);
  return formatDate(randomMs);
};

const generatePost = (count) => {
  return Array(count).fill({}).map(() => ({
    title: MOCK_TITLES[getRandomInt(0, MOCK_TITLES.length - 1)],
    announce: shuffle(MOCK_SENTENCES).slice(0, SentencesRestrict.MAX).join(` `),
    fullText: shuffle(MOCK_SENTENCES).slice(0, getRandomInt(SentencesRestrict.MIN, MOCK_SENTENCES.length - 1)).join(` `),
    createdDate: getRandomDate(),
    сategory: shuffle(MOCK_CATEGORIES).slice(getRandomInt(0, MOCK_CATEGORIES.length - 1))
  }));
};

const whitePost = async (posts) => {
  try {
    await fs.writeFile(MOCK_FILE_NAME, JSON.stringify(posts));
    console.info(chalk.green(`Данные в количестве [${posts.length}] успешно сформированы в файл ${MOCK_FILE_NAME}`));
  } catch (error) {
    console.info(chalk.red(`Ошибка при создании данных`));
    process.exit(ExitCode.FATAL_EXCEPTION);
  }
};

module.exports = {
  name: CliCommand.GENERATE,
  run(args = []) {
    const [userCount] = args;
    const count = Number.parseInt(userCount, 10);
    const countPosts = count && count > 0 ? count : DEFAULT_GENERATE_COUNT;

    if (countPosts > MAX_MOCK_ITEMS) {
      console.info(chalk.red(`Не больше ${MAX_MOCK_ITEMS} объявлений`));
      return;
    }

    const posts = generatePost(countPosts);
    whitePost(posts);
  }
};
