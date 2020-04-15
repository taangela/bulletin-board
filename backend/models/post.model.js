const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: { type: String, required: true },
  created: { type: String, required: true },
  updated: { type: String },
  status: { type: String, required: true },
  title: { type: String, minlength: 10, required: true },
  text: { type: String, minlength: 20, required: true },
  photo: { type: String },
  price: { type: Number },
  phone: { type: String },
  location: { type: String },
});

module.exports = mongoose.model('Post', postSchema);
