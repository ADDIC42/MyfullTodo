const mongoose = require("mongoose");

const todosSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user:{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  }
});
const Todo = mongoose.model("Todo", todosSchema);

module.exports = Todo;
