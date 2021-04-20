'use strict';

const help = require(`./help`);
const version = require(`./version`);
const generate = require(`./generate`);
const fill = require(`./fill`);
const fillDB = require(`./fill-db`);
const server = require(`./server`);

module.exports = {
  [version.name]: version,
  [help.name]: help,
  [generate.name]: generate,
  [fill.name]: fill,
  [fillDB.name]: fillDB,
  [server.name]: server
};
