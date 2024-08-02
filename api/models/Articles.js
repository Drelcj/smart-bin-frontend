const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  // We'll add other fields if the need arises
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const articleModel = mongoose.model('Article', ArticleSchema);
module.exports = articleModel;
