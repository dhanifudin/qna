'use strict';

const boom = require('boom');
const model = require('./model');

module.exports = {
  search: async (request, h) => {
    try {
      const result = await model.find({});
      return h.response(result);
    } catch (err) {
      console.error(err);
      return boom.badImplementation();
    }
  },
  create: async (request, h) => {
    try {
      const { payload } = request;
      const { username } = payload;
      const userFound = await model.findOne({ username });
      if (userFound)
        return boom.badRequest(`${username} is exist`);
      const result = await new model(payload)
        .save();
      return h.response(result);
    } catch (err) {
      console.error(err);
      return boom.badImplementation();
    }
  },
  show: async (request, h) => {
    try {
      const { id } = request.params;

      const result = await model.findOne({ _id: id });
      if (!result)
        return boom.notFound();
      return h.response(result);
    } catch (err) {
      console.error(err);
      return boom.badImplementation();
    }
  },
  update: async (request, h) => {
    try {
      const { credentials } = request.auth;
      const { id } = request.params;
      const { payload } = request;

      const result = await model
        .findOneAndUpdate({ _id: id }, payload);
      if (!result)
        return boom.notFound();
      if (result.id != credentials.id)
        return boom.unauthorized();
      return h.response(result);
    } catch (err) {
      console.error(err);
      return boom.badImplementation();
    }
  },
  destroy: async (request, h) => {
    try {
      const { id } = request.params;
      const result = await model.findOne({ _id: id });
      if (!result)
        return boom.notFound();
      result.destroy();
      return h.response(result);
    } catch (err) {
      console.error(err);
      return boom.badImplementation();
    }
  },
};