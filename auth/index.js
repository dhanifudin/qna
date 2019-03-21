'use strict';

const joi = require('joi');
const handler = require('./handler');

module.exports = {
  'name': 'auth',
  register: async (server) => {
    const routes = [{
      method: 'POST',
      path: '/auth/login',
      handler: handler.login,
      options: {
        auth: false,
        validate: {
          payload: {
            username: joi.string().required(),
            password: joi.string().required(),
          }
        }
      }
    }];
    server.route(routes);
  }
};