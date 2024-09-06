// todo type ka object bnao aur datebase me dalo
// Import the model
const Todo = require("../models/Todo");

// define route handler
exports.createTodo = async (request, response) => {
  try {
    // extract title and description from body
    const { title, description } = request.body;
    // create a new todo object
    const res = await Todo.create({ title, description });
    // send a json response with a sucess flag
    response.status(200).json({
      sucess: true,
      data: res,
      message: "Entry Creeated Sucessfully",
    });
  } catch (err) {
    console.log(err),
      console.error(err),
      response.status(500).json({
        sucess: false,
        data: "Internal Server error",
        message: err.message,
      });
  }
};
