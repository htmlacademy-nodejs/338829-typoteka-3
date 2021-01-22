'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {nanoid} = require(`nanoid`);

const {
  CliCommand,
  DEFAULT_GENERATE_COUNT,
  FILE_MOCK_PATH,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  FILE_COMMENTS_PATH,
  MAX_MOCK_ITEMS,
  MAX_ID_LENGTH,
  MAX_COMMENTS,
  DAY_MS,
  DATE_INTERVAL,
  SentencesRestrict,
  CommentsRestrict,
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

const generateComments = (count, comments) => {
  return Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments).slice(0, getRandomInt(CommentsRestrict.MIN, CommentsRestrict.MAX)).join(` `),
  }));
};

const generatePost = ({count, titles, sentences, categories, comments}) => {
  return Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffle(sentences).slice(0, SentencesRestrict.MAX).join(` `),
    fullText: shuffle(sentences).slice(0, getRandomInt(SentencesRestrict.MIN, sentences.length - 1)).join(` `),
    createdDate: getRandomDate(),
    category: shuffle(categories).slice(getRandomInt(0, categories.length - 1)),
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
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

    const [categories, sentences, titles, comments] = await Promise.all([
      readContent(FILE_CATEGORIES_PATH),
      readContent(FILE_SENTENCES_PATH),
      readContent(FILE_TITLES_PATH),
      readContent(FILE_COMMENTS_PATH)
    ]);

    const posts = generatePost({
      count: countPosts,
      categories,
      sentences,
      titles,
      comments
    });

    whitePost(posts);
  }
};
