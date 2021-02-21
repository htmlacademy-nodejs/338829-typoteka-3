'use strict';

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);

const initDB = require(`../../lib/init-db`);
const articlesRoutes = require(`./articles-routes`);
const {ArticleService, CommentService} = require(`../../data-service`);

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

const createApp = async () => {
  const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
  await initDB(mockDB, {categories: mockCategories, articles: mockArticles});

  const app = express();
  app.use(express.json());
  articlesRoutes(app, new ArticleService(mockDB), new CommentService(mockDB));

  return app;
};

describe(`READ: API articles`, () => {
  let app;
  let response;

  describe(`correctly`, () => {
    beforeAll(async () => {
      app = await createApp();
      response = await request(app).get(`/articles`);
    });

    test(`Status code 200`, () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    test(`Returns a list of 2 articles`, () => {
      expect(response.body.length).toBe(2);
    });

    test(`First Article id equals 1`, () => {
      expect(response.body[0].id).toBe(1);
    });
  });
});

describe(`READ: API article`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createApp();
  });

  describe(`Correctly: with given id`, () => {
    beforeAll(async () => {
      response = await request(app).get(`/articles/1`);
    });

    test(`Status code 200`, () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    test(`Article's title equals Как собрать камни бесконечности`, () => {
      expect(response.body.title).toBe(`Как собрать камни бесконечности`);
    });
  });

  describe(`Incorrectly: with given id`, () => {
    beforeAll(async () => {
      response = await request(app).get(`/articles/NOEXST`);
    });

    test(`Status code 404`, () => {
      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    });

    test(`Response text to equal "Article with NOEXST not found"`, () => {
      expect(response.text).toBe(`Article with NOEXST not found`);
    });
  });
});

describe(`CREATE: API article`, () => {
  let app;
  let response;
  let newArticle;

  beforeAll(async () => {
    app = await createApp();
    newArticle = {
      "title": `Руководство для начинающих`,
      "categories": [`1`],
      "announce": `Как говорится, утром деньги – вечером стулья`,
      "fullText": `Забавным примером использования нейронной сети`,
      "createdAt": `2020-11-05 04:50:04`
    };
  });

  describe(`Correctly`, () => {
    beforeAll(async () => {
      response = await request(app)
        .post(`/articles`)
        .send(newArticle);
    });

    test(`Status code 201`, () => {
      expect(response.statusCode).toBe(HttpCode.CREATED);
    });

    test(`Articles count is changed`, async () => {
      const articlesRes = await request(app).get(`/articles`);
      expect(articlesRes.body.length).toBe(3);
    });
  });

  describe(`Incorrectly`, () => {
    const badArticle = {...newArticle};

    test(`Status code 400`, async () => {
      for (const key of Object.keys(newArticle)) {
        delete badArticle[key];

        const badResponse = await request(app)
          .post(`/articles`)
          .send(badArticle);

        expect(badResponse.statusCode).toBe(HttpCode.BAD_REQUEST);
      }
    });
  });
});

describe(`UPDATE: API article`, () => {
  let app;
  let response;
  let updateArticle;

  beforeAll(async () => {
    app = await createApp();
    updateArticle = {
      "title": `Руководство для начинающих`,
      "categories": [`1`],
      "announce": `Как говорится, утром деньги – вечером стулья`,
      "fullText": `Забавным примером использования нейронной сети`,
      "createdAt": `2020-11-05 04:50:04`
    };
  });

  describe(`Correctly`, () => {
    beforeAll(async () => {
      response = await request(app)
        .put(`/articles/1`)
        .send(updateArticle);
    });

    test(`Status code 204`, () => {
      expect(response.statusCode).toBe(HttpCode.NO_CONTENT);
    });
  });

  describe(`Incorrectly`, () => {
    test(`API returns status code 404 when trying to change non-existent article`, async () => {
      const notFoundResponse = await request(app)
        .put(`/articles/NOEXST`)
        .send(updateArticle);

      expect(notFoundResponse.statusCode).toBe(HttpCode.NOT_FOUND);
    });

    test(`API returns status code 400 when trying to change an article with invalid data`, async () => {
      const invalidArticle = {...updateArticle};
      delete invalidArticle.createdAt;

      const badResponse = await request(app)
        .put(`/articles/1`)
        .send(invalidArticle);

      expect(badResponse.statusCode).toBe(HttpCode.BAD_REQUEST);
    });
  });
});

describe(`DELETE: API article`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createApp();
  });

  describe(`Correctly`, () => {
    beforeAll(async () => {
      const articleId = `1`;
      response = await request(app).delete(`/articles/${articleId}`);
    });

    test(`Status code 204`, () => {
      expect(response.statusCode).toBe(HttpCode.NO_CONTENT);
    });

    test(`Articles count is changed`, async () => {
      const articleRes = await request(app).get(`/articles`);
      expect(articleRes.body.length).toBe(1);
    });
  });

  describe(`Incorrectly`, () => {
    test(`API returns status code 404 when trying to delete non-existent article`, async () => {
      const notFoundResponse = await request(app).put(`/articles/NOEXST`);
      expect(notFoundResponse.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });
});

describe(`READ: API comments`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createApp();
  });

  describe(`Correctly`, () => {
    beforeAll(async () => {
      const articleId = `1`;
      response = await request(app).get(`/articles/${articleId}/comments`);
    });

    test(`Status code 200`, () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    test(`Article has three comments`, () => {
      expect(response.body.length).toBe(3);
    });
  });

  describe(`Incorrectly`, () => {
    beforeAll(async () => {
      response = await request(app).get(`/articles/NOEXST/comments`);
    });

    test(`Status code 404`, () => {
      expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
    });

    test(`Response text to equal "Article with NOEXST not found"`, () => {
      expect(response.text).toBe(`Article with NOEXST not found`);
    });
  });
});

describe(`CREATE: API comments`, () => {
  let app;
  let response;
  let articleId;

  beforeAll(async () => {
    app = await createApp();
    articleId = `1`;
  });

  describe(`Correctly`, () => {
    let newComment;

    beforeAll(async () => {
      newComment = {
        text: `Мне не нравится ваш стиль`
      };

      response = await request(app)
        .post(`/articles/${articleId}/comments`)
        .send(newComment);
    });

    test(`Status code 201`, () => {
      expect(response.statusCode).toBe(HttpCode.CREATED);
    });

    test(`Return new comment`, () => {
      expect(response.body).toEqual(expect.objectContaining(newComment));
    });

    test(`Article has five comments, count is changed`, async () => {
      const commentsRes = await request(app).get(`/articles/${articleId}/comments`);
      expect(commentsRes.body.length).toBe(4);
    });
  });

  describe(`Incorrectly`, () => {
    const badComment = {};

    test(`Status code 404 with non-existent article`, async () => {
      const notfoundResponse = await request(app)
        .post(`/articles/NOEXST/comments`)
        .send(badComment);

      expect(notfoundResponse.statusCode).toBe(HttpCode.NOT_FOUND);
    });

    test(`Status code 400, invalid comment`, async () => {
      const badResponse = await request(app)
        .post(`/articles/${articleId}/comments`)
        .send(badComment);

      expect(badResponse.statusCode).toBe(HttpCode.BAD_REQUEST);
    });
  });
});

describe(`DELETE: API comments`, () => {
  let app;
  let response;
  let articleId;
  let commentId;

  beforeAll(async () => {
    app = await createApp();
    articleId = `1`;
    commentId = `1`;
  });

  describe(`Correctly`, () => {
    beforeAll(async () => {
      response = await request(app).delete(`/articles/${articleId}/comments/${commentId}`);
    });

    test(`Status code 204`, () => {
      expect(response.statusCode).toBe(HttpCode.NO_CONTENT);
    });

    test(`Comments count is changed`, async () => {
      const commentsRes = await request(app).get(`/articles/${articleId}/comments`);
      expect(commentsRes.body.length).toBe(2);
    });
  });

  describe(`Incorrectly`, () => {
    test(`Status code 404 with non-existent article`, async () => {
      const notfoundResponse = await request(app).delete(`/articles/NOEXST/comments/${commentId}`);
      expect(notfoundResponse.statusCode).toBe(HttpCode.NOT_FOUND);
    });

    test(`Status code 404 with non-existent comment`, async () => {
      const notfoundResponse = await request(app).delete(`/articles/${articleId}/comments/NOEXST`);
      expect(notfoundResponse.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });
});
