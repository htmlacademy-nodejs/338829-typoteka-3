'use strict';

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const initDB = require(`../../lib/init-db`);
const userRoutes = require(`../user-routes/user-routes`);
const {UsersService} = require(`../../data-service`);

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

describe(`CREATE: API user`, () => {
  let response;
  let newUser;

  beforeAll(async () => {
    await initDB(mockDB, {categories: mockCategories, articles: mockArticles});
    userRoutes(app, new UsersService(mockDB));

    newUser = {
      "name": `Name`,
      "surname": `SurName`,
      "password": `111111`,
      "confirm_password": `111111`,
      "email": `user@local.localhost`,
      "avatar": `avatar.jpg`
    };
  });

  describe(`Correctly`, () => {
    beforeAll(async () => {
      response = await request(app)
        .post(`/user`)
        .send(newUser);
    });

    test(`Status code 201`, () => {
      expect(response.statusCode).toBe(HttpCode.CREATED);
    });
  });

  describe(`Incorrectly`, () => {
    const badUser = {...newUser};

    test(`Status code 400`, async () => {
      for (const key of Object.keys(newUser)) {
        delete badUser[key];

        const badResponse = await request(app)
          .post(`/user`)
          .send(badUser);

        expect(badResponse.statusCode).toBe(HttpCode.BAD_REQUEST);
      }
    });
  });
});
