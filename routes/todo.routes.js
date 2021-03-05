const router = require('express').Router();
const todoController = require('../controllers/todo.controllers');


router.get('/', todoController.readTodo);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);



module.exports = router;