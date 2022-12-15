const { Router } = require("express");
const { todosController } = require("../controllers/todos.controller");
const authMiddlewere = require("../models/middlewares/auth.middlewere");

const router = Router();

router.get("/", todosController.getTodos);
// router.get("/:id",todosController.addTodo)
router.post("/", authMiddlewere, todosController.addTodo);
router.patch("/:id",authMiddlewere, todosController.editTodo);
router.delete("/:id",authMiddlewere, todosController.removeTodo);

module.exports = router;
