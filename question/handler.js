'use strict';

const boom = require('boom');
const model = require('./model');
const userModel = require('../user/model');

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
      const { credentials } = request.auth;
      const { payload } = request;
      const user = await userModel
        .findById({ _id: credentials.id });
      const result = await new model({
        question: payload.question,
        author: { id: user.id, name: user.name }
      }).save();
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

      const result = await model.findOne({ _id: id });
      if (!result)
        return boom.notFound();
      if (result.author.id != credentials.id)
        return boom.unauthorized();
      result.update(payload);
      return h.response(result);
    } catch (err) {
      console.error(err);
      return boom.badImplementation();
    }
  },
  destroy: async (request, h) => {
    try {
      const { credentials } = request.auth;
      const { id } = request.params;
      const result = await model.findOne({ _id: id });
      if (!result)
        return boom.notFound();
      if (result.author.id != credentials.id)
        return boom.unauthorized();
      result.destroy();
      return h.response(result);
    } catch (err) {
      console.error(err);
      return boom.badImplementation();
    }
  },
  upvote: async (request, h) => {
    try {
      const { id } = request.params;
      const result = await model.findOne({ _id: id });
      if (!result)
        return boom.notFound();
      result.upvote += 1;
      result.save();
      return h.response(result);
    } catch (err) {
      console.error(err);
      return boom.badImplementation();
    }
  },
  downvote: async (request, h) => {
    try {
      const { id } = request.params;
      const result = await model.findOne({ _id: id });
      if (!result)
        return boom.notFound();
      result.downvote += 1;
      result.save();
      return h.response(result);
    } catch (err) {
      console.error(err);
      return boom.badImplementation();
    }
  },
  answer: async (request, h) => {
    try {
      const { credentials } = request.auth;
      const { id } = request.params;
      const { payload } = request;
      const result = await model.findOne({ _id: id });
      if (!result)
        return boom.notFound();
      const user = await userModel
        .findById({ _id: credentials.id });
      result.answers.push({
        answer: payload.answer,
        author: { id: user.id, name: user.name }
      });
      result.save();
      return h.response(result);
    } catch (err) {
      console.error(err);
      return boom.badImplementation();
    }
  },
  upvoteAnswer: async (request, h) => {
    try {
      const { id, qid } = request.params;
      const result = await model.findOne({ _id: id });
      if (!result)
        return boom.notFound();
      const answer = result.answers.find((answer) => {
        return answer._id == qid;
      });
      if (!answer)
        return boom.notFound();
      answer.upvote += 1;
      result.save();
      return h.response(answer);
    } catch (err) {
      console.error(err);
      return boom.badImplementation();
    }
  },
  downvoteAnswer: async (request, h) => {
    try {
      const { id, qid } = request.params;
      const result = await model.findOne({ _id: id });
      if (!result)
        return boom.notFound();
      const answer = result.answers.find((answer) => {
        return answer._id == qid;
      });
      if (!answer)
        return boom.notFound();
      answer.downvote += 1;
      result.save();
      return h.response(answer);
    } catch (err) {
      console.error(err);
      return boom.badImplementation();
    }
  }
};