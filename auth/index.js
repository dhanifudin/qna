'use strict';

const handler = require('./handler');

module.exports = {
  'name': 'auth',
  register: async (server) => {
    const routes = [{
      method: 'POST',
      path: '/auth/login',
      handler: handler.login,
    }];
    server.route(routes);
  }
}