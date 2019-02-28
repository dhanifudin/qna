'use strict';

const handler = require('./handler');

module.exports = {
  name: 'questions',
  register: (server) => {
    const routes = [{
      method: 'GET',
      path: '/questions',
      handler: handler.search,
    }, {
      method: 'POST',
      path: '/questions',
      handler: handler.create,
    }, {
      method: 'GET',
      path: '/questions/{id}',
      handler: handler.show,
    }, {
      method: 'PUT',
      path: '/questions/{id}',
      handler: handler.update,
    }, {
      method: 'DELETE',
      path: '/questions/{id}',
      handler: handler.destroy,
    }, {
      method: 'POST',
      path: '/questions/{id}/upvote',
      handler: handler.upvote,
    }, {
      method: 'POST',
      path: '/questions/{id}/downvote',
      handler: handler.downvote,
    }, {
      method: 'POST',
      path: '/questions/{id}/answers',
      handler: handler.answer,
    }, {
      method: 'POST',
      path: '/questions/{id}/answers/{qid}/upvote',
      handler: handler.upvoteAnswer,
    }, {
      method: 'POST',
      path: '/questions/{id}/answers/{qid}/downvote',
      handler: handler.downvoteAnswer,
    }];
    server.route(routes);
  }
};