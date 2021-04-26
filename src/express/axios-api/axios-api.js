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
    searchArticles: (query) => fetch(`/search`, {params: {query}}),

    getCategories: ({count = false} = {}) => fetch(`/categories`, {params: {count}}),
    createCategory: (data, accessToken) => {
      return fetch(`/categories`, {method: `POST`, data, headers: getAuthHeaders(accessToken)});
    },
    updateCategory: (id, data, accessToken) => {
      return fetch(`/categories/${id}`, {method: `PUT`, data, headers: getAuthHeaders(accessToken)});
    },
    deleteCategory: (id, accessToken) => {
      return fetch(`/categories/${id}`, {method: `DELETE`, headers: getAuthHeaders(accessToken)});
    },

    getArticles: ({limit, offset, catId = -1, ...query} = {}) => {
      return fetch(`/articles`, {params: {limit, offset, catId, ...query}});
    },
    getArticle: ({id, comments = false} = {}) => fetch(`/articles/${id}`, {params: {comments}}),
    getArticleComments: (id) => fetch(`/articles/${id}/comments`),
    createArticle: (data, accessToken) => {
      return fetch(`/articles`, {method: `POST`, data, headers: getAuthHeaders(accessToken)});
    },
    updateArticle: (id, data, accessToken) => {
      return fetch(`/articles/${id}`, {method: `PUT`, data, headers: getAuthHeaders(accessToken)});
    },
    deleteArticle: (id, accessToken) => {
      return fetch(`/articles/${id}`, {method: `DELETE`, headers: getAuthHeaders(accessToken)});
    },
    createComment: (id, data, accessToken) => {
      return fetch(`/articles/${id}/comments`, {method: `POST`, data, headers: getAuthHeaders(accessToken)});
    },
    deleteComment: (id, commentId, accessToken) => {
      return fetch(`/articles/${id}/comments/${commentId}`, {method: `DELETE`, headers: getAuthHeaders(accessToken)});
    },

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
