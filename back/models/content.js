const mongoose = require("../libs/mongoose"),
  Schema = mongoose.Schema;

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  nameOfAuthor: {
    type: String,
    require: true,
  },
  imgOfAuthor: {
    type: String,
    require: true,
  },
  contentOfArticle: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  shortText: {
    type: String,
    required: true,
  },
  shortImg: {
    type: String,
    required: true,
  },
});

exports.Content = mongoose.model("Content", schema);
