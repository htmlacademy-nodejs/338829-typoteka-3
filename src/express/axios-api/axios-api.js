'use strict';

const axios = require(`axios`);
const {
  DEFAULT_PORT,
  API_TIMEOUT,
  API_PREFIX
} = require(`../../constants`);

const createApi = (baseURL, timeout = API_TIMEOUT) => {
  const port = process.env.API_PORT || DEFAULT_PORT;
  const defaultURL = `http://localhost:${port}${API_PREFIX}/`;

  const api = axios.create({
    baseURL: baseURL || defaultURL,
    timeout
  });

  const fetch = async (url, options) => {
    const response = await api.request({url, ...options});
    return response.data;
  };

  return {
    api,
    getArticles: ({limit, offset, comments = false, catId = -1} = {}) => fetch(`/articles`, {params: {limit, offset, comments, catId}}),
    getArticle: ({id, comments = false} = {}) => fetch(`/articles/${id}`, {params: {comments}}),
    getArticleComments: (id) => fetch(`/articles/${id}/comments`),
    getCategories: ({count = false} = {}) => fetch(`/categories`, {params: {count}}),
    searchArticles: (query) => fetch(`/search`, {params: {query}}),
    createArticle: (data) => fetch(`/articles`, {method: `POST`, data})
  };
};

const axiosApi = createApi();

module.exports = {
  createApi,
  axiosApi
};
