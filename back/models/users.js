const mongoose = require("../libs/mongoose"),
  Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  storys: {
    type: Array,
    require: true,
    default: [],
  },
  img: {
    type: String,
    require: true,
    default: "file:///C:/Users/Nodechu/Desktop/1.jpg",
  },
});

exports.Users = mongoose.model("Users", schema);
