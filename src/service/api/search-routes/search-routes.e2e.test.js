'use strict';

const express = require(`express`);
const request = require(`supertest`);

const searchRoutes = require(`./search-routes`);
const {SearchService} = require(`../../data-service`);

const mockData = [
  {
    "id": `NSUC-p`,
    "title": `Как собрать камни бесконечности`,
    "announce": `Этот смартфон — настоящая находка. Большой и яркий экран мощнейший процессор — всё это в небольшом гаджете. Игры и программирование разные вещи.`,
    "fullText": `Забавным примером использования нейронной сети является генерация слов. Точность, как говорится, вежливость королей и… снайперов.`,
    "createdDate": `2020-11-05 04:50:04`,
    "сategory": [`Фотография`, `Графика`, `Фантастика`, `Деревья`, `IT`, `Железо`, `Кино`, `Без рамки`, `Авиация`, `Разное`, `Программирование`, `Спорт`, `Интернет`, `Ремонт`, `Домашние животные`, `Сделай сам`, `Музыка`, `Книги`, `Автомобили`],
    "comments": [
      {"id": `xjmlcD`, "text": `Согласен с автором! Мне кажется или я уже читал это где-то? Планируете записать видосик на эту тему? Хочу такую же футболку :-)`},
      {"id": `enLbXW`, "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`},
      {"id": `3akPHy`, "text": `Совсем немного... Мне кажется или я уже читал это где-то? Плюсую, но слишком много буквы! Это где ж такие красоты?`}
    ]
  },
  {
    "id": `dGbyKl`,
    "title": `Нет ничего проще`,
    "announce": `Собрать камни бесконечности легко если вы прирожденный герой. Альбом стал настоящим открытием года`,
    "fullText": `Как говорится, утром деньги – вечером стулья. Из под его пера вышло 8 платиновых альбомов. Игры и программирование разные вещи. Не стоит идти в программисты если вам нравятся только игры. году.ходка.ргенерация слов.`,
    "createdDate": `2020-10-13 20:51:35`,
    "сategory": [`Кино`, `Спорт`, `Интернет`, `Книги`, `Фантастика`, `Сделай сам`, `IT`, `Ремонт`, `Железо`, `Разное`, `Домашние животные`, `Музыка`, `Автомобили`, `Программирование`, `За жизнь`],
    "comments": [
      {"id": `-FkO4U`, "text": `Хочу такую же футболку :-) Плюсую, но слишком много буквы! Это где ж такие красоты? Согласен с автором!`},
      {"id": `7Qc2qq`, "text": `Совсем немного... Хочу такую же футболку :-) Согласен с автором!`},
      {"id": `Kab0UP`, "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Совсем немного...`},
      {"id": `L87kUq`, "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`}
    ]
  }
];

const {HttpCode} = require(`../../../constants`);

const app = express();
app.use(express.json());
searchRoutes(app, new SearchService(mockData));

describe(`API returns article based on search query`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({
        query: `камни`
      });
  });

  test(`Status code 200`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  test(`1 article found`, () => {
    expect(response.body.length).toBe(1);
  });

  test(`Article has correct id`, () => {
    expect(response.body[0].id).toBe(`NSUC-p`);
  });
});

describe(`API returns code 404 if nothing is found`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({
        query: `НЛО`
      });
  });

  test(`Status code 404`, () => {
    expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`Response text to equal "Not found"`, () => {
    expect(response.text).toBe(`Not found`);
  });
});

describe(`API returns code 400 when query string is absent`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`);
  });

  test(`Status code 400`, () => {
    expect(response.statusCode).toBe(HttpCode.BAD_REQUEST);
  });
});
