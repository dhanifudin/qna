'use strict';

const jwt = require('hapi-auth-jwt2');
const model = require('../user/model');

const validate = async (decoded) => {
  const result = await model.findById({ _id: decoded.id });
  const isValid = (result != null);
  return { isValid };
};

module.exports = {
  name: 'jwt',
  register: async (server) => {
    await server.register(jwt);
    server.auth.strategy('jwt', 'jwt', {
      key: process.env.JWT_KEY,
      validate: validate,
      urlKey: false,
      verifyOptions: {
        algorithms: [ process.env.JWT_ALGORITHM || 'HS256' ]
      }
    });
    server.auth.default('jwt');
  }
};