'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;

const {
  CliCommand,
  DEFAULT_GENERATE_COUNT,
  FILE_SQL_PATH,
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


const generateComments = ({count, comments, articleId, userCount}) => {
  return Array(count).fill({}).map(() => ({
    articleId,
    userId: getRandomInt(1, userCount),
    text: shuffle(comments).slice(0, getRandomInt(CommentsRestrict.MIN, CommentsRestrict.MAX)).join(` `),
  }));
};

const generateArticles = ({count, titles, sentences, categories, comments, userCount}) => {
  const pictureNames = [`forest@1x.jpg`, `sea@1x.jpg`, `skyscraper@1x.jpg`];

  return Array(count).fill({}).map((_, index) => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    picture: shuffle(pictureNames)[getRandomInt(0, 2)],
    announce: shuffle(sentences).slice(0, SentencesRestrict.MAX).join(` `),
    fullText: shuffle(sentences).slice(0, getRandomInt(SentencesRestrict.MIN, sentences.length - 1)).join(` `),
    category: shuffle(categories).slice(0, getRandomInt(CategoriesCount.MIN, CategoriesCount.MAX)),
    comments: generateComments({
      count: getRandomInt(CommentsCount.MIN, CommentsCount.MAX),
      comments,
      articleId: index + 1,
      userCount
    })
  }));
};

const writeArticles = async ({articles, users, categories}) => {
  try {
    const date = new Date().toISOString();

    const comments = articles.flatMap((article) => article.comments);

    const articleCategories = [];
    articles.forEach((article, index) => {
      const articleId = index + 1;
      article.category.forEach((category) => {
        articleCategories.push({
          articleId,
          categoryId: categories.indexOf(category) + 1
        });
      });
    });

    const userValues = users.map((user) => {
      const {email, name, surname, password, avatar} = user;
      return `('${email}', '${name}', '${surname}', '${password}', '${avatar}', '${date}', '${date}')`;
    });

    const categoryValues = categories.map((name) => `('${name}', '${date}', '${date}')`);

    const articleValues = articles.map((article) => {
      const {title, announce, fullText, picture} = article;
      return `('${title}', '${announce}', '${fullText}', '${picture}', '${date}', '${date}')`;
    });

    const articleCategoryValues = articleCategories.map(({articleId, categoryId}) => {
      return `('${date}', '${date}', ${articleId}, ${categoryId})`;
    });

    const commentValues = comments.map((comment) => {
      const {text, articleId, userId} = comment;
      return `('${text}', '${date}', '${date}', ${articleId}, ${userId})`;
    });

    const insertValues = (values) => values.join(`,\n`);

    const content = (`
-- Add users
INSERT INTO users(email, name, surname, password, avatar, createdAt, updatedAt) VALUES
${insertValues(userValues)};

-- Add categories
INSERT INTO categories(name, createdAt, updatedAt) VALUES
${insertValues(categoryValues)};

-- Add articles
ALTER TABLE articles DISABLE TRIGGER ALL;

INSERT INTO articles(title, announce, fullText, picture, createdAt, updatedAt) VALUES
${insertValues(articleValues)};

ALTER TABLE articles ENABLE TRIGGER ALL;

-- Add article categories
ALTER TABLE articleCategories DISABLE TRIGGER ALL;

INSERT INTO articleCategories(createdAt, updatedAt, ArticleId, CategoryId) VALUES
${insertValues(articleCategoryValues)};

ALTER TABLE articleCategories ENABLE TRIGGER ALL;

-- Add comments
ALTER TABLE comments DISABLE TRIGGER ALL;

INSERT INTO comments(text, createdAt, updatedAt, articleId, userId) VALUES
${insertValues(commentValues)};

ALTER TABLE comments ENABLE TRIGGER ALL;
-- end
    `).trim();

    await fs.writeFile(FILE_SQL_PATH, content);
    console.info(chalk.green(`Данные в количестве [${articles.length}] успешно сформированы в файл ${FILE_SQL_PATH}`));
  } catch (error) {
    console.info(chalk.red(`Ошибка при создании данных`));
    process.exit(ExitCode.FATAL_EXCEPTION);
  }
};


module.exports = {
  name: CliCommand.FILL,
  async run(args = []) {
    const [userCount] = args;
    const countArticles = checkNumParam(userCount, DEFAULT_GENERATE_COUNT);

    if (countArticles > MAX_MOCK_ITEMS) {
      console.info(chalk.red(`Не больше ${MAX_MOCK_ITEMS} объявлений`));
      return;
    }

    const users = [
      {
        email: `admin@example.com`,
        name: `Super`,
        surname: `Admin`,
        password: `5f4dcc3b5aa765d61d8327deb882cf99`,
        avatar: `avatar-1.png`
      },
      {
        email: `petrov@example.com`,
        name: `Пётр`,
        surname: `Петров`,
        password: `5f4dcc3b5aa765d61d8327deb882cf99`,
        avatar: `avatar-3.png`
      }
    ];

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
      comments,
      userCount: users.length
    });

    writeArticles({articles, users, categories});
  }
};
