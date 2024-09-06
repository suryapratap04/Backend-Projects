// Import the model
const Todo = require("../models/Todo");

// define route handler
exports.deleteTodo = async (request, response) => {
  try {
    const { id } = request.params;
    await Todo.findByIdAndDelete(id);
    response.json({
      success: true,
      message: "Todo Deleted",
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
