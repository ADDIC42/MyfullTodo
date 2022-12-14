const Todo = require("../models/Todo.model");

module.exports.todosController = {
  getTodos: async (req, res) => {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  addTodo:async(req,res) => {
    try {
        const todo = await Todo.create({
            title:req.body.title
        })
        res.json(todo)
    } catch (error) {
        res.json({ error: error.message });
    }
  },
  editTodo:async(req,res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            {
            completed:req.body.completed
        },
        {new:true}
        )
        res.json(todo)
    } catch (error) {
        res.json({ error: error.message });
    }
  },
  removeTodo:async(req,res) => {
    try {
       const todo = await Todo.findByIdAndRemove(req.params.id)
        res.json(todo)
    } catch (error) {
        res.json({ error: error.message });
    }
  }
};
