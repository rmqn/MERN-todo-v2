const router = require('express').Router();
const todoController = require('../controllers/todo.controllers');


router.get('/', todoController.readTodo);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

router.patch('/todo-post/:id', todoController.todoPost);
router.patch('/edit-todo-post/:id', todoController.editTodoBool);



module.exports = router;