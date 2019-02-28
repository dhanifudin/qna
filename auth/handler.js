'use strict';

const boom = require('boom');

module.exports = {
  login: async (request, h) => {
    try {
      const { username, password } = request.payload;
    } catch (err) {
      console.error(err);
      throw boom.badImplementation();
    }
  }
}