// Import the model
const Todo = require("../models/Todo");

// define route handler
exports.updateTodo = async (request, response) => {
  try {
    //  extract id
    const { id } = request.params;
    const { title, description } = request.body;
    const todo = await Todo.findByIdAndUpdate(
      { _id: id },
      { title, description, updatedAt: Date.now() }
    );
    response.status(200).json({
      sucess: true,
      data: todo,
      message: "Entry updated  Sucessfully",
    });
  } catch (err) {
    console.log(err),
      console.errpr(err),
      response.status(500).json({
        sucess: false,
        data: "Internal Server error",
        message: err.message,
      });
  }
};
