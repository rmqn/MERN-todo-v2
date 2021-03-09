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
    userId: req.body.userId,
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

module.exports.todoPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return TodoModels.findByIdAndUpdate(
      req.params.id, {
      $push: {
        todos: {
          item: req.body.item,
          done: req.body.done
        }
      }
    },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs)
        else return res.status(400).send(err)
      }
    );
  } catch (err) {
    return res.status(400).send(err)
  }
};



module.exports.editTodoBool = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return TodoModels.findById(
      req.params.id,
      (err, docs) => {
        const theTodo = docs.todos.find((todo) =>
          todo._id.equals(req.body.todoId)
        );

        if (!theTodo) return res.status(404).send("Todo not found");
        theTodo.done = req.body.done;

        return docs.save((err) => {
          if (!err) return res.status(200).send(docs);
          return res.status(500).send(err);
        });
      });
  } catch (err) {
    return res.status(400).send(err);
  }
};