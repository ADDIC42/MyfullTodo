const Todo = require("../models/Todo.model");
const jwt = require("jsonwebtoken");

module.exports.todosController = {
  getTodos: async (req, res) => {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  addTodo: async (req, res) => {

    try {
      
      const todo = await Todo.create({
        user: req.user.id,
        title: req.body.title,
      });

      return res.json(todo)

    } catch (e) {
      return res.status(401).json("неверный токен");
    }
  },

  // Изменение статуса дела


  //обновить функцию 
  editTodo: async (req, res) => {
    try {
      const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        {
          completed: req.body.completed,
        },
        { new: true }
      );
      res.json(todo);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  // removeTodo: async (req, res) => {


     
  //   const { authorization } = req.headers;


  //   const [type, token] = authorization.split(" ");

  //   if (type !== "Bearer") {
  //     return res.status(401).json("неверный тип токена")
  //   }
     
  //   try {
  //     const payload = await jwt.verify(token, process.env.SECRET_JWT_KEY);
  //     const todo = await Todo.findByIdAndRemove(req.params.id)
    
  //     return res.json("удалено");
      
  //   } catch (error) {
  //     res.json({ error: error.message });
  //   }
  // },
  removeTodo: async (req, res) => {

    const {id} = req.params
    try {
      const todo = await Todo.findById(id)
      if(todo.userId.toString() === req.user.id) {
        await todo.remove()
        return res.json("удалено");
      }
    
     return res.status(401).json("ошибка")
      
    } catch (error) {
      res.json({ error: error.message });
    }
  },
};
