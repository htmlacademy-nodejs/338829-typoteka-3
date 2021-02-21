'use strict';

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const initDB = require(`../../lib/init-db`);
const categoryRoutes = require(`./categories-routes`);
const {CategoryService} = require(`../../data-service`);

const mockCategories = [
  `Графика`,
  `Фантастика`,
  `Кино`,
  `Спорт`,
  `IT`
];

const mockArticles = [
  {
    "title": `Как собрать камни бесконечности`,
    "announce": `Этот смартфон — настоящая находка. Большой и яркий экран мощнейший процессор — всё это в небольшом гаджете. Игры и программирование разные вещи.`,
    "fullText": `Забавным примером использования нейронной сети является генерация слов. Точность, как говорится, вежливость королей и… снайперов.`,
    "categories": [`Графика`, `Фантастика`],
    "comments": [
      {"text": `Согласен с автором! Мне кажется или я уже читал это где-то? Планируете записать видосик на эту тему? Хочу такую же футболку :-)`},
      {"text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`},
      {"text": `Совсем немного... Мне кажется или я уже читал это где-то? Плюсую, но слишком много буквы! Это где ж такие красоты?`}
    ]
  },
  {
    "title": `Нет ничего проще`,
    "announce": `Собрать камни бесконечности легко если вы прирожденный герой. Альбом стал настоящим открытием года`,
    "fullText": `Как говорится, утром деньги – вечером стулья. Из под его пера вышло 8 платиновых альбомов. Игры и программирование разные вещи. Не стоит идти в программисты если вам нравятся только игры. году.ходка.ргенерация слов.`,
    "categories": [`Фантастика`, `IT`],
    "comments": [
      {"text": `Хочу такую же футболку :-) Плюсую, но слишком много буквы! Это где ж такие красоты? Согласен с автором!`},
      {"text": `Совсем немного... Хочу такую же футболку :-) Согласен с автором!`},
      {"text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Совсем немного...`},
      {"text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`}
    ]
  }
];

const {HttpCode} = require(`../../../constants`);

const app = express();
app.use(express.json());

const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});

describe(`API returns category list`, () => {
  let response;

  beforeAll(async () => {
    await initDB(mockDB, {categories: mockCategories, articles: mockArticles});
    categoryRoutes(app, new CategoryService(mockDB));

    response = await request(app).get(`/categories`);
  });

  test(`Status code 200`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  test(`Returns list of 5 categories`, () => expect(response.body.length).toBe(5));

  test(`Return Array of category name are "Графика", "Фантастика", "Кино", "Спорт", "IT"`, () => {
    expect(response.body.map((it) => it.name))
      .toEqual(expect.arrayContaining([`Графика`, `Фантастика`, `Кино`, `Спорт`, `IT`]));
  });
});
