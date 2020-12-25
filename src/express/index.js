'use strict';
const express = require(`express`);
const chalk = require(`chalk`);
const path = require(`path`);

const {
  DEFAULT_EXPRESS_PORT,
  EXPRESS_PUBLIC_DIR,
  HttpCode
} = require(`../constants`);

const rootRouter = require(`./routes/root`);
const articlesRouter = require(`./routes/articles`);
const myRouter = require(`./routes/my`);

const app = express();

app.use(express.static(path.resolve(__dirname, EXPRESS_PUBLIC_DIR)));
app.use(`/`, rootRouter);
app.use(`/articles`, articlesRouter);
app.use(`/my`, myRouter);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).render(`errors/404`);
});

app.use((err, req, res, _next) => {
  console.error(err);
  res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`errors/500`);
});

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.listen(DEFAULT_EXPRESS_PORT, () => {
  console.info(chalk.green(`Сервер запущен на порту: ${DEFAULT_EXPRESS_PORT}`));
});
