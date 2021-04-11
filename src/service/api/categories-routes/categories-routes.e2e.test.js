'use strict';

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const initDB = require(`../../lib/init-db`);
const categoryRoutes = require(`./categories-routes`);
const userRoutes = require(`../user-routes/user-routes`);
const {
  CategoryService,
  UsersService,
  TokenService
} = require(`../../data-service`);

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

const mockUsers = [{
  "email": `admin@local.localhost`,
  "name": `Admin`,
  "surname": `Admin`,
  "password": `222222`,
  "confirm_password": `222222`
}];

const authUser = {
  "email": `admin@local.localhost`,
  "password": `222222`,
};

const {HttpCode} = require(`../../../constants`);

const createApp = async () => {
  const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
  await initDB(mockDB, {categories: mockCategories, articles: mockArticles, users: mockUsers});

  const app = express();
  app.use(express.json());
  categoryRoutes(app, new CategoryService(mockDB));
  userRoutes(app, new UsersService(mockDB), new TokenService(mockDB));

  return app;
};


describe(`READ: API categories`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createApp();
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


describe(`CREATE: API category`, () => {
  let app;
  let response;
  let newCategory;
  let loginResponse;

  beforeAll(async () => {
    app = await createApp();
    newCategory = {
      "name": `Музыка`
    };

    loginResponse = await request(app).post(`/user/login`).send(authUser);
  });

  describe(`Correctly`, () => {
    beforeAll(async () => {
      response = await request(app)
        .post(`/categories`)
        .set(`authorization`, `Bearer ${loginResponse.body.accessToken}`)
        .send(newCategory);
    });

    test(`Status code 201`, () => {
      expect(response.statusCode).toBe(HttpCode.CREATED);
    });

    test(`Categories count is changed`, async () => {
      const categories = await request(app).get(`/categories`);
      expect(categories.body.length).toBe(6);
    });
  });

  describe(`Incorrectly`, () => {
    test(`Status code 400`, async () => {
      const badResponse = await request(app)
        .post(`/categories`)
        .set(`authorization`, `Bearer ${loginResponse.body.accessToken}`)
        .send({});

      expect(badResponse.statusCode).toBe(HttpCode.BAD_REQUEST);
    });
  });
});

describe(`UPDATE: API category`, () => {
  let app;
  let response;
  let updateCategory;
  let loginResponse;

  beforeAll(async () => {
    app = await createApp();
    updateCategory = {
      "name": `Категория`
    };

    loginResponse = await request(app).post(`/user/login`).send(authUser);
  });

  describe(`Correctly`, () => {
    beforeAll(async () => {
      response = await request(app)
        .put(`/categories/1`)
        .set(`authorization`, `Bearer ${loginResponse.body.accessToken}`)
        .send(updateCategory);
    });

    test(`Status code 204`, () => {
      expect(response.statusCode).toBe(HttpCode.NO_CONTENT);
    });
  });

  describe(`Incorrectly`, () => {
    test(`API returns status code 400 when trying to change categories id = NOEXST`, async () => {
      const notFoundResponse = await request(app)
        .put(`/categories/NOEXST`)
        .set(`authorization`, `Bearer ${loginResponse.body.accessToken}`)
        .send(updateCategory);

      expect(notFoundResponse.statusCode).toBe(HttpCode.BAD_REQUEST);
    });

    test(`API returns status code 404 when trying to change categories id = 10`, async () => {
      const notFoundResponse = await request(app)
        .put(`/categories/10`)
        .set(`authorization`, `Bearer ${loginResponse.body.accessToken}`)
        .send(updateCategory);

      expect(notFoundResponse.statusCode).toBe(HttpCode.NOT_FOUND);
    });

    test(`API returns status code 400 when trying to change an categories with invalid data`, async () => {
      const badResponse = await request(app)
        .put(`/categories/1`)
        .set(`authorization`, `Bearer ${loginResponse.body.accessToken}`)
        .send({});

      expect(badResponse.statusCode).toBe(HttpCode.BAD_REQUEST);
    });
  });
});

describe(`DELETE: API category`, () => {
  let app;
  let response;
  let loginResponse;

  beforeAll(async () => {
    app = await createApp();
    loginResponse = await request(app).post(`/user/login`).send(authUser);
  });

  describe(`Correctly`, () => {
    beforeAll(async () => {
      const categoryId = `1`;
      response = await request(app)
        .delete(`/categories/${categoryId}`)
        .set(`authorization`, `Bearer ${loginResponse.body.accessToken}`);
    });

    test(`Status code 204`, () => {
      expect(response.statusCode).toBe(HttpCode.NO_CONTENT);
    });

    test(`Categories count is changed`, async () => {
      const categories = await request(app).get(`/categories`);
      expect(categories.body.length).toBe(4);
    });
  });

  describe(`Incorrectly`, () => {
    test(`API returns status code 400 when trying to delete non-existent category`, async () => {
      const notFoundResponse = await request(app)
        .put(`/categories/NOEXST`)
        .set(`authorization`, `Bearer ${loginResponse.body.accessToken}`);

      expect(notFoundResponse.statusCode).toBe(HttpCode.BAD_REQUEST);
    });

    test(`API returns status code 404 when trying to change category id = 10`, async () => {
      const notFoundResponse = await request(app)
        .delete(`/categories/10`)
        .set(`authorization`, `Bearer ${loginResponse.body.accessToken}`);

      expect(notFoundResponse.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });
});
