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

  const getAuthHeaders = (accessToken) => {
    return {'authorization': `Bearer ${accessToken}`};
  };

  return {
    api,
    getArticles: ({limit, offset, comments = false, catId = -1} = {}) => fetch(`/articles`, {params: {limit, offset, comments, catId}}),
    getArticle: ({id, comments = false} = {}) => fetch(`/articles/${id}`, {params: {comments}}),
    getArticleComments: (id) => fetch(`/articles/${id}/comments`),
    getCategories: ({count = false} = {}) => fetch(`/categories`, {params: {count}}),
    searchArticles: (query) => fetch(`/search`, {params: {query}}),
    createArticle: (data) => fetch(`/articles`, {method: `POST`, data}),
    updateArticle: (id, data) => fetch(`/articles/${id}`, {method: `PUT`, data}),
    createComment: (id, data) => fetch(`/articles/${id}/comments`, {method: `POST`, data}),
    deleteComment: (id, commentId) => fetch(`/articles/${id}/comments/${commentId}`, {method: `DELETE`}),
    createUser: (user) => fetch(`/user`, {method: `POST`, data: user}),
    login: (auth) => fetch(`/user/login`, {method: `POST`, data: auth}),
    logout: (accessToken, refreshToken) => {
      return fetch(`/user/logout`, {method: `DELETE`, data: {token: refreshToken}, headers: getAuthHeaders(accessToken)});
    },
    refresh: (refreshToken) => {
      return fetch(`/user/refresh`, {method: `POST`, data: {token: refreshToken}});
    }
  };
};

const axiosApi = createApi();

module.exports = {
  createApi,
  axiosApi
};
