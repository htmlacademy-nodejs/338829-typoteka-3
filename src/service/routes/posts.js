'use strict';

const fs = require(`fs/promises`);
const {Router} = require(`express`);
const {FILE_MOCK_PATH} = require(`../../constants`);

const postRouter = new Router();
postRouter.get(`/`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILE_MOCK_PATH, `utf-8`);
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (error) {
    res.json([]);
  }
});

module.exports = postRouter;
