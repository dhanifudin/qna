'use strict';

const joi = require('joi');
const handler = require('./handler');

module.exports = {
  name: 'users',
  register: (server) => {
    const routes = [{
      method: 'GET',
      path: '/users',
      handler: handler.search,
      options: {
        auth: false,
      }
    }, {
      method: 'POST',
      path: '/users',
      handler: handler.create,
      options: {
        auth: false,
        validate: {
          payload: {
            username: joi.string().required(),
            name: joi.string().required(),
            password: joi.string().required(),
          }
        }
      }
    }, {
      method: 'GET',
      path: '/users/{id}',
      handler: handler.show,
      options: {
        validate: {
          params: {
            id: joi.string().required(),
          }
        }
      }
    }, {
      method: 'PUT',
      path: '/users/{id}',
      handler: handler.update,
      options: {
        validate: {
          params: {
            id: joi.string().required(),
          }
        }
      }
    }, {
      method: 'DELETE',
      path: '/users/{id}',
      handler: handler.destroy,
      options: {
        validate: {
          params: {
            id: joi.string().required(),
          }
        }
      }
    }];
    server.route(routes);
  }
};