'use strict';
const chalk = require(`chalk`);
const fs = require(`fs`).promises;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const formatDate = (dateMs) => {
  return new Date(dateMs).toISOString().split(`T`).join(` `).slice(0, 19);
};

const getDateWithoutTimeZone = (date) => {
  return new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
};

const convertDateToISO = (dateString) => {
  const [day, mount, year] = dateString.split(`.`);
  const date = getDateWithoutTimeZone(new Date(year, mount - 1, day));
  return date.toISOString();
};

const convertDateISOtoString = (dateISO) => {
  return dateISO.slice(0, 10).split(`-`).reverse().join(`.`);
};

const getDateStringNow = () => {
  const date = getDateWithoutTimeZone(new Date());
  const mouth = date.getUTCMonth() + 1;
  return `${date.getUTCDate()}.${mouth > 9 ? mouth : `0${mouth}`}.${date.getUTCFullYear()}`;
};

const checkNumParam = (value, defaultValue) => {
  const valueNum = Number.parseInt(value, 10);
  return valueNum && valueNum > 0 ? valueNum : defaultValue;
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

const getCategoryArticle = (categories) => {
  if (Array.isArray(categories)) {
    return categories;
  }

  if (typeof categories === `string`) {
    return [categories];
  }

  return [];
};

const getPictureArticle = (file, body) => {
  if (file && file.filename) {
    return file && file.filename;
  }

  if (body && body.picture) {
    return body.picture;
  }

  return ``;
};

const getErrorMessage = (messages = []) => {
  const errorMessage = {};

  messages.forEach((message) => {
    const regExp = new RegExp(/"(.*?)"/gi);
    const [, key] = regExp.exec(message);
    const text = message.replace(regExp, ``).trim();
    errorMessage[key] = text;
  });

  return errorMessage;
};

const getMyComments = (articles) => {
  const comments = articles
    .map((article) => article.comments)
    .reduce((prev, current) => prev.concat(current), []);

  return sortComments(comments);
};

const sortComments = (comments) => {
  return comments.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
};

const cutText = (items, key, limit) => {
  return items.map((item) => ({
    ...item,
    [key]: item[key].length > limit ? item[key].slice(0, limit).trim().concat(`...`) : item[key]
  }));
};

module.exports = {
  getRandomInt,
  shuffle,
  formatDate,
  convertDateToISO,
  convertDateISOtoString,
  getDateStringNow,
  checkNumParam,
  readContent,
  sortComments,
  getCategoryArticle,
  getPictureArticle,
  getErrorMessage,
  getMyComments,
  cutText
};
