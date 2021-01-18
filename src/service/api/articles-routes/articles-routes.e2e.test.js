'use strict';

const express = require(`express`);
const request = require(`supertest`);

const articlesRoutes = require(`./articles-routes`);
const {ArticleService, CommentService} = require(`../../data-service`);

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

const createApp = () => {
  const app = express();
  app.use(express.json());
  articlesRoutes(
      app,
      new ArticleService(JSON.parse(JSON.stringify(mockData))),
      new CommentService()
  );

  return app;
};

describe(`READ: API articles`, () => {
  const app = createApp();
  let response;

  describe(`correctly`, () => {
    beforeAll(async () => {
      response = await request(app).get(`/articles`);
    });

    test(`Status code 200`, () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    test(`Returns a list of 2 articles`, () => {
      expect(response.body.length).toBe(2);
    });

    test(`First Article id equals NSUC-p`, () => {
      expect(response.body[0].id).toBe(`NSUC-p`);
    });
  });
});

describe(`READ: API article`, () => {
  const app = createApp();
  let response;

  describe(`Correctly: with given id`, () => {
    beforeAll(async () => {
      response = await request(app).get(`/articles/dGbyKl`);
    });

    test(`Status code 200`, () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    test(`Article's id equals dGbyKl`, () => {
      expect(response.body.id).toBe(`dGbyKl`);
    });

    test(`Article's title equals "Нет ничего проще"`, () => {
      expect(response.body.title).toBe(`Нет ничего проще`);
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
  const app = createApp();
  let response;

  const newArticle = {
    "title": `Руководство для начинающих`,
    "createdDate": `2020-12-14 08:25:41`,
    "category": [`Разное`],
    "announce": `Как говорится, утром деньги – вечером стулья`
  };

  describe(`Correctly`, () => {
    beforeAll(async () => {
      response = await request(app)
        .post(`/articles`)
        .send(newArticle);
    });

    test(`Status code 201`, () => {
      expect(response.statusCode).toBe(HttpCode.CREATED);
    });

    test(`Return new article`, () => {
      expect(response.body).toEqual(expect.objectContaining(newArticle));
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
  const app = createApp();
  let response;

  const updateArticle = {
    "title": `Руководство для начинающих`,
    "createdDate": `2020-12-14 08:25:41`,
    "category": [`Разное`],
    "announce": `Как говорится, утром деньги – вечером стулья`
  };

  describe(`Correctly`, () => {
    beforeAll(async () => {
      response = await request(app)
        .put(`/articles/dGbyKl`)
        .send(updateArticle);
    });

    test(`Status code 204`, () => {
      expect(response.statusCode).toBe(HttpCode.NO_CONTENT);
    });

    test(`Article is changed`, async () => {
      const articleResponse = await request(app).get(`/articles/dGbyKl`);
      expect(articleResponse.body).toEqual(expect.objectContaining(updateArticle));
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
      delete invalidArticle.createdDate;

      const badResponse = await request(app)
        .put(`/articles/dGbyKl`)
        .send(invalidArticle);

      expect(badResponse.statusCode).toBe(HttpCode.BAD_REQUEST);
    });
  });
});

describe(`DELETE: API article`, () => {
  const app = createApp();
  const articleId = `dGbyKl`;
  let response;

  describe(`Correctly`, () => {
    beforeAll(async () => {
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
  const app = createApp();
  const articleId = `dGbyKl`;
  let response;

  describe(`Correctly`, () => {
    beforeAll(async () => {
      response = await request(app).get(`/articles/${articleId}/comments`);
    });

    test(`Status code 200`, () => {
      expect(response.statusCode).toBe(HttpCode.OK);
    });

    test(`Article has three comments`, () => {
      expect(response.body.length).toBe(4);
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
  const app = createApp();
  const articleId = `dGbyKl`;
  const newComment = {
    text: `Мне не нравится ваш стиль`
  };

  let response;

  describe(`Correctly`, () => {
    beforeAll(async () => {
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
      expect(commentsRes.body.length).toBe(5);
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
  const app = createApp();
  const articleId = `dGbyKl`;
  const commentId = `L87kUq`;

  let response;

  describe(`Correctly`, () => {
    beforeAll(async () => {
      response = await request(app).delete(`/articles/${articleId}/comments/${commentId}`);
    });

    test(`Status code 204`, () => {
      expect(response.statusCode).toBe(HttpCode.NO_CONTENT);
    });

    test(`Comments count is changed`, async () => {
      const commentsRes = await request(app).get(`/articles/${articleId}/comments`);
      expect(commentsRes.body.length).toBe(3);
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
