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

module.exports = {
  getRandomInt,
  shuffle,
  formatDate,
  checkNumParam,
  readContent
};
