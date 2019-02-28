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
      throw boom.badImplementation();
    }
  },
  create: async (request, h) => {
    try {
      const { payload } = request;
      console.log(payload);
      const result = await new model(payload)
        .save();
      return h.response(result);
    } catch (err) {
      console.error(err);
      throw boom.badImplementation();
    }
  },
  show: async (request, h) => {
    try {
      const { id } = request.params;

      const result = await model.findOne({ _id: id });
      if (!result)
        throw boom.notFound();
      return h.response(result);
    } catch (err) {
      console.error(err);
      throw boom.badImplementation();
    }
  },
  update: async (request, h) => {
    try {
      const { id } = request.params;
      const { payload } = request;

      const result = await model
        .findOneAndUpdate({ _id: id }, payload);
      if (!result)
        throw boom.notFound();
      return h.response(result);
    } catch (err) {
      console.error(err);
      throw boom.badImplementation();
    }
  },
  destroy: async (request, h) => {
    try {
      const { id } = request.params;
      const result = await model.findOne({ _id: id });
      if (!result)
        throw boom.notFound();
      return h.response(result);
    } catch (err) {
      console.error(err);
      throw boom.badImplementation();
    }
  },
  upvote: async (request, h) => {
    try {
      const { id } = request.params;
      const result = await model.findOne({ _id: id });
      if (!result)
        throw boom.notFound();
      result.upvote += 1;
      result.save();
      return h.response(result);
    } catch (err) {
      console.error(err);
      throw boom.badImplementation();
    }
  },
  downvote: async (request, h) => {
    try {
      const { id } = request.params;
      const result = await model.findOne({ _id: id });
      if (!result)
        throw boom.notFound();
      result.downvote += 1;
      result.save();
      return h.response(result);
    } catch (err) {
      console.error(err);
      throw boom.badImplementation();
    }
  },
  answer: async (request, h) => {
    try {
      const { id } = request.params;
      const { payload } = request;
      const result = await model.findOne({ _id: id });
      if (!result)
        throw boom.notFound();
      result.answers.push(payload);
      result.save();
      return h.response(result);
    } catch (err) {
      console.error(err);
      throw boom.badImplementation();
    }
  },
  upvoteAnswer: async (request, h) => {
    try {
      const { id, qid } = request.params;
      const result = await model.findOne({ _id: id });
      if (!result)
        throw boom.notFound();
      const answer = result.answers.find((answer) => {
        return answer._id == qid;
      });
      if (!answer)
        throw boom.notFound();
      answer.upvote += 1;
      result.save();
      return h.response(answer);
    } catch (err) {
      console.error(err);
      throw boom.badImplementation();
    }
  },
  downvoteAnswer: async (request, h) => {
    try {
      const { id, qid } = request.params;
      const result = await model.findOne({ _id: id });
      if (!result)
        throw boom.notFound();
      const answer = result.answers.find((answer) => {
        return answer._id == qid;
      });
      if (!answer)
        throw boom.notFound();
      answer.downvote += 1;
      result.save();
      return h.response(answer);
    } catch (err) {
      console.error(err);
      throw boom.badImplementation();
    }
  }
};