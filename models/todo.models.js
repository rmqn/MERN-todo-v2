const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema (
  {
    userId: {
      type: String,
      required: false
    },
    list: {
      type: String,
      trim: true,
      maxlength: 500,
      required: true
    },
    todos: {
      type: [String],
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('todo', todoSchema);