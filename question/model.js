'use strict';

const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')();
const ObjectId = mongoose.Schema.Types.ObjectId;

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  author: {
    id: { type: ObjectId, ref: 'User' },
    name: { type: String },
  },
  answers: [{
    answer: { type: String, required: true },
    author: {
      id: { type: ObjectId, ref: 'User' },
      name: { type: String },
    },
    upvote: { type: Number, default: 0 },
    downvote: { type: Number, default: 0 },
  }],
  upvote: { type: Number, default: 0 },
  downvote: { type: Number, default: 0 },
});

QuestionSchema.plugin(mongooseHidden, { hidden: { _id: false, __v: true }});

module.exports = mongoose.model('Question', QuestionSchema);