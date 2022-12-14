const { Router } = require("express");
const { todosController } = require("../controllers/todos.controller");

const router = Router()

router.get("/",todosController.getTodos)
// router.get("/:id",todosController.addTodo)
router.post("/",todosController.addTodo)
router.patch("/:id",todosController.editTodo)
router.delete("/:id",todosController.removeTodo)

module.exports = router