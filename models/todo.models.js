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
    todos: [
      {
        item: { type : String },
        done: { type : Boolean },
      }
    ],
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('todo', todoSchema);