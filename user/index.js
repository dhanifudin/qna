'use strict';

const handler = require('./handler');

module.exports = {
  name: 'users',
  register: (server) => {
    const routes = [{
      method: 'GET',
      path: '/users',
      handler: handler.search,
    }, {
      method: 'POST',
      path: '/users',
      handler: handler.create,
    }, {
      method: 'GET',
      path: '/users/{id}',
      handler: handler.show,
    }, {
      method: 'PUT',
      path: '/users/{id}',
      handler: handler.update,
    }, {
      method: 'DELETE',
      path: '/users/{id}',
      handler: handler.destroy,
    }];
    server.route(routes);
  }
}