const TodoModels = require('../models/todo.models');
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.readTodo = (req, res) => {
  TodoModels.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
}

module.exports.createTodo = async (req, res) => {
  const newTodo = new TodoModels({
    userId: req.body.userId,
    list: req.body.list,
    todos: req.body.todos
  });

  try {
    const todo = await newTodo.save();
    return res.status(201).json(todo);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.updateTodo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    list: req.body.list,
    todos: req.body.todos
  };

  TodoModels.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};

module.exports.deleteTodo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  TodoModels.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};