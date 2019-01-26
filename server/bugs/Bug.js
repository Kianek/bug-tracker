const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BugSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fixed: {
    type: Boolean,
    default: false,
  },
});

const Bug = mongoose.model('Bug', BugSchema);

module.exports = Bug;
