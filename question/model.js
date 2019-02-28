'use strict';

const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answers: [{
    answer: { type: String, required: true },
    upvote: { type: Number, default: 0 },
    downvote: { type: Number, default: 0 },
  }],
  upvote: { type: Number, default: 0 },
  downvote: { type: Number, default: 0 },
});

module.exports = mongoose.model('Question', QuestionSchema);